import dotenv from 'dotenv';
dotenv.config();

// The System URL for your HAPI FHIR engine
export const HIS_SYSTEM_URL: string = process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir';
export const SESSION_SECERT = process.env.SESSION_SECERT || 'fallback-secert-for-dev-only';
console.log("🛠️  Config loaded. Engine target:", HIS_SYSTEM_URL);

