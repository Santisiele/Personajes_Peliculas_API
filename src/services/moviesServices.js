import dbHelperAll from '../Utils/helperAll.js'
import dbHelperPeliSerie from '../Utils/helperPeliSerie.js'
import dbHelperTitulo from '../Utils/helperTitulo.js'
import 'dotenv/config'
import { response } from 'express'


export class moviesServices {
    getMovies = async(titulo, orden) => {
        console.log('Get all');
        let response = 0;
        if(titulo){
            const query = `SELECT * FROM PeliSerie WHERE titulo = @titulo`;
            response = await dbHelperTitulo(titulo, query);
        }else{
            if(orden){
                const query = `SELECT * FROM PeliSerie ORDER BY titulo ${orden}`;
                response = await dbHelperPeliSerie(undefined, undefined, query);
            }else{
                const query = `SELECT * FROM PeliSerie`;
                response = await dbHelperPeliSerie(undefined, undefined, query); 
            }
        }
        return response.recordset;
    }

    getMovieById = async(id) => {
        console.log('Get by ID');
        const query = `SELECT * FROM PeliSerie WHERE id=@id`;
        const query2 = `SELECT Personaje.* FROM PeliSerie, Personaje , PersonajeXPeliSerie WHERE PeliSerie.id = PersonajeXPeliSerie.idPeliSerie and Personaje.id = PersonajeXPeliSerie.idPersonaje`
        const personaje = await dbHelperAll(id, undefined, query2);
        const PeliSerie = await dbHelperPeliSerie(id, undefined, query);
        PeliSerie.recordset[0].Personajes=personaje.recordset;
        return PeliSerie.recordset[0];
    }

    createMovie = async(PeliSerie) => {
        console.log('Create');
        const query = `INSERT INTO PeliSerie(imagen, titulo, fechaCreacion, clasificacion) VALUES (@imagen, @titulo, @fechaCreacion, @clasificacion)`
        const response = await dbHelperPeliSerie(undefined, PeliSerie, query);

        return response.recordset;
    }

    updateMovieById = async(id, PeliSerie) => {
        console.log('Update by ID');
        const query = `UPDATE PeliSerie SET imagen = @imagen, titulo = @titulo, fechaCreacion = @fechaCreacion, clasificacion = @clasificacion WHERE id = @Id`
        const response = await dbHelperPeliSerie(id, PeliSerie, query);

        return response.recordset;
    }

    deleteMovieById = async(id) => {
        console.log('Delete by ID');
        const query = `DELETE FROM PeliSerie WHERE id = @id`
        const response = await dbHelperPeliSerie(id, undefined, query);
        return response.recordset;
    }
}