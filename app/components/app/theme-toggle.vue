<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() { return colorMode.value === 'dark' },
  set(v) { colorMode.preference = v ? 'dark' : 'light' }
})
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input v-model="isDark" type="checkbox">

    <Icon class="swap-on" name="tabler:sun" size="24" />
    <Icon class="swap-off" name="tabler:moon" size="24" />
  </label>
</template>
