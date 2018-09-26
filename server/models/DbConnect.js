import { Pool } from 'pg';
import dotenv from 'dotenv';
import events from 'events';

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

CREATE TABLE IF NOT EXISTS meals
    (meal_id SERIAL PRIMARY KEY NOT NULL,
    meal_price VARCHAR,
    meal_image VARCHAR,
    meal_category VARCHAR,
    meal_added_date TIMESTAMP NOT NULL DEFAULT NOW()
  ); 
    
CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    user_id int REFERENCES users(user_id),
    meal_id int REFERENCES meals(meal_id),
    order_phone VARCHAR,
    order_address VARCHAR,
    order_data jsonb NOT NULL,
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
        console.log('Table Created successfully');
        tableCreatedEmitter.emit('databaseStarted');
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
     DROP TABLE IF EXISTS meals;
      DROP TABLE IF EXISTS users`;

    this.pool.query(deleteAllTables)
      .then(() => {
        console.log('Tables Deleted successfully');
        this.createAllTables();
      });
  }
}
export default DbConnect;
