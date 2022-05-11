import sql from 'mssql'
import config from './db.js'

const dbHelperPeliSerie= async (id, PeliSerie, query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id', sql.Int, id ?? 0)
        .input('imagen',sql.VarChar(255), PeliSerie?.imagen ?? '')
        .input('titulo',sql.VarChar(50), PeliSerie?.titulo ?? '')
        .input('fechaCreacion',sql.VarChar(50), PeliSerie?.fechaCreacion ?? '')
        .input('clasificacion',sql.Int, PeliSerie?.clasificacion ?? 0)
        .query(query);
        return response;
};
export default dbHelperPeliSerie;