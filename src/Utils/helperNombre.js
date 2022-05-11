import sql from 'mssql'
import config from './db.js'

const dbHelperNombre= async (nombre,query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('nombre',sql.VarChar(50), nombre ?? '')
        .query(query);
        return response;
};
export default dbHelperNombre;