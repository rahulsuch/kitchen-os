// backend/src/config/config.js

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get the directory name in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located one directory up (in the backend root)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Export the configuration
export const config = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 4000
};
