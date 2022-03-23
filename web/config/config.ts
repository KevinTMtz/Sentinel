import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

const API_URL = process.env.API_URL || 'localhost:5000/';

const SERVER = {
  port: SERVER_PORT,
  host: SERVER_HOST,
  api: {
    url: API_URL,
  },
};

export default SERVER;
