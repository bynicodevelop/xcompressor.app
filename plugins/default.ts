export default defineNuxtPlugin(async (nuxtApp) => {
    const { DEFAULT_MAX_UPLOAD_PER_DAY, DEFAULT_MAX_FILE_SIZE } = useRuntimeConfig();
    const sessionCookie = useCookie<Object>('__session');

    useState('maxFilePerDay', () => DEFAULT_MAX_UPLOAD_PER_DAY);
    useState('maxFileSize', () => DEFAULT_MAX_FILE_SIZE);

    useState<number>('co2total', () => sessionCookie.value['co2'] ?? 0);
})