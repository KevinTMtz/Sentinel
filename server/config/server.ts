import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const SERVER = {
  port: PORT,
};

export default SERVER;
