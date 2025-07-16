export interface ObjectStats {
  usage: Usage
  plan: Plan
  billing: Billing
}

export interface Usage {
  objects: number
  storage: number
}

export interface Plan {
  included: number
}

export interface Billing {
  extraStorage: number
  storagePrice: number
  objectsPrice: number
  totalEstimate: number
}

export interface ObjectStatsResponse {
  stats: ObjectStats,
  revalidate: () => Promise<ObjectStatsResponse>
}