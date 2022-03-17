<template>
  <div :class="`flex flex-col h-screen px-5 py-5 ${isElectron ? 'pt-2' : ''}`">
    <NotificationComponent />

    <div class="md:flex md:items-center md:justify-between pb-5">
      <div
        :style="`${isElectron ? '-webkit-app-region: drag' : ''}`"
        :class="`flex-1 min-w-0 ${isElectron ? 'ml-16' : ''}`"
      >
        <h1
          class="text-xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate text-center md:text-left"
        >
          XCompressor
        </h1>
      </div>
      <div>
        <div class="mt-4 flex md:mt-0 flex-col md:flex-row justify-end">
          <div v-if="!isAuthenticated" class="flex flex-col md:flex-row">
            <div
              class="inline-flex md:mr-1 justify-center md:justify-start items-center"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
                class="mr-1 text-indigo-600"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M9.25 13.2H4.751c-.579 0-.94-.67-.648-1.203l5.25-9.599c.385-.705 1.397-.413 1.397.403v4h4.499c.579 0 .94.67.648 1.202l-5.25 9.599c-.385.705-1.397.413-1.397-.403v-4z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>

              <span class="text-gray-900 mr-1"> Double your daily limits.</span>

              <nuxt-link
                :to="{ name: 'auth' }"
                class="font-bold text-indigo-600"
              >
                Go to Freemium
              </nuxt-link>
            </div>
          </div>
          <div v-else>
            <nuxt-link
              v-if="route.name !== 'auth-profile'"
              :to="{ name: 'auth-profile' }"
            >
              Profile
            </nuxt-link>
            <nuxt-link
              v-if="route.name === 'auth-profile'"
              :to="{ name: 'apps' }"
            >
              Return to compress images
            </nuxt-link>
          </div>
        </div>

        <div
          v-if="co2Total > 0"
          class="flex flex-row justify-center md:justify-end items-center text-xs text-gray-500"
        >
          - {{ co2Total.toFixed(2) }} g Co2
          <GlobeIcon class="ml-1 h-4 w-4 text-green-600" />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { GlobeIcon } from "@heroicons/vue/outline/index.js";

const { isElectron } = useCommons();
const { isAuthenticated } = useUser();

const { co2Total } = useCo2Calculator();

const route = useRoute();
</script>
