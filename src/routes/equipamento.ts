import { EquipamentoController } from "../controllers/equipamento"
import jwtMiddleware from "../middlewares/jwt"
import { Application } from "express"

export default function equipamentoRoutes(express: Application) {
  express.get("/equipamento", jwtMiddleware, (req, res) => {
    const equipamentoController = new EquipamentoController()
    equipamentoController.getAll(req, res)
  })

  express.get("/equipamento/:id", jwtMiddleware, (req, res) => {
    const equipamentoController = new EquipamentoController()
    equipamentoController.getOne(req, res)
  })

  express.post("/equipamento", jwtMiddleware, (req, res) => {
    const equipamentoController = new EquipamentoController()
    equipamentoController.insertOne(req, res)
  })

  express.put("/equipamento/:id", jwtMiddleware, (req, res) => {
    const equipamentoController = new EquipamentoController()
    equipamentoController.updateOne(req, res)
  })

  express.delete("/equipamento/:id", jwtMiddleware, (req, res) => {
    const equipamentoController = new EquipamentoController()
    equipamentoController.deleteOne(req, res)
  })

  express.get("/equipamento/:id/componente", jwtMiddleware, (req, res) => {
    const equipamentoController = new EquipamentoController()
    equipamentoController.getOneWithComponente(req, res)
  })
}
