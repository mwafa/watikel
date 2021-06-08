import fetch, { RequestInit } from "node-fetch"

export const fetcher = <T>(url: string, ops?: RequestInit) =>
  fetch(url, {
    headers: { "content-type": "application/json" },
    ...ops,
  }).then<T>((r) => r.json())
