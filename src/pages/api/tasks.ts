import { ErrorAuth, ErrorSchema } from "../../models/errors"
import { NextApiRequest, NextApiResponse } from "next"
import { Task, Tasks } from "../../models/task"

import { Auth } from "../../models/auth"
import { Tag } from ".prisma/client"
import { User } from "../../models/user"
import { db } from "../../db"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = new Auth(req, res)
  const email = auth.isLogin()
  const id = req.query.id ? Number(req.query.id.toString()) : 0
  try {
    if (!email || typeof email === "boolean") throw ErrorAuth

    const t = req.query.tag ? req.query.tag.toString() : ""
    let tag = Object.keys(Tag).find((i) => i === t) as Tag
    if (!tag) tag = Tag.TODO

    switch (req.method) {
      default:
        throw ErrorSchema

      case "GET":
        const task = await Tasks.byTag(tag)
        return res.json({ tag, data: task })

      case "DELETE":
        const c = await db.todo.delete({ where: { id } })
        return res.json({ data: c })

      case "POST":
        const { title, reference } = req.body
        if (!title) throw ErrorSchema
        const inserted = await Tasks.create({ title, reference })
        return res.json({ data: inserted })

      case "PUT":
        const card = new Task(id)
        const me = new User(email)
        const { id: userId } = await me.details()
        const nextCard = await card.tag(tag, userId)
        return res.json({ data: nextCard })
    }
  } catch (e) {
    const code = e.code || 500
    res.status(code).json({
      error: true,
      message: e.message,
    })
  }
}
