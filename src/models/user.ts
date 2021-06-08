import { db } from "../db"

export class User {
  email: string
  constructor(email: string) {
    this.email = email
  }

  async details() {
    return db.user
      .findUnique({
        where: { email: this.email },
      })
      .then((data) => {
        delete data.password
        return data
      })
  }
}
