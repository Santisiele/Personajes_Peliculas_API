import sql from 'mssql'
import config from './db.js'

const dbHelperAll= async (id, params, query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id', sql.Int, id ?? 0)
        .input('imagen',sql.VarChar(255), params?.imagen ?? '')
        .input('nombre',sql.VarChar(50), params?.nombre ?? '')
        .input('edad',sql.Int, params?.edad ?? 0)
        .input('peso',sql.Int, params?.peso ?? 0)
        .input('historia',sql.VarChar(255), params?.historia ?? '')
        .input('comidaFavorita',sql.VarChar(50), params?.comidaFavorita ?? '')
        .input('idMovie',sql.Int, params?.idMovie ?? '')
        .query(query);
        return response;
};
export default dbHelperAll;