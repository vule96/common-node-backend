export default {
  port: process.env.PORT || 6000,
  env: process.env.NODE_ENV,
  logLevel: 'info',
  db: {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'P@ssword123',
    name: process.env.DB_NAME || 'common-db',
  },
  jwt: {
    accessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPublicKey: process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_DURATION || 15,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_DURATION || 60,
  },
};
