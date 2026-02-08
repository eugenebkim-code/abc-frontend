const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE ||
  ""

console.log("🔧 API_BASE:", API_BASE)
console.log("🔧 ENV:", import.meta.env)

function api(path: string) {
  // добавляем /api префикс для всех запросов
  const url = `${API_BASE}/api${path}`
  console.log("🔧 API URL:", url)
  return url
}

// =========================
// PROFILE
// =========================

export async function fetchProfile() {
  const res = await fetch(api("/profile"))
  if (!res.ok) throw new Error("Failed to load profile")
  return res.json()
}

// =========================
// CARS
// =========================

export async function fetchCars() {
  const res = await fetch(api("/cars"))
  if (!res.ok) throw new Error("Failed to load cars")
  return res.json()
}

export async function fetchCarById(id: string) {
  const res = await fetch(api(`/cars/${id}`))
  if (!res.ok) throw new Error("Failed to load car")
  return res.json()
}

// =========================
// META (пока заглушки, чтобы не ломалось)
// =========================

export async function fetchModels() {
  return []
}

export async function fetchPriceRanges() {
  return []
}
