import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "123789",
    host: "localhost",
    port: 5432,
    database: "corecareofficial"
});

export default pool;
