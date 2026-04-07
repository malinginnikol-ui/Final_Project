require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin1234',
    database: process.env.DB_NAME || 'estorco_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const query = async (sql, params = []) => {
    try {
        const [rows, fields] = await pool.execute(sql, params);
        return [rows, fields];
    } catch (error) {
        console.error('Database query error:', error.message);
        throw error;
    }
};

const getConnection = async () => {
    const connection = await pool.getConnection();
    
    return {
        query: (sql, params) => connection.execute(sql, params),
        beginTransaction: () => connection.beginTransaction(),
        commit: () => connection.commit(),
        rollback: () => connection.rollback(),
        release: () => connection.release()
    };
};

module.exports = {
    query,
    getConnection
};
