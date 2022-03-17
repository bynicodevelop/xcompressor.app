export const useCommons = () => {
    const { AUTHENTICATED_USER_MAX_FILE_SIZE, AUTHENTICATED_USER_MAX_UPLOAD_PER_DAY } = useRuntimeConfig();
    const sessionCookie = useCookie<Object>('__session');

    if (sessionCookie.value === undefined) {
        sessionCookie.value = {};
    }

    const route = useRoute();

    const isElectron = (route.query.electron || '0') === '1';

    const maxFilePerDay = useState("maxFilePerDay");
    const maxFileSize = useState("maxFileSize");

    if (sessionCookie.value['isAuthenticated'] ?? false) {
        maxFilePerDay.value = parseInt(AUTHENTICATED_USER_MAX_UPLOAD_PER_DAY);
        maxFileSize.value = parseInt(AUTHENTICATED_USER_MAX_FILE_SIZE);
    }

    return {
        maxFilePerDay,
        maxFileSize,
        isElectron
    }
}