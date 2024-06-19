import { Application } from "express";
import loginRoutes from "../routes/login";
import categoriaRoutes from "../routes/categoria";
import componenteRoutes from "../routes/componente";
import equipamentoRoutes from "../routes/equipamento";

export default function loadRoutes(server: Application) {
  loginRoutes(server)
  categoriaRoutes(server)
  componenteRoutes(server)
  equipamentoRoutes(server)
}
