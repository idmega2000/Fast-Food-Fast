import { Pool } from 'pg';
import dotenv from 'dotenv';
import events from 'events';
import bcrypt from 'bcrypt';

dotenv.config();

const createTable = `

CREATE TABLE IF NOT EXISTS users 
(user_id SERIAL PRIMARY KEY NOT NULL, 
    user_email VARCHAR NOT NULL UNIQUE, 
    user_password VARCHAR NOT NULL,
    user_role VARCHAR NOT NULL DEFAULT 'user',
    user_name VARCHAR UNIQUE, 
    user_address VARCHAR, 
    user_phone VARCHAR UNIQUE, 
    user_image VARCHAR);
    
CREATE TABLE IF NOT EXISTS menu
    (menu_id SERIAL PRIMARY KEY NOT NULL,
    menu_name VARCHAR,
    menu_price INTEGER,
    menu_image VARCHAR,
    menu_category VARCHAR,
    menu_added_date TIMESTAMP NOT NULL DEFAULT NOW(),
    menu_edited_date TIMESTAMP,
    menu_deleted_date TIMESTAMP

  ); 
    
CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    order_phone VARCHAR,
    order_address VARCHAR,
    order_menu jsonb NOT NULL,
    order_added_date TIMESTAMP NOT NULL DEFAULT NOW(),
    order_status VARCHAR DEFAULT 'new',
    order_accepted_time TIMESTAMP DEFAULT NULL,
    order_decline_time TIMESTAMP DEFAULT NULL,
    order_completed_time TIMESTAMP DEFAULT NULL
);`;
export const tableCreatedEmitter = new events.EventEmitter();
let connectionString = '';

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB_URL;
} else {
  connectionString = process.env.DATABASE_URL || process.env.LOCAL_DB_URL;
}
/**
 * Represents the connection of the app to postgreSql database.
 */
class DbConnect {
  /**
     * Create database connection.
     * @param {Promise} pool - takes in the connection string
     * which is based on the environment
     */
  constructor() {
    this.pool = new Pool({ connectionString });
  }

  /**
     * This function creates all needed tables
     * @returns {Promise} Returns promise that creates all table if resolved
     * or error if rejected
     */
  createAllTables() {
    this.pool.query(createTable)
      .then(() => {
        tableCreatedEmitter.emit('databaseStarted');
        const userEmail = 'admin2000@gmail.com';
        const hashPassword = bcrypt.hashSync('adminpassword', 10);
        const userRole = 'admin';
        const sql = `INSERT INTO 
        users(user_email, user_password, user_role) 
        VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`;
        const params = [userEmail, hashPassword, userRole];
        this.pool.query(sql, params);
        console.log('Table Created and admin present');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
     * This function connects the app to database base on different environment
     * @returns {Promise} Returns promise that connect the app to db if resolved
     * or error if rejected
     */
  connectApp() {
    this.pool.connect()
      .then(() => {
        if (process.env.NODE_ENV === 'test') {
          this.deleteTables();
        } else {
          this.createAllTables();
        }
      })
      .catch((error) => {
        console.log(`this is the error ${error}`);
      });
  }

  /**
     * This function deletes the database if the environment is test environment
     * @returns {object} Returns promise that delete the db if resolved
     * or error if rejected
     */
  deleteTables() {
    const deleteAllTables = `DROP TABLE IF EXISTS orders;
     DROP TABLE IF EXISTS menu;
      DROP TABLE IF EXISTS users`;

    this.pool.query(deleteAllTables)
      .then(() => {
        console.log('Tables Deleted successfully');
        this.createAllTables();
      });
  }
}
export default DbConnect;
