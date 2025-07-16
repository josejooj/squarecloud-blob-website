export interface ObjectStats {
  objects: number
  size: number
  storagePrice: number
  objectsPrice: number
  totalEstimate: number
}

export interface ObjectStatsResponse {
  stats: ObjectStats,
  revalidate: () => Promise<ObjectStatsResponse>
}