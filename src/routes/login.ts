import { Application } from "express"
import { LoginController } from "../controllers/login"

export default function loginRoutes(express: Application) {
  express.post("/login", (req, res) => {
    const loginController = new LoginController()
    loginController.login(req, res)
  })
}