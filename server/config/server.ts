import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';

const SERVER = {
  port: PORT,
  env: ENV,
};

export default SERVER;
