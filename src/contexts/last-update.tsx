import { ReactChild, createContext, useState } from "react"

export const LastUpdateCtx = createContext({
  date: new Date(),
  update: () => {},
})

export const LastUpdateProvider = ({ children }: { children: ReactChild }) => {
  const [d, setD] = useState(new Date())
  const update = () => {
    setD(new Date())
  }
  return (
    <LastUpdateCtx.Provider value={{ date: d, update }}>
      {children}
    </LastUpdateCtx.Provider>
  )
}
