
export const config = {
    PORT: Bun.env.PORT || 8080,
    DATABASE_FILE_NAME: Bun.env.DATABASE_FILE_NAME || 'database.json',
}

export default config;