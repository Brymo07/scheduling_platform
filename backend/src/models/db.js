const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "scheduling_app",
};

let connection;

const initDb = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);

    // Create Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role ENUM('freelancer', 'client') NOT NULL
      );
    `);

    // Create Meetings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Meetings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        time TIME NOT NULL,
        duration INT NOT NULL,
        title VARCHAR(255),
        description TEXT,
        participants JSON NOT NULL
      );
    `);

    // Create Notifications table (optional)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        meeting_id INT,
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (meeting_id) REFERENCES Meetings(id)
      );
    `);

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
};

const getDbConnection = () => connection;

module.exports = { initDb, getDbConnection };
