import { ComponenteController } from "../controllers/componente"
import jwtMiddleware from "../middlewares/jwt"
import { Application } from "express"

export default function componenteRoutes(express: Application) {
  express.get("/componente", jwtMiddleware, (req, res) => {
    const componenteController = new ComponenteController()
    componenteController.getAll(req, res)
  })

  express.get("/componente/:id", jwtMiddleware, (req, res) => {
    const componenteController = new ComponenteController()
    componenteController.getOne(req, res)
  })

  express.post("/componente", jwtMiddleware, (req, res) => {
    const componenteController = new ComponenteController()
    componenteController.insertOne(req, res)
  })

  express.put("/componente/:id", jwtMiddleware, (req, res) => {
    const componenteController = new ComponenteController()
    componenteController.updateOne(req, res)
  })

  express.delete("/componente/:id", jwtMiddleware, (req, res) => {
    const componenteController = new ComponenteController()
    componenteController.deleteOne(req, res)
  })
}
