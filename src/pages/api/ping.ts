import { NextApiRequest, NextApiResponse } from "next"

import { db } from "../../db"

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const db_status = await db.$queryRaw("SELECT True")
  const db_online = db_status[0].bool
  return res.json({
    msg: "pong",
    db_online,
  })
}
