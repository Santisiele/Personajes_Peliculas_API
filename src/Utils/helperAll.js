import sql from 'mssql'
import config from './db.js'

const dbHelperAll= async (id, personaje, query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id', sql.Int, id ?? 0)
        .input('imagen',sql.VarChar(255), personaje?.imagen ?? '')
        .input('nombre',sql.VarChar(50), personaje?.nombre ?? '')
        .input('edad',sql.Int, personaje?.edad ?? 0)
        .input('peso',sql.Int, personaje?.peso ?? 0)
        .input('historia',sql.VarChar(255), personaje?.historia ?? '')
        .input('comidaFavorita',sql.VarChar(50), personaje?.comidaFavorita ?? '')
        .query(query);
        return response;
};
export default dbHelperAll;