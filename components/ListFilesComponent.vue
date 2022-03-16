<template>
  <button
    @click="downloadZip"
    :disabled="!canDownload"
    type="button"
    :class="`absolute bottom-20 right-16 inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
      canDownload ? '' : 'opacity-50'
    }`"
  >
    <DownloadIcon class="h-6 w-6" aria-hidden="true" />
  </button>

  <ul
    role="list"
    class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
  >
    <li v-for="(file, index) in files" :key="index" class="relative">
      <div
        class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
      >
        <img :src="file.url" alt="" class="object-cover pointer-events-none" />
      </div>
      <div class="flex justify-between pt-2">
        <p
          v-if="file.percentReduction"
          class="block text-sm font-medium text-gray-500 pointer-events-none"
        >
          -{{ file.percentReduction.toFixed(2) }}
          %
        </p>

        <p
          :class="`block px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 ${
            file.compressedFile != null ? 'bg-green-100 text-green-800' : ''
          }`"
        >
          {{ file.compressedFile != null ? "Compressed" : "In progress..." }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { saveAs } from "file-saver";
import JSZip from "jszip";

import { DownloadIcon } from "@heroicons/vue/outline/index.js";

const props = defineProps({
  files: {
    type: Array,
    default: () => [],
  },
});

const canDownload = ref(
  props.files.filter((file) => file.compressedFile == null).length == 0
);

watch(props.files, (value) => {
  canDownload.value =
    value.filter((file) => file.compressedFile == null).length == 0;
});

const downloadZip = async () => {
  const zip = new JSZip();

  props.files.map((file) => {
    zip.file(file.file.name, file.compressedFile);
  });

  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, "xcompressor.zip");
  });
};
</script>
