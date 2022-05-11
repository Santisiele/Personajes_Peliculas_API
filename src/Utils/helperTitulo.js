import sql from 'mssql'
import config from './db.js'

const dbHelperTitulo= async (titulo, query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('nombre',sql.VarChar(50), titulo ?? '')
        .query(query);
        return response;
};
export default dbHelperTitulo;