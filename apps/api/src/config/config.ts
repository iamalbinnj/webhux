import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/project_db"
  },
};