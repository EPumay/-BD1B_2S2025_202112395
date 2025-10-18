import dotenv from 'dotenv';

dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
    ORACLE_PASSWORD: process.env.ORACLE_PASSWORD || 'password',
    ORACLE_USER: process.env.ORACLE_USER || 'user',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '1521',
};

Object.freeze(env);

export default env;