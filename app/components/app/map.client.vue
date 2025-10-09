<script lang="ts" setup>
import getUserLocation from '../../utils/get-user-location'

const colorMode = useColorMode()
const style = computed(() => colorMode.value === 'dark'
  ? '/styles/dark.json'
  : 'https://tiles.openfreemap.org/styles/liberty')
const center = ref<[number, number]>([109, 34.5])
const zoom = ref(3)

onMounted(() => {
  const userLocation = getUserLocation()
  if (userLocation) {
    center.value = userLocation.value
  }
})
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
