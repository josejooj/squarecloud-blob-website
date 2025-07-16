export interface Object {
  id: string
  size: number
  created_at: string
  expires_at?: string
}

export interface ObjectListResponse {
  objects: Object[],
  revalidate: () => Promise<ObjectListResponse>
}