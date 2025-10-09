export default function getUserLocation() {
  const center = ref<[number, number]>([109, 34.5])
  if (!import.meta.client)
    return

  if (!('geolocation' in navigator)) {
    console.warn('Geolocation API not supported')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { longitude, latitude } = pos.coords
      center.value = [longitude, latitude]
    },
    (err) => {
      throw err
      // 保留默认中心
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  )
  return center
}
