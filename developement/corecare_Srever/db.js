import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "osama",
    host: "localhost",
    port: 5432,
    database: "corecare"
});

export default pool;
