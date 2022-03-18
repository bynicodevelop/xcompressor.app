import * as yup from "yup";
import StripeRepository from "~~/repositories/StripeRepository";

const schema = yup.object().shape({
    email: yup.string().email().required("email_field"),
    cardName: yup.string().required("card_name_field"),
    cardNumber: yup.string().required("card_number_field"),
    cardExpiry: yup.string().required("card_expiry_field"),
    cardCvc: yup.string().required("card_cvc_field"),
});

export const useCheckout = () => {
    const router = useRouter();
    const isLoading = ref(false);

    const products = [
        {
            id: 1,
            name: "XCompressor PRO",
            price: 5,
            options: ["Compress files up to 10MB", "Unlimited compressions", "Not ads"],
        },
    ];

    const stripeRepository = useState<StripeRepository>('stripeRepository').value;

    const { user } = useUser();

    const email = ref('');
    const emailError = ref(false);
    const cardName = ref('');
    const cardNameError = ref(false);
    const cardNumber = ref('');
    const cardNumberError = ref(false);
    const cardExpiration = ref('');
    const cardExpirationError = ref(false);
    const cardCVC = ref('');
    const cardCVCError = ref(false);

    const onSubmit = async () => {
        emailError.value = false;
        cardNameError.value = false;
        cardNumberError.value = false;
        cardExpirationError.value = false;
        cardCVCError.value = false;

        isLoading.value = true;

        try {
            schema.validateSync(
                {
                    email: email.value,
                    cardName: cardName.value,
                    cardNumber: cardNumber.value,
                    cardExpiry: cardExpiration.value,
                    cardCvc: cardCVC.value,
                },
                { abortEarly: false }
            );

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.value,
                    cardName: cardName.value,
                    cardNumber: cardNumber.value,
                    cardExpiry: cardExpiration.value,
                    cardCvc: cardCVC.value,
                }),
            };

            const response: Response = await fetch(
                "/api/stripe/subscribe",
                requestOptions
            );

            const { subscriptionId } = await response.json();

            await stripeRepository.saveSubscription({ subscriptionId });

            router.push({
                name: "apps",
            });
        } catch (error) {
            if (!error.errors) {
                console.log(error);

            } else {
                error.errors.forEach((error) => {
                    if (error === "email_field") {
                        emailError.value = true;
                    }

                    if (error === "card_name_field") {
                        cardNameError.value = true;
                    }

                    if (error === "card_number_field") {
                        cardNumberError.value = true;
                    }

                    if (error === "card_expiry_field") {
                        cardExpirationError.value = true;
                    }

                    if (error === "card_cvc_field") {
                        cardCVCError.value = true;
                    }
                });
            }
        }

        isLoading.value = false;
    }

    onMounted(() => {
        if (user.value) {
            email.value = user.value.email;
        }
    })

    return {
        isLoading,
        email,
        emailError,
        cardName,
        cardNameError,
        cardNumber,
        cardNumberError,
        cardExpiration,
        cardExpirationError,
        cardCVC,
        cardCVCError,
        products,
        onSubmit,
    }
}