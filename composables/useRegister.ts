import UserRepository from "~~/repositories/UserRepository";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required("email_field"),
    password: yup.string().min(6, "password_field").required("password_field"),
});

export const useRegister = () => {
    const router = useRouter();

    const email = ref("");
    const emailError = ref(false);

    const password = ref("");
    const passwordError = ref(false);

    const isLoading = ref(false);

    const userRepository = <UserRepository>useState("userRepository").value;

    const onSubmit = async () => {
        emailError.value = false;
        passwordError.value = false;

        isLoading.value = true;

        try {
            const isValid = schema.validateSync(
                {
                    email: email.value,
                    password: password.value,
                },
                { abortEarly: false }
            );

            if (!isValid) {
                emailError.value = true;

                return;
            }

            await userRepository.createAccount({
                email: email.value,
                password: password.value,
            });

            router.push({
                name: "apps"
            });
        } catch (error) {
            if (!error.errors) {
                if (error.message === "email-already-in-use") {
                    try {
                        await login({
                            email: email.value,
                            password: password.value,
                        })

                        router.push({
                            name: "apps"
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                error.errors.forEach((error) => {
                    if (error === "email_field") {
                        emailError.value = true;
                    }

                    if (error === "password_field") {
                        passwordError.value = true;
                    }
                });
            }
        }
    }

    const login = async ({
        email,
        password,
    }) => {

        try {
            await userRepository.login({
                email,
                password,
            });
        } catch (e) {
            console.log(e);
        }
    }

    return {
        email,
        emailError,
        password,
        passwordError,
        onSubmit,
    }
}