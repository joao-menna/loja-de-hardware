import { NextFunction, Request, Response } from "express"
import { JwtInterface } from "../interfaces/jwt"
import { verify } from "jsonwebtoken"

export default function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers
  const jwtKey = process.env.JWT_KEY

  if (!authorization || !jwtKey) {
    res.status(401).json({
      message: "Unauthorized"
    })
    return
  }

  let decoded
  try {
    decoded = verify(authorization, jwtKey) as JwtInterface
  } catch (err) {
    res.status(401).json({
      message: "JWT mal formado"
    })
    return
  }

  if (!decoded.authorized) {
    res.status(401).json({
      message: "Unauthorized"
    })
    return
  }

  next()
}
