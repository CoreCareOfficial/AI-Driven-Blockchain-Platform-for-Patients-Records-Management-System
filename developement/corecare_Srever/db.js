import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "root",
    password: "CK5ubY7iZitsWUMQx3pkrEd4TXXTUsOI",
    host: "postgresql://root:CK5ubY7iZitsWUMQx3pkrEd4TXXTUsOI@dpg-cqefu4ggph6c73ao970g-a/corecareofficial",
    port: 5432,
    database: "corecareofficial"
});

export default pool;
