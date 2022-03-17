export default defineNuxtPlugin(async (nuxtApp) => {
    console.log("Plugin: default");

    const { DEFAULT_MAX_UPLOAD_PER_DAY, DEFAULT_MAX_FILE_SIZE } = useRuntimeConfig();

    const sessionCookie = useCookie<Object>('__session', {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        path: '/',
    });

    if (sessionCookie.value === undefined) {
        sessionCookie.value = {};
    }

    if (sessionCookie.value['isAuthenticated'] === undefined) {
        sessionCookie.value = {
            ...sessionCookie.value, ...{
                'isAuthenticated': false,
            }
        };
    }

    if (sessionCookie.value['co2'] === undefined) {
        sessionCookie.value = {
            ...sessionCookie.value, ...{
                'co2': 0,
            }
        };
    }

    useState('maxFilePerDay', () => DEFAULT_MAX_UPLOAD_PER_DAY);
    useState('maxFileSize', () => DEFAULT_MAX_FILE_SIZE);

    useState<number>('co2total', () => sessionCookie.value['co2'] ?? 0);

    console.log("Plugin: default loaded");
})