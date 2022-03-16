export default defineNuxtRouteMiddleware((to, from) => {
    const sessionCookie = useCookie<Object>('__session')

    if (!(sessionCookie.value['isAuthenticated'] ?? false)) {
        return navigateTo({
            name: 'apps'
        });
    }
})