<template>
  <NuxtLayout name="layout">
    <ConfirmModalComponent
      v-model:open="open"
      :onCancel="onCancel"
      :onConfirm="onConfirm"
      titleLabel="Delete your account?"
      descriptionLabel="Are you sure you want to delete your account. This action cannot be undone."
    />

    <div class="flex flex-col pt-12">
      <h2 class="text-center text-2xl mb-6">Profile management</h2>

      <ul role="list" class="divide-y divide-gray-200 w-3/5 m-auto">
        <li class="py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">Logout</p>
              <p class="text-sm text-gray-500 truncate">
                Logout of your account
              </p>
            </div>
            <div>
              <button
                @click="logout"
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Logout
              </button>
            </div>
          </div>
        </li>

        <li class="py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">Delete account</p>
              <p class="text-sm text-gray-500">
                Please note that deleting your account also deletes all the
                benefits you have acquired.
              </p>
            </div>
            <div>
              <button
                @click="open = true"
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { logout, deleteAccount } = useUser();

definePageMeta({
  middleware: ["profile"],
});

const open = ref(false);

const onCancel = () => {
  open.value = false;
};

const onConfirm = async () => {
  await deleteAccount();

  open.value = false;
};
</script>
