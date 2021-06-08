import { NextApiRequest, NextApiResponse } from "next"

import Cookies from "cookies"
import { db } from "../db"
import jwt from "jsonwebtoken"

export class Auth {
  token: string
  req: NextApiRequest
  res: NextApiResponse
  Cookies: Cookies
  private CookieKey = "x-authorization"
  private TokenKey = "Bearer "

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req
    this.res = res
    this.Cookies = new Cookies(req, res)
    const token = this.Cookies.get(this.CookieKey)
    try {
      this.token = token.split(this.TokenKey)[1]
    } catch {
      this.token = ""
    }
  }

  sign(email: string) {
    this.token = jwt.sign({ email }, process.env.SECRET)
    return this.toBearer()
  }

  toBearer() {
    return this.TokenKey + this.token
  }

  async login(email: string, password: string) {
    const user = await db.user.findMany({
      where: { email: email.toLowerCase(), password },
    })
    if (user.length > 0) {
      this.sign(email)
      this.Cookies.set(this.CookieKey, this.toBearer(), { httpOnly: true })
      return true
    }
    return false
  }

  update() {
    return this.Cookies.set(this.CookieKey, this.toBearer(), { httpOnly: true })
  }

  isLogin(): boolean | string {
    try {
      const payload = jwt.verify(this.token, process.env.SECRET) as {
        email: string
      }
      return payload.email
    } catch {
      return false
    }
  }

  logout() {
    this.Cookies.set(this.CookieKey, "logout")
  }
}
