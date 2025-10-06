<script lang="ts" setup>
const authStore = useAuthStore()
onMounted(() => {
  authStore.signOut() // the moment this page is mounted, we sign out the user
})
</script>

<template>
  <div
    class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4"
  >
    <span class="loading loading-spinner loading-lx" />
  </div>
</template>
