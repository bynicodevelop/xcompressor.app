<template>
  <NuxtLayout name="layout">
    <UploadComponent v-model:files="files">
      <ListFilesComponent v-model:files="files" />
    </UploadComponent>
  </NuxtLayout>
</template>

<script setup>
const files = ref([]);
</script>
