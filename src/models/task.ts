import { Prisma, Tag } from ".prisma/client"

import { db } from "../db"

export class Task {
  id: number
  constructor(id: number) {
    this.id = id
  }

  details() {
    return db.todo.findUnique({
      where: { id: this.id },
      include: { assigned: true },
    })
  }

  tag(t: Tag, user?: number) {
    return db.todo.update({
      where: { id: this.id },
      data: {
        lastUpdate: new Date(),
        tag: t,
        userId: user,
      },
    })
  }
}

export const Tasks = {
  byTag: async (tag: Tag) => {
    return db.todo
      .findMany({
        where: { tag: tag },
        include: { assigned: true },
      })
      .then((data) => {
        return data.map((todo) => {
          delete todo.assigned?.password
          return todo
        })
      })
  },

  byUser: (id: number) => {
    return db.todo.findMany({ where: { userId: id } })
  },

  create: (ops: { title: string; reference?: string }) => {
    return db.todo.create({
      data: {
        lastUpdate: new Date(),
        tag: Tag.TODO,
        ...ops,
      },
    })
  },
}
