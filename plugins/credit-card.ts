import VueCreditCardValidation from 'vue-credit-card-validation';

export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.use(VueCreditCardValidation);
})