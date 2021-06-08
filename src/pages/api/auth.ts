import { NextApiRequest, NextApiResponse } from "next"

import { Auth } from "../../models/auth"
import { ErrorSchema } from "../../models/errors"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = new Auth(req, res)
  try {
    switch (req.method) {
      default:
        throw ErrorSchema
      case "POST":
        if (req.body.email && req.body.password) {
          const login = await auth.login(req.body.email, req.body.password)
          if (login) {
            return res.status(200).json({
              token: auth.toBearer(),
            })
          }
          throw { code: 401, message: "wrong username or password!" }
        }
        throw ErrorSchema
      case "DELETE":
        auth.logout()
        res.json({ message: "Log out!" })
    }
  } catch (e) {
    const code = e.code || 500
    return res.status(code).json({
      error: true,
      message: e.message,
    })
  }
}
