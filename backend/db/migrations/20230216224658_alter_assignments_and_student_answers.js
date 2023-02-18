/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .table("assignments", function (table) {
            table.dropColumn("published");
            table.dropColumn("publish_at");
        })
        .table("student_answers", function (table) {
            table.integer("mark").defaultTo(0);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .table("assignments", function (table) {
            table.string("published").notNullable();
            table.timestamp("publish_at").notNullable();
        })
        .table("student_answers", function (table) {
            table.dropColumn("mark");
        });
};
