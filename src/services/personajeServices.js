import dbHelperAll from '../Utils/helperAll.js'
import dbHelperNombre from '../Utils/helperNombre.js'
import dbHelperEdad from '../Utils/helperEdad.js'
import dbHelperNombreEdad from '../Utils/helperNombreEdad.js'
import dbHelperPeliSerie from '../Utils/helperPeliSerie.js'
import 'dotenv/config'


const tablaPersonaje=process.env.DB_TABLA_personaje;
const tablaPeliSerie=process.env.DB_TABLA_peliserie;
const tablaInter=process.env.DB_TABLA_intermedia;

export class personajeService {
    getpersonaje = async(nombre, edad,peso,idMovie) => {
        console.log('Get all');
        let response = 0;
        let query = `SELECT * FROM ${tablaPersonaje}`
        let ifWhere = false;
        if(nombre){
            if(!ifWhere){
                ifWhere=true
                query+=` WHERE nombre = @nombre`;
            }else{
                query+= ` and nombre = @nombre`;
            }
        }
        if(edad){
            if(!ifWhere){
                ifWhere=true
                query+= `, ${tablaPeliSerie}, ${tablaInter} WHERE edad = @edad`;
            }else{
                query+= ` and edad = @edad`;
            }
        }
        if(peso){
            if(!ifWhere){
                ifWhere=true
                query+= ` WHERE peso = @peso`;
            }else{
                query+= ` and peso = @peso`;
            }
        }if(idMovie){
            if(!ifWhere){
                ifWhere=true
                query+= ` WHERE ${tablaPeliSerie}.id = ${tablaInter}.idPeliSerie and ${tablaPersonaje}.id = ${tablaInter}.idPersonaje`;
            }else{
                query+= ` and ${tablaPeliSerie}.id = ${tablaInter}.idPeliSerie and ${tablaPersonaje}.id = ${tablaInter}.idPersonaje`;
            }
        }
        response= await dbHelperAll(undefined, {nombre, edad, peso}, query);
        return response.recordset;
    }

    getpersonajeById = async(id) => {
        console.log('Get by ID');
        const query = `SELECT * FROM ${tablaPersonaje} WHERE id=@id`;
        const query2 = `SELECT PeliSerie.* FROM ${tablaPeliSerie}, ${tablaPersonaje} , ${tablaInter} WHERE ${tablaPeliSerie}.id = ${tablaInter}.idPeliSerie and ${tablaPersonaje}.id = ${tablaInter}.idPersonaje`
        const personaje = await dbHelperAll(id, undefined, query);
        const PeliSerie = await dbHelperPeliSerie(id, undefined, query2);
        personaje.recordset[0].PeliculasSeries=PeliSerie.recordset;
        return personaje.recordset[0];
    }

    createpersonaje = async(personaje) => {
        console.log('Create');
        const query = `INSERT INTO ${tablaPersonaje}(imagen, nombre, edad, peso, historia, comidaFavorita) VALUES (@imagen, @nombre, @edad, @peso, @historia, @comidaFavorita)`
        const response = await dbHelperAll(undefined, personaje, query);

        return response.recordset;
    }

    updatepersonajeById = async(id, PeliSerie) => {
        console.log('Update by ID');
        const query = `UPDATE ${tablaPersonaje} SET imagen = @imagen, nombre = @nombre, edad = @edad, peso = @peso, historia = @historia, comidaFavorita = @comidaFavorita WHERE id = @Id`
        const response = await dbHelperAll(id, personaje, query);

        return response.recordset;
    }

    deletepersonajeById = async(id) => {
        console.log('Delete by ID');
        const query = `DELETE FROM ${tablaPersonaje} WHERE id = @id`
        const response = await dbHelperAll(id, undefined, query);
        return response.recordset;
    }
}