<script setup lang="ts">
const props = defineProps<{
  label: string
  error?: string
  name: string
  type?: 'text' | 'textarea' | 'number'
  disabled?: boolean
}>()
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <!-- as is a vue property that determines the component type -->
    <Field
      :as="props.type === 'textarea' ? 'textarea' : 'input'"
      :name="props.name"
      :type="props.type || 'text'"
      :disabled="props.disabled"
      class="w-full"
      :class="{
        'input-error': props.error,
        'input': !type || props.type === 'text' || props.type === 'number',
        'textarea': props.type === 'textarea',
      }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
