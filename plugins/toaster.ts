export default defineNuxtPlugin(async (nuxtApp) => {
    const toaster = useNotification();

    return {
        provide: {
            toaster,
        }
    }
})