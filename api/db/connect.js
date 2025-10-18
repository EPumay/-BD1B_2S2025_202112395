import OracleDB from 'oracledb';
import config from '../config/env.js';

export async function connectToDb() {
    try {
        const connection = await OracleDB.getConnection({
            user: config.ORACLE_USER,
            password: config.ORACLE_PASSWORD,
            connectString: "localhost/xe"
        });
        return connection;
    }
    catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
}