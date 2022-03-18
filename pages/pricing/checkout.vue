<template>
  <div class="bg-white">
    <!-- Background color split screen for large screens -->
    <div
      class="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white"
      aria-hidden="true"
    />
    <div
      class="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-gray-50"
      aria-hidden="true"
    />

    <main
      class="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48"
    >
      <h1 class="sr-only">Order information</h1>

      <section
        aria-labelledby="summary-heading"
        class="bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2"
      >
        <div class="max-w-lg mx-auto lg:max-w-none">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <ul
            role="list"
            class="text-sm font-medium text-gray-900 divide-y divide-gray-200"
          >
            <li
              v-for="product in products"
              :key="product.id"
              class="flex items-start py-6 space-x-4"
            >
              <div class="flex-auto space-y-1">
                <h3>{{ product.name }}</h3>
                <p
                  v-for="(option, index) in product.options"
                  :key="index"
                  class="text-gray-500"
                >
                  {{ option }}
                </p>
              </div>
              <p class="flex-none text-base font-medium">
                ${{ product.price.toFixed(2) }}
              </p>
            </li>
          </ul>

          <dl
            class="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block"
          >
            <div class="flex items-center justify-between border-gray-200">
              <dt class="text-base">Total</dt>
              <dd class="text-base">
                ${{
                  products
                    .reduce((acc, value) => (acc += value.price), 0)
                    .toFixed(2)
                }}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <form
        @submit.prevent="onSubmit"
        class="pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
      >
        <div class="max-w-lg mx-auto lg:max-w-none">
          <section aria-labelledby="contact-info-heading">
            <h2
              id="contact-info-heading"
              class="text-lg font-medium text-gray-900"
            >
              Contact information
            </h2>

            <div class="mt-6">
              <label
                for="email-address"
                class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <div class="mt-1">
                <InputText
                  v-model="email"
                  inputType="email"
                  inputPlaceholder="Enter your main email address"
                  errorMessage="Please enter a valid email address (e.g. john.doe@domain.tld)."
                  inputName="email"
                  v-model:inputError="emailError"
                />
              </div>
            </div>
          </section>

          <ClientOnly>
            <section aria-labelledby="payment-heading" class="mt-10">
              <h2
                id="payment-heading"
                class="text-lg font-medium text-gray-900"
              >
                Payment details
              </h2>

              <div class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                <div class="col-span-3 sm:col-span-4">
                  <label
                    for="name-on-card"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div class="mt-1">
                    <InputText
                      v-model="cardName"
                      inputType="text"
                      inputPlaceholder="Cardholder's name"
                      errorMessage="Please enter a valid name (e.g. John Doe)."
                      inputName="card-name"
                      v-model:inputError="cardNameError"
                    />
                  </div>
                </div>

                <div class="col-span-3 sm:col-span-4">
                  <label
                    for="card-number"
                    class="block text-sm font-medium text-gray-700"
                    >Card number</label
                  >
                  <div class="mt-1">
                    <InputText
                      v-model="cardNumber"
                      inputType="text"
                      inputPlaceholder="#### #### #### ####"
                      errorMessage="Please enter a valid card number (e.g. 1234 5678 9012 3456)."
                      inputName="card-number"
                      v-model:inputError="cardNumberError"
                      v-cardformat:formatCardNumber
                    />
                  </div>
                </div>

                <div class="col-span-2 sm:col-span-3">
                  <label
                    for="expiration-date"
                    class="block text-sm font-medium text-gray-700"
                    >Expiration date (MM/YY)</label
                  >
                  <div class="mt-1">
                    <InputText
                      v-model="cardExpiration"
                      inputType="text"
                      inputPlaceholder="MM/YY"
                      errorMessage="Please enter a valid expiration date (e.g. 12/20)."
                      inputName="card-expiration"
                      v-model:inputError="cardExpirationError"
                      v-cardformat:formatCardExpiry
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="cvc"
                    class="block text-sm font-medium text-gray-700"
                    >CVC</label
                  >
                  <div class="mt-1">
                    <InputText
                      v-model="cardCVC"
                      inputType="text"
                      inputPlaceholder="000"
                      errorMessage="Please enter a valid CVC (e.g. 123)."
                      inputName="card-cvc"
                      v-model:inputError="cardCVCError"
                      v-cardformat:formatCardCVC
                    />
                  </div>
                </div>
              </div>
            </section>
          </ClientOnly>

          <div
            class="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-end"
          >
            <button
              :disabled="isLoading"
              type="submit"
              :class="`w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`"
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
const {
  isLoading,
  products,
  email,
  emailError,
  cardName,
  cardNameError,
  cardNumber,
  cardNumberError,
  cardExpiration,
  cardExpirationError,
  cardCVC,
  cardCVCError,
  onSubmit,
} = useCheckout();

onMounted(() => {
  if (window.location.hostname === "localhost") {
    cardName.value = "John Doe";
    cardNumber.value = "4242 4242 4242 4242";
    cardExpiration.value = "12/22";
    cardCVC.value = "123";
  }
});
</script>
