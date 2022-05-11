import dbHelperAll from '../Utils/helperAll.js'
import dbHelperNombre from '../Utils/helperNombre.js'
import dbHelperEdad from '../Utils/helperEdad.js'
import dbHelperNombreEdad from '../Utils/helperNombreEdad.js'
import 'dotenv/config'


export class personajeService {
    getpersonaje = async(nombre, edad) => {
        console.log('Get all');
        let response = 0;
        if (!nombre) {
            if (!edad) {
                const query = `sp_GetAll`;
                response = await dbHelperAll(undefined, undefined, query);
            } else {
                const query = `SELECT * FROM Personaje WHERE edad = @edad`;
                response = await dbHelperEdad(edad, query);
            }
        }else {
            if(edad){
                const query = `SELECT * FROM Personaje WHERE nombre = @nombre AND edad = @edad`;
                response = await dbHelperNombreEdad(nombre, edad, query);
            }else{
                const query = `SELECT * FROM Personaje WHERE nombre = @nombre`;
                response = await dbHelperNombre(nombre, query);
            }
        }

        return response.recordset;
    }

    getpersonajeById = async(id) => {
        console.log('Get by ID');
        const query = `SELECT Personaje.Imagen, Personaje.edad, Personaje.peso, Personaje.historia, Personaje.comidaFavorita, Personaje.Nombre, PeliSerie.imagen, PeliSerie.Titulo
        FROM Personaje, PeliSerie`;
        const response = await dbHelperAll(id, undefined, query, undefined);
        if(response==null){
            return res.status(404);
        }else{
            console.log(response) 
        return response.recordset[0];
        }
    }

    createpersonaje = async(personaje) => {
        console.log('Create');
        const query = `INSERT INTO Personaje(imagen, nombre, edad, peso, historia, comidaFavorita) VALUES (@imagen, @nombre, @edad, @peso, @historia, @comidaFavorita)`
        const response = await dbHelperAll(undefined, personaje, query);

        return response.recordset;
    }

    updatepersonajeById = async(id, personaje) => {
        console.log('Update by ID');
        const query = `UPDATE Personaje SET imagen = @imagen, nombre = @nombre, edad = @edad, peso = @peso, historia = @historia, comidaFavorita = @comidaFavorita WHERE id = @Id`
        const response = await dbHelperAll(id, personaje, query);

        return response.recordset;
    }

    deletepersonajeById = async(id) => {
        console.log('Delete by ID');
        const query = `DELETE FROM Personaje WHERE id = @id`
        const response = await dbHelperAll(id, undefined, query);
        return response.recordset;
    }
}