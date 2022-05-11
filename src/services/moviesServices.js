import dbHelperAll from '../Utils/helperAll.js'
import dbHelperPeliSerie from '../Utils/helperPeliSerie.js'
import 'dotenv/config'
import { response } from 'express'


export class moviesServices {
    getMovies = async() => {
        console.log('Get all');
        let response = 0;
        const query = `SELECT * FROM PeliSerie`;
        response = await dbHelperPeliSerie(undefined, undefined, query);
        return response.recordset;
    }

    getMovieById = async(id) => {
        console.log('Get by ID');
        const query = `SELECT * FROM PeliSerie WHERE id=@id`;
        const query2 = `SELECT Personaje.* FROM PeliSerie, Personaje , PersonajeXPeliSerie WHERE PeliSerie.id = PersonajeXPeliSerie.idPeliSerie and Personaje.id = PersonajeXPeliSerie.idPersonaje`
        const personaje = await dbHelperAll(id, undefined, query);
        const PeliSerie = await dbHelperPeliSerie(id, undefined, query2);
        PeliSerie.recordset[0].Personajes=personaje.recordset;
        return PeliSerie.recordset[0];
    }
    
}