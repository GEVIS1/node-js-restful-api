/**
 * Function that checks if the necessary environment variables are present to run the app. Exits otherwise.
 */
export function checkEnv() {
  if (
    !process.env.PORT ||
    !process.env.SHADOW_DATABASE_URL ||
    !process.env.DATABASE_URL ||
    !process.env.JWT_SECRET ||
    !process.env.JWT_LIFETIME
  ) {
    /* eslint-disable */
    console.log('Missing .env or missing variable in .env');
    console.log('Missing variables:');
    !process.env.PORT && console.log('PORT=');
    !process.env.SHADOW_DATABASE_URL && console.log('SHADOW_DATABASE_URL=');
    !process.env.DATABASE_URL && console.log('DATABASE_URL=');
    !process.env.JWT_SECRET && console.log('JWT_SECRET=');
    !process.env.JWT_LIFETIME && console.log('JWT_LIFETIME=');
    process.exit(0);
    /* eslint-enable */
  }
}
