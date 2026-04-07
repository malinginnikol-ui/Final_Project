const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    try {
        console.log(`Creating database: ${process.env.DB_NAME}...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.query(`USE ${process.env.DB_NAME}`);

        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        let sql = fs.readFileSync(schemaPath, 'utf8');

        // Split queries by semicolon, but handle the case where it might be inside a string (simple split for now)
        const queries = sql.split(';').filter(q => q.trim() !== '');

        for (let query of queries) {
            console.log(`Executing query: ${query.trim().substring(0, 50)}...`);
            await connection.query(query);
        }

        console.log('MySQL Database and schema setup complete.');
    } catch (err) {
        console.error('Error during setup:', err.message);
        console.log('Make sure your MySQL server is running and credentials in .env are correct.');
    } finally {
        await connection.end();
    }
}

setup();
