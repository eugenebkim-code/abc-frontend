const API_BASE = import.meta.env.VITE_API_BASE_URL

function api(path: string) {
  return `${API_BASE}/api${path}`
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
// META
// =========================

export async function fetchModels() {
  const res = await fetch(api("/meta/models"))
  if (!res.ok) throw new Error("Failed to load models")
  return res.json()
}

export async function fetchPriceRanges() {
  const res = await fetch(api("/meta/price-ranges"))
  if (!res.ok) throw new Error("Failed to load price ranges")
  return res.json()
}