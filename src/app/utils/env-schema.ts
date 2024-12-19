import { z } from 'zod';

/* 
    Need to handle zod validation of public variables on the client 
    differently to the server-side process.env available in the NodeJS 
    runtime.
*/

export const clientSchema = z.object({
    NEXT_PUBLIC_TYPING_SPEED_MS: z.coerce.number(),
});

export const clientEnv = {
    NEXT_PUBLIC_TYPING_SPEED_MS: process.env.NEXT_PUBLIC_TYPING_SPEED_MS,
};

export const serverSchema = z.object({
    PROJECT_NAME: z.string(),
    OPENAI_API_KEY: z.string(),
    LANGCHAIN_TRACING_V2: z.enum(['true', 'false']),
    LANGCHAIN_API_KEY: z.string().optional(),
    LANGCHAIN_CALLBACKS_BACKGROUND: z.enum(['true', 'false']),
    DEV_MODE: z.enum(['true', 'false']),
    DEV_BASE_URL: z.string().url(),
});
