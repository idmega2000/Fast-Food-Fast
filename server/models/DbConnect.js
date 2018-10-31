import { Pool } from 'pg';
import dotenv from 'dotenv';
import events from 'events';
import bcrypt from 'bcrypt';

dotenv.config();
const createTable = `

CREATE TABLE IF NOT EXISTS users 
(user_id SERIAL PRIMARY KEY, 
    user_email VARCHAR NOT NULL UNIQUE, 
    user_password VARCHAR NOT NULL,
    user_role VARCHAR NOT NULL DEFAULT 'user',
    user_name VARCHAR, 
    user_address VARCHAR, 
    user_phone VARCHAR, 
    user_image VARCHAR);
    
CREATE TABLE IF NOT EXISTS menu
    (menu_id SERIAL PRIMARY KEY,
    menu_name VARCHAR NOT NULL,
    menu_price INTEGER NOT NULL,
    menu_image VARCHAR,
    menu_category VARCHAR,
    menu_added_date TIMESTAMP NOT NULL DEFAULT NOW(),
    menu_edited_date TIMESTAMP,
    menu_deleted BOOLEAN DEFAULT false
  ); 
    
CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(user_id) NOT NULL,
    recipient_name VARCHAR,
    order_phone VARCHAR,
    order_address VARCHAR,
    order_menu jsonb NOT NULL,
    order_total_price INT,
    order_total_quantity INT,
    order_status VARCHAR DEFAULT 'new',
    order_added_date TIMESTAMP NOT NULL DEFAULT NOW()    
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
        const adminName = process.env.ADMIN_NAME;
        const adminEmail = process.env.ADMIN_USEREMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const hashPassword = bcrypt.hashSync(password, 10);
        const userRole = 'admin';
        const sql = `INSERT INTO 
        users(user_name, user_email, user_password, user_role) 
        VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`;
        const params = [adminName, adminEmail, hashPassword, userRole];
        tableCreatedEmitter.emit('databaseStarted');
        this.pool.query(sql, params).then(() => {

        });
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
        this.createAllTables();
      });
  }
}
export default DbConnect;
