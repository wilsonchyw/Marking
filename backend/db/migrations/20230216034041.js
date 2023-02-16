/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("users", function (table) {
            table.increments("id").primary();
            table.string("username").notNullable();
            table.string("email").notNullable();
            table.integer("role").defaultTo(0);
            table.string("firstName").notNullable();
            table.string("lastName").notNullable();
            table.string("password").notNullable();
        })
        .createTable("assignments", function (table) {
            table.increments("id").primary();
            table.string("published").notNullable();
            table.timestamp("publish_at").notNullable();
        })
        .createTable("questions", function (table) {
            table.increments("id").primary();
            table.string("type").notNullable();
            table.string("content").notNullable();
            table.integer("assignment_id").unsigned().notNullable();
            table.foreign("assignment_id").references("id").inTable("assignments");
        })
        .createTable("answers", function (table) {
            table.increments("id").primary();
            table.integer("question_id").unsigned().notNullable();
            table.foreign("question_id").references("id").inTable("questions");
            table.string("answer").notNullable();
        })

        .createTable("student_answers", function (table) {
            table.increments("id").primary();
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("id").inTable("users");
            table.integer("question_id").unsigned().notNullable();
            table.foreign("question_id").references("id").inTable("questions");
            table.string("answer").notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
    knex.schema
        .dropTableIfExists("student_answers")
        .dropTableIfExists("answers")
        .dropTableIfExists("questions")
        .dropTableIfExists("assignments")
        .dropTableIfExists("users");
