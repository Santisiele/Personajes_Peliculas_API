import sql from 'mssql'
import config from './db.js'

const dbHelperPeliSerie= async (id, params, query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id', sql.Int, id ?? 0)
        .input('imagen',sql.VarChar(255), params?.imagen ?? '')
        .input('titulo',sql.VarChar(50), params?.titulo ?? '')
        .input('fechaCreacion',sql.VarChar(50), params?.fechaCreacion ?? '')
        .input('clasificacion',sql.Int, params?.clasificacion ?? 0)
        .query(query);
        return response;
};
export default dbHelperPeliSerie;