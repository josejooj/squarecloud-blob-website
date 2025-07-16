export interface User {
  id: string
  name: string
  email: string
  plan: Plan,
  avatar: string
}

export interface Plan {
  name: string
  memory: Memory
  duration: number
}

export interface Memory {
  limit: number
  available: number
  used: number
}

export interface Application {
  name: string
  id: string
  desc: string
  ram: number
  lang: string
  domain: string
  custom: string
  cluster: string
}