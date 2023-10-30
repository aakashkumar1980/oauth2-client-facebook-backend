import * as sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';
import { readFileSync, unlink } from 'fs';
import { join } from 'path';

let db: Database;
export function initializeDatabase(): void {
    unlink('./database.db', (err) => {});

    // Set up the database connection
    db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Failed to connect to the database!', err);
            return;
        }

        // Enable Cascade Delete
        db.run('PRAGMA foreign_keys = ON;', err => {
            if (err) {
                console.error("Could not enable foreign keys:", err.message);
            }
        });

        // Read the Table Creation SQL file
        const sqlScripts = readFileSync(join(__dirname, 'db-scripts-tables.sql')).toString();
        // Execute the SQL scripts
        db.exec(sqlScripts, (err) => {
            if (err) {
                console.error('Failed to initialize the database with scripts!', err);
            } else {
                console.log('Database initialized successfully!');
            }
        });

        // Read the Table Value SQL file
        const sqlValueScripts = readFileSync(join(__dirname, 'db-scripts-table_sample_values-dev.sql')).toString();
        // Execute the SQL scripts
        db.exec(sqlValueScripts, (err) => {
            if (err) {
                console.error('Failed to initialize the database with scripts!', err);
            } else {
                console.log('Database Table Sample Values initialized successfully!');
            }
        });        
    });    
}

export function getDb(): Database {
    return db;
}
