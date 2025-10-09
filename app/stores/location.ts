export const useLocationStore = defineStore('useLocationStore', () => {
  // status is the user authentication status like the spinner when loading
  const { data, status, refresh } = useFetch('/api/locations', {
    lazy: true
  })

  const sidebarStore = useSidebarStore()

  watchEffect(() => {
    if (data.value) {
      sidebarStore.loading = false
      sidebarStore.sidebarItems = data.value.map(location => ({
        label: location.name,
        icon: 'tabler:map-pin-filled',
        href: '#',
        id: `location-${location.id}`
      }))
    }
    else {
      sidebarStore.loading = status.value === 'pending'
    }
  })
  return {
    locations: data,
    status,
    refresh
  }
})
