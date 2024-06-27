import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "ahmedqahtan",
    host: "localhost",
    port: 5432,
    database: "corecareofficial"
});

export default pool;
