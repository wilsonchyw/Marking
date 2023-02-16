module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "database",
            port: 5432,
            user: "admin",
            password: "admin",
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
