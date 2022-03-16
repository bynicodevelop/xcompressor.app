<template>
  <div>
    <label
      v-if="props.inputLabel"
      for="project-name"
      :class="`block text-sm font-medium text-gray-900 ${
        props.inputError ? 'text-red-600' : ''
      }`"
    >
      {{ props.inputLabel }}
    </label>
    <div class="mt-1">
      <input
        @focus="onFocus"
        @blur="onBlur"
        v-model="valueModel"
        :disabled="props.inputDisabled"
        :placeholder="props.inputPlaceholder || props.inputLabel"
        :type="props.inputType"
        :name="props.inputName"
        :id="props.inputId || props.inputName"
        :class="`block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${
        props.inputError ? 'border-red-300 text-red-900' : ''
      } ${
          props.inputDisabled
            ? 'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            : ''
        }`"
      />
      <p
        v-if="!props.inputError && props.helpMessage"
        class="mt-2 text-sm text-gray-500"
      >
        {{ props.helpMessage }}
      </p>
      <p v-if="props.inputError" class="mt-2 text-sm text-red-600">
        {{ props.errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
    required: true,
  },
  inputPlaceholder: {
    type: String,
    default: "",
  },
  inputError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  helpMessage: {
    type: String,
    default: "",
  },
  inputLabel: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  inputName: {
    type: String,
    default: "",
    required: true,
  },
  inputId: {
    type: String,
    default: "",
  },
  inputDisabled: {
    type: Boolean,
    default: false,
  },
});

const isStated = ref(false);

const emits = defineEmits(["update:modelValue", "update:inputError"]);

const valueModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const onBlur = () => {
  emits("update:inputError", false);
};

const onFocus = () => {
  isStated.value = true;

  emits("update:inputError", false);
};
</script>
