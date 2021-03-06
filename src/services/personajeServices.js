import dbHelperAll from '../Utils/helperAll.js'
import dbHelperPeliSerie from '../Utils/helperPeliSerie.js'
import 'dotenv/config'


const tablaPersonaje=process.env.DB_TABLA_personaje;
const tablaPeliSerie=process.env.DB_TABLA_peliserie;
const tablaInter=process.env.DB_TABLA_intermedia;

export class personajeService {
    getpersonaje = async(nombre, edad,peso,idMovie) => {
        console.log('Get all');
        let response = 0;
        let where = false;
        let query = `SELECT ${tablaPersonaje}.id, ${tablaPersonaje}.nombre,${tablaPersonaje}.imagen FROM ${tablaPersonaje}`
        let query1 = ``
        let query2=``
        if(idMovie){
            where = true;
            query2= `, ${tablaInter} WHERE ${tablaPersonaje}.id = ${tablaInter}.idPersonaje`
            query1+= ` AND ${tablaInter}.idPeliSerie = @idMovie`;                  
        }
        if(nombre){
            if(!where){
                where = true;
                query1+= ` nombre = @nombre`;
            }else{
                query1+= ` and nombre = @nombre`
            }
        }
        if(edad){
            if(!where){
                where = true;
                query1+= ` edad = @edad`;                    
            }else{
                query1+= ` and edad = @edad`;
            }
        }
        if(peso){
            if(!where){
                where = true;
                query1+= ` peso = @peso`;                    
            }else{
                query1+= ` and peso = @peso`;
        }
        }
        if(where && !idMovie){
            query += " WHERE" + query1
        }else if(where && idMovie){
            query += query2 + query1
        }

        console.log(query)

        response= await dbHelperAll(undefined, {nombre, edad, peso, idMovie}, query);
        return response.recordset;
    }

    getpersonajeById = async(id) => {
        console.log('Get by ID');
        const query = `SELECT * FROM ${tablaPersonaje} WHERE id=@id`;
        const query2 = `SELECT PeliSerie.* FROM ${tablaPeliSerie}, ${tablaPersonaje} , ${tablaInter} WHERE ${tablaPeliSerie}.id = ${tablaInter}.idPeliSerie and ${tablaPersonaje}.id = ${tablaInter}.idPersonaje and ${tablaPersonaje}.id = @id`
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

    updatepersonajeById = async(id, personaje) => {
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