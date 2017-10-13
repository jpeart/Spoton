/**
 * This is the secret key file that will have a local key for us
 * but in production we can get the value from the ENV var "JWT_KEY"
 */
const key = process.env.JWT_KEY || "my_secret_key";

module.exports = key;
