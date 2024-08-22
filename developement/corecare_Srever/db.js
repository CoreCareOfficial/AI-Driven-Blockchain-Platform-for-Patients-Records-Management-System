import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "root",
    password: "LLub0UVk0WPwueQG8V1SrUx6JBDZ6yVM",
    host: "dpg-cr3m8ubqf0us73eaqg40-a",
    port: 5432,
    database: "corecareofficial_ub2j"
});

export default pool;
