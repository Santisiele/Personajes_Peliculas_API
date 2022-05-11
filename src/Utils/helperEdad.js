import sql from 'mssql'
import config from './db.js'

const dbHelperEdad= async (edad, query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('edad',sql.VarChar(50), edad ?? '')
        .query(query);
        return response;
};
export default dbHelperEdad;