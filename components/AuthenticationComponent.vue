<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <p class="mt-6 text-xl text-center text-sm text-gray-600">
        You are currently limited to 10 compressions / day <br />with files of
        max 5 MB.
      </p>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Upgrade to
      </h2>
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        <span class="text-indigo-600">20 compressions / day</span>
      </h2>
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        with <span class="text-indigo-600">10 MB files for free</span>.
      </h2>
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 sm:shadow sm:rounded-lg sm:px-10">
        <span class="text-sm text-gray-600 italic">
          Already have an account. You can login with this form.
        </span>
        <form @submit.prevent="onSubmit" class="space-y-6 mt-2" method="POST">
          <InputText
            v-model="email"
            inputType="email"
            inputPlaceholder="Enter your main email address"
            errorMessage="Please enter a valid email address (e.g. john.doe@domain.tld)."
            inputName="email"
            v-model:inputError="emailError"
          />

          <InputText
            v-model="password"
            inputType="password"
            inputPlaceholder="Enter your password"
            errorMessage="Please enter a valid password (6 characters minimum)."
            inputName="password"
            v-model:inputError="passwordError"
          />

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>

          <div class="relative flex justify-center">
            <NuxtLink :to="{ name: 'apps' }" class="px-2 text-gray-500 text-sm">
              Return compress images
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const { email, emailError, password, passwordError, onSubmit } = useRegister();

onMounted(() => {
  email.value =
    window.location.hostname === "localhost" ? "john@domain.tld" : "";

  password.value = window.location.hostname === "localhost" ? "123456" : "";
});
</script>
