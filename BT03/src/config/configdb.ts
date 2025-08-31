import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database_development", "root", "baynhet", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};