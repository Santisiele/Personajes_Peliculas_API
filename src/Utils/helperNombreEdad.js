import sql from 'mssql'
import config from './db.js'

const dbHelperNombreEdad= async (nombre, edad, query) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('nombre',sql.VarChar(50), nombre ?? '')
        .input('edad',sql.VarChar(50), edad ?? '')
        .query(query);
        return response;
};
export default dbHelperNombreEdad;