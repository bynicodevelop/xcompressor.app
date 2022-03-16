<template>
  <div class="relative overflow-hidden">
    <Html>
      <Head>
        <Title>XCompressor - The better way to compress your images</Title>
        <Meta
          name="description"
          content="Drag and drop your images and we will do the rest. All you
                  have to do is upload your compressed images. XCompressor - The better way to compress your images "
        />
      </Head>
    </Html>

    <main>
      <div
        class="pt-6 bg-gray-900 sm:pt-6 lg:pt-6 lg:pb-14 lg:overflow-hidden h-full"
      >
        <div class="mx-auto max-w-10xl lg:px-8">
          <div>
            <div
              class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
            >
              <div class="lg:py-24">
                <NuxtLink
                  :to="{ name: 'apps' }"
                  class="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                >
                  <span
                    class="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full"
                    >Getting Started</span
                  >
                  <span class="ml-4 text-sm">try online</span>
                  <ChevronRightIcon
                    class="ml-2 w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  />
                </NuxtLink>
                <h1
                  class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
                >
                  <span class="block">The better way to</span>
                  <span class="block text-indigo-400"
                    >compress your images</span
                  >
                </h1>
                <p
                  class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                >
                  Drag and drop your images and we will do the rest. All you
                  have to do is upload your compressed images.
                </p>
                <div class="py-8">
                  <img src="/images/preview.png" alt="XCompressor" />
                </div>
                <div class="flex justify-center space-x-4">
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/apps-34fcd.appspot.com/o/xcompressor%2Fdesktop%2Fv1.0.0%2Fmacos%2FXCompressor.dmg?alt=media&token=5adce3b7-4a01-49ae-8502-be414957f9a7"
                    download
                    class="block py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                  >
                    Download For MacOs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from "@heroicons/vue/solid/index.js";
</script>
