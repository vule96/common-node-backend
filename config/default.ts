export default {
  port: process.env.PORT || 6000,
  logLevel: 'info',
  db: {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'roles',
  },
};
