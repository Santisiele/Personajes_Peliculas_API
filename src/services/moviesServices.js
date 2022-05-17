import dbHelperAll from '../Utils/helperAll.js'
import dbHelperPeliSerie from '../Utils/helperPeliSerie.js'
import dbHelperTitulo from '../Utils/helperTitulo.js'
import 'dotenv/config'

const tablaPersonaje=process.env.DB_TABLA_personaje;
const tablaPeliSerie=process.env.DB_TABLA_peliserie;
const tablaInter=process.env.DB_TABLA_intermedia;

export class moviesServices {
    getMovies = async(titulo, orden) => {
        console.log('Get all');
        let response = 0;
        if(titulo){
            const query = c;
            response = await dbHelperTitulo(titulo, query);
        }else{
            if(orden){
                const query = `SELECT * FROM ${tablaPeliSerie} ORDER BY titulo ${orden}`;
                response = await dbHelperPeliSerie(undefined, undefined, query);
            }else{
                const query = `SELECT id, imagen, titulo, fechaCreacion FROM ${tablaPeliSerie}`;
                response = await dbHelperPeliSerie(undefined, undefined, query); 
            }
        }
        return response.recordset;
    }

    getMovieById = async(id) => {
        console.log('Get by ID');
        const query = `SELECT * FROM ${tablaPeliSerie} WHERE id=@id`;
        const query2 = `SELECT ${tablaPersonaje}.* FROM ${tablaPeliSerie}, ${tablaPersonaje} , ${tablaInter} WHERE ${tablaPeliSerie}.id = ${tablaInter}.idPeliSerie and ${tablaPersonaje}.id = ${tablaInter}.idPersonaje and ${tablaPeliSerie}.id = @id`
        const personaje = await dbHelperAll(id, undefined, query2);
        const PeliSerie = await dbHelperPeliSerie(id, undefined, query);
        PeliSerie.recordset[0].Personajes=personaje.recordset;
        return PeliSerie.recordset[0];
    }

    createMovie = async(PeliSerie) => {
        console.log('Create');
        const query = `INSERT INTO ${tablaPeliSerie}(imagen, titulo, fechaCreacion, clasificacion) VALUES (@imagen, @titulo, @fechaCreacion, @clasificacion)`
        const response = await dbHelperPeliSerie(undefined, PeliSerie, query);

        return response.recordset;
    }

    updateMovieById = async(id, PeliSerie) => {
        console.log('Update by ID');
        const query = `UPDATE ${tablaPeliSerie} SET imagen = @imagen, titulo = @titulo, fechaCreacion = @fechaCreacion, clasificacion = @clasificacion WHERE id = @Id`
        const response = await dbHelperPeliSerie(id, PeliSerie, query);

        return response.recordset;
    }

    deleteMovieById = async(id) => {
        console.log('Delete by ID');
        const query = `DELETE FROM ${tablaPeliSerie} WHERE id = @id`
        const response = await dbHelperPeliSerie(id, undefined, query);
        return response.recordset;
    }
}