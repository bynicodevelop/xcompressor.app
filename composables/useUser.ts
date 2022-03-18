import StripeRepository from "~~/repositories/StripeRepository";
import UserRepository from "~~/repositories/UserRepository";

export const useUser = () => {
    const sessionCookie = useCookie<Object>('__session');
    const subscriptionRef = ref(null);

    if (sessionCookie.value === undefined) {
        sessionCookie.value = {};
    }

    const userRepository = useState<UserRepository>('userRepository').value;
    const stripeRepository = useState<StripeRepository>('stripeRepository').value;
    const user = useState('user');

    const router = useRouter();

    let isAuthenticated = sessionCookie.value['isAuthenticated'] || false;

    const logout = async () => {
        await userRepository.logout();

        router.push({
            name: "apps"
        });
    };

    const deleteAccount = async () => {
        await userRepository.deleteAccount();

        await logout();

        router.push({
            name: "apps"
        });
    }

    const unsubscribe = async () => {
        console.log(subscriptionRef.value.subscriptionId);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subscriptionId: subscriptionRef.value.subscriptionId,
            }),
        };

        const response: Response = await fetch(
            "/api/stripe/unsubscribe",
            requestOptions
        );

        const result = await response.json();

        console.log(result);


        if (result.status === 'ok') {
            await stripeRepository.removedSubscription();

            subscriptionRef.value = null;
        }
    }

    onMounted(async () => {
        const subscription = await stripeRepository.getSubscription();

        subscriptionRef.value = subscription;
    })

    return {
        user,
        isAuthenticated,
        subscriptionRef,
        logout,
        deleteAccount,
        unsubscribe,
    }
};