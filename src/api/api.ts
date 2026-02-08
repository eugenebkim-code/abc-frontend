const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/profile`)
  if (!res.ok) throw new Error("Failed to load profile")
  return res.json()
}

export async function fetchCars() {
  const res = await fetch(`${API_BASE}/cars`)
  if (!res.ok) throw new Error("Failed to load cars")
  return res.json()
}

export async function fetchModels() {
  const res = await fetch(`${API_BASE}/meta/models`)
  if (!res.ok) throw new Error("Failed to load models")
  return res.json()
}

export async function fetchPriceRanges() {
  const res = await fetch(`${API_BASE}/meta/price-ranges`)
  if (!res.ok) throw new Error("Failed to load price ranges")
  return res.json()
}