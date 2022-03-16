import { defineNuxtConfig } from 'nuxt3'
import { resolve } from 'path'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
    publicRuntimeConfig: {
        DEFAULT_MAX_UPLOAD_PER_DAY: process.env.DEFAULT_MAX_UPLOAD_PER_DAY,
        DEFAULT_MAX_FILE_SIZE: process.env.DEFAULT_MAX_FILE_SIZE,
        AUTHENTICATED_USER_MAX_UPLOAD_PER_DAY: process.env.AUTHENTICATED_USER_MAX_UPLOAD_PER_DAY,
        AUTHENTICATED_USER_MAX_FILE_SIZE: process.env.AUTHENTICATED_USER_MAX_FILE_SIZE,
        GRAMME_CO2_PER_MO: process.env.GRAMME_CO2_PER_MO,
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    },
})
