import { Employee } from "@/app/types/types"

const CACHE_KEY = "excel-data"
const EXPIRATION_KEY = "excel-data-exp"

export function saveToCache(data: Employee[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  localStorage.setItem(EXPIRATION_KEY, (Date.now() + 30 * 60 * 1000).toString()) // 30 minutes
}

export function loadFromCache(): Employee[] | null {
  const exp = localStorage.getItem(EXPIRATION_KEY)
  const now = Date.now()

  if (exp && now < parseInt(exp)) {
    const cached = localStorage.getItem(CACHE_KEY)
    return cached ? (JSON.parse(cached) as Employee[]) : null
  }

  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(EXPIRATION_KEY)
  return null
}

export function isCacheActive(): boolean {
  const exp = localStorage.getItem(EXPIRATION_KEY)
  return exp !== null && Date.now() < parseInt(exp)
}
