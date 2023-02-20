module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "database",
            port: 5432,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/db/migrations`,
        },
        seeds: {
            directory: `${__dirname}/db/seeds`,
        },
    },
};
