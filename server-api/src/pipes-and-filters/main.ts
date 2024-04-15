
import { QueueFactory } from './pipeline/QueueFactory';
import { Pipeline } from './pipeline/Pipeline';
import { toLowercaseWithSpaces, toUppercase, replaceSpacesWithDots, filterWithRandomError } from './filters/filters';
import { CustomData } from './data-structure/CustomData';
import fs from "fs";

// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = QueueFactory.getQueueFactory<CustomData>; //ojo que no la invoca aca si no dentro de la Pipeline

// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
const pipeline = new Pipeline<CustomData>([toLowercaseWithSpaces, filterWithRandomError,toUppercase, replaceSpacesWithDots], queueFactory);

let outputs: string[] = [];

pipeline.on('finalOutput', (data: CustomData) => {
  outputs.push("Salida final: " + data.data);
  fs.writeFileSync("outputs.txt", outputs.join("\n"));
});

pipeline.on('errorInFilter', (error: Error, data: CustomData) => {
  outputs.push("Error en el filtro: " + error.message + " " + data.data);
  fs.writeFileSync("outputs.txt", outputs.join("\n"));
});

export const processWords = (words: string[]) => {
  words.map((word) => {
    pipeline.processInput({ data: word });
  });
};
