import express, { Express, Request, Response } from "express";
import { processClient } from "./pipes-and-filters";
import { Client } from "./pipes-and-filters/data-structure/Client";

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.post("/clients", (req: Request, res: Response) => {

  const client = req.body.client as Client;
  
  const estaBien = client.nombre != null 
                   && client.nombre != "" 
                   && client.apellido != null 
                   && client.apellido != "" 
                   && client.cedula != null 
                   && client.cedula > 0 
                   && client.telefono != null 
                   && client.telefono != "" 
                   && client.departamento != null 
                   && client.departamento != "" 
                   && (client.necesita_asistencia_movilidad === false || client.necesita_asistencia_movilidad === true);

  if (!estaBien) {
    return res.status(400).send({ message: "Los datos del cliente no son válidos." });
  }

  processClient(req.body.client);

  res
    .status(200)
    .send({ message: "Clientes recibidos satisfactoriamente.", client: req.body.client });
  
  
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
