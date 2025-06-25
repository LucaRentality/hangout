import bcrypt from "bcryptjs"

interface User {
  id: string
  username: string
  password: string
  role: "user" | "admin"
  swipesRemaining?: number
  hangoutsRemaining?: number
  lastResetDate?: string
}

const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: bcrypt.hashSync("adminpassword", 10),
    role: "admin",
    swipesRemaining: 10,
    hangoutsRemaining: 5,
    lastResetDate: new Date().toISOString(),
  },
  {
    id: "2",
    username: "user",
    password: bcrypt.hashSync("userpassword", 10),
    role: "user",
    swipesRemaining: 10,
    hangoutsRemaining: 5,
    lastResetDate: new Date().toISOString(),
  },
]

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  const user = users.find((u) => u.username === username)
  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }
  return null
}

export async function getUserById(id: string): Promise<User | null> {
  const user = users.find((u) => u.id === id)
  if (user) {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }
  return null
}

export function getUser(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function updateUser(updatedUser: User): void {
  const index = users.findIndex((user) => user.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
  }
}

export function resetWeeklyLimits(user: User): User {
  // Implement the logic to reset weekly limits
  // This is a placeholder implementation
  return {
    ...user,
    swipesRemaining: 10,
    hangoutsRemaining: 5,
    lastResetDate: new Date().toISOString(),
  }
}
