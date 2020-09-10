import { config } from 'dotenv';
const { parsed } = config();

export const { DB, PORT, BASE_URL } = parsed;