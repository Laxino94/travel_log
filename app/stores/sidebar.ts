export type SidebarItem = {
  label: string
  icon: string
  href: string
  id: string
}

export const useSidebarStore = defineStore('useSidebarStore', () => {
  const sidebarItems = ref<SidebarItem[]>([])
  const loading = ref(false)
  return {
    loading,
    sidebarItems
  }
})
