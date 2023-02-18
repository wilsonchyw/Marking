/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .table("student_answers", function (table) {
            table.dropColumn("answer");
        })
        .table("student_answers", function (table) {
            table.specificType("answer", "text[]").notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .alterTable("student_answers", function (table) {
            table.dropColumn("answer");
        })
        .table("student_answers", function (table) {
            table.string("answer", 255).notNullable();
        });
};
