/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("assignments")
        .del()
        .then(() => knex("questions").del())
        .then(() => knex("users").del())
        .then(() => knex("answers").del())
        .then(() => knex("student_answers").del())
        .then(() => {
            // Inserts seed entries
            return knex("users").insert([
                {
                    username: "user1",
                    email: "user1@test.com",
                    role: 0,
                    firstName: "John",
                    lastName: "Doe",
                    password: "password1",
                },
                {
                    username: "user2",
                    email: "user2@test.com",
                    role: 0,
                    firstName: "Jane",
                    lastName: "Doe",
                    password: "password2",
                },
            ]);
        })
        .then(() => {
            return knex("assignments").insert([
                { published: "true", publish_at: knex.fn.now() },
                { published: "false", publish_at: knex.fn.now() },
            ]);
        })
        .then(() => {
            return knex("questions").insert([
                { type: "multiple choice", content: "What is the capital of France?", assignment_id: 1 },
                { type: "true/false", content: "Paris is the capital of Spain.", assignment_id: 1 },
                {
                    type: "essay",
                    content: "What are the advantages and disadvantages of globalization?",
                    assignment_id: 2,
                },
            ]);
        })
        .then(() => {
            return knex("answers").insert([
                { question_id: 1, answer: "Paris" },
                { question_id: 1, answer: "Lyon" },
                { question_id: 2, answer: "False" },
                { question_id: 3, answer: "Advantages: ..., Disadvantages: ..." },
            ]);
        })
        .then(() => {
            return knex("student_answers").insert([
                { user_id: 1, question_id: 1, answer: "Paris" },
                { user_id: 1, question_id: 2, answer: "False" },
                { user_id: 2, question_id: 1, answer: "Lyon" },
                { user_id: 2, question_id: 2, answer: "True" },
                { user_id: 2, question_id: 3, answer: "Advantages: ..., Disadvantages: ..." },
            ]);
        });
};
