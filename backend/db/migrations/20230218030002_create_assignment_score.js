/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("assignment_score", function (table) {
        table.integer("assignment_id").unsigned().notNullable();
        table.foreign("assignment_id").references("id").inTable("assignments");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("id").inTable("users");
        table.string("score").notNullable();
        table.primary(['assignment_id', 'user_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("assignment_score");
};
