/**
 * Utility function for making API requests
 */
export async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred while fetching the data.")
  }

  return response.json()
}

/**
 * Register a new user
 */
export async function registerUser(userData: {
  name: string
  email: string
  password: string
}) {
  return fetchApi<{ message: string; userId: string }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

/**
 * Login a user
 */
export async function loginUser(credentials: {
  email: string
  password: string
}) {
  return fetchApi<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string) {
  return fetchApi(`/api/users/${userId}`)
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, profileData: any) {
  return fetchApi(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  })
}

/**
 * Get matches
 */
export async function getMatches() {
  return fetchApi("/api/matches")
}

/**
 * Create a hangout
 */
export async function createHangout(hangoutData: any) {
  return fetchApi("/api/hangouts", {
    method: "POST",
    body: JSON.stringify(hangoutData),
  })
}

/**
 * Get hangouts
 */
export async function getHangouts() {
  return fetchApi("/api/hangouts")
}
