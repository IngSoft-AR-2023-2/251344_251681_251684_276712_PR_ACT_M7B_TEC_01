
import { QueueFactory } from './pipeline/QueueFactory';
import { Pipeline } from './pipeline/Pipeline';
import { filtroTelefono, filtroCedula } from './filters/filters';
import fs from "fs";
import { Client } from './data-structure/Client';

// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = QueueFactory.getQueueFactory<Client>; //ojo que no la invoca aca si no dentro de la Pipeline

// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
const pipeline = new Pipeline<Client>([filtroTelefono, filtroCedula], queueFactory);

let outputs: string[] = [];

pipeline.on('finalOutput', (data: Client) => {
  outputs.push("Salida final: " + data.nombre);
  fs.writeFileSync("outputs.txt", outputs.join("\n"));
});

pipeline.on('errorInFilter', (error: Error, data: Client) => {
  outputs.push("Error en el filtro: " + error.message + " " + data.nombre);
  fs.writeFileSync("outputs.txt", outputs.join("\n"));
});

export const processClient = (client: Client) => {
    pipeline.processInput({ nombre: client.nombre, apellido: client.apellido, cedula: client.cedula, 
      telefono: client.telefono, departamento: client.departamento, necesita_asistencia_movilidad: client.necesita_asistencia_movilidad});
};
