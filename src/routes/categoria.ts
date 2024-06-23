import { CategoriaController } from "../controllers/categoria"
import jwtMiddleware from "../middlewares/jwt"
import { Application } from "express"

export default function categoriaRoutes(express: Application) {
  express.get("/categoria", jwtMiddleware, (req, res) => {
    const categoriaController = new CategoriaController()
    categoriaController.getAll(req, res)
  })

  express.get("/categoria/:id", jwtMiddleware, (req, res) => {
    const categoriaController = new CategoriaController()
    categoriaController.getOne(req, res)
  })

  express.post("/categoria", jwtMiddleware, (req, res) => {
    const categoriaController = new CategoriaController()
    categoriaController.insertOne(req, res)
  })

  express.put("/categoria/:id", jwtMiddleware, (req, res) => {
    const categoriaController = new CategoriaController()
    categoriaController.updateOne(req, res)
  })

  express.delete("/categoria/:id", jwtMiddleware, (req, res) => {
    const categoriaController = new CategoriaController()
    categoriaController.deleteOne(req, res)
  })

  express.get("/categoria/:id/componente", jwtMiddleware, (req, res) => {
    const categoriaController = new CategoriaController()
    categoriaController.getOneWithComponente(req, res)
  })
}
