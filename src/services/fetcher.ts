import { Tag, todo } from ".prisma/client"
import fetch, { RequestInit } from "node-fetch"

export const fetcher = <T>(url: string, ops?: RequestInit) =>
  fetch(url, {
    headers: { "content-type": "application/json" },
    ...ops,
  }).then<T>((r) => r.json())

export const fetchTask = (t: Tag) =>
  fetcher<{ error?: boolean; data: todo[] }>("/api/tasks?tag=" + t).then<
    todo[]
  >((r) => r.data || [])
