import { Request, Response } from "express"
import { sign } from "jsonwebtoken"

interface LoginBody {
  username: string
  password: string
}

export class LoginController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body as LoginBody

    if (!username || !password) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
      res.status(401).json({
        message: "Usuário ou senha inválido"
      })
      return
    }

    const key = process.env.JWT_KEY || ""
    const token = sign({ authorized: true }, key)

    res.json({
      token
    })
  }
}