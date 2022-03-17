import UserRepository from "~~/repositories/UserRepository";

export const useUser = () => {
    const sessionCookie = useCookie<Object>('__session');

    if (sessionCookie.value === undefined) {
        sessionCookie.value = {};
    }

    const userRepository = useState<UserRepository>('userRepository').value;
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

    return {
        user,
        isAuthenticated,
        logout,
        deleteAccount,
    }
};