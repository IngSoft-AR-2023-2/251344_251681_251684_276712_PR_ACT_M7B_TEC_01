// src/sendData.ts
import axios from 'axios';
const faker = require('faker'); // o import faker from 'faker';


const sendData = async () => {

  const clientsData = [
    {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      cedula: 9212108,
      telefono: "098679922",
      departamento: "Montevideo",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      cedula: 1234567,
      telefono: "095324832",
      departamento: "Buenos Aires",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: faker.name.firstName(),
      apellido: "",
      cedula: 12943242,
      telefono: "091432235",
      departamento: "Maldonado",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      cedula: 10123132,
      telefono: "097665534",
      departamento: "Flores",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      cedula: 1234,
      telefono: "097665534",
      departamento: "Florida",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: "",
      apellido: "Perez",
      cedula: 12343167,
      telefono: "",
      departamento: "Canelones",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: "Emiliano",
      apellido: "Eaaaaa",
      cedula: 9876543,
      telefono: "976655354",
      departamento: "Montevideo",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: "Juan",
      apellido: "Fernandez",
      cedula: 1234123,
      telefono: "097 66 55 34",
      departamento: "Montevideo",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: null,
      apellido: null,
      cedula: null,
      telefono: null,
      departamento: null,
      necesita_asistencia_movilidad: null
    },
    {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      cedula: 21321412,
      telefono: "091 43 67 425",
      departamento: "RiverA",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    },
    {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      cedula: 21321419,
      telefono: "09 asdadew",
      departamento: "rocha",
      necesita_asistencia_movilidad: faker.datatype.boolean()
    }
  ];

  for (let i = 0; i < clientsData.length; i++) {
    try {
        const client = clientsData[i];
        const response = await axios.post('http://localhost:3000/clients', {
          client: client,
        });
        console.log(`Se ha iniciado el proceso de agenda para la persona ${client.nombre} ${client.apellido}.`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message);
      } else {
        console.error('Error:', error);
      }
    }
  }
};

sendData();

