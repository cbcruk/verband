export interface User {
  id: string
  email: string
  password: string
  name: string
}

export class UserStore {
  private users: Map<string, User> = new Map()

  constructor() {
    this.seedUsers()
  }

  private seedUsers(): void {
    const testUsers: User[] = [
      { id: 'user_1', email: 'admin@example.com', password: 'admin123', name: 'Admin' },
      { id: 'user_2', email: 'user@example.com', password: 'user123', name: 'User' },
    ]

    testUsers.forEach((user) => this.users.set(user.id, user))
  }

  findByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.email === email)
  }

  findById(id: string): User | undefined {
    return this.users.get(id)
  }
}
