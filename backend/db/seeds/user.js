/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("student_answers")
        .del()
        .then(() => knex("answers").del())
        .then(() => knex("questions").del())

        .then(() => knex("assignments").del())
        .then(() => knex("users").del())
        .then(() => {
            // Inserts seed entries
            return knex("users").insert([
                {
                    username: "admin",
                    email: "admin@admin.com",
                    role: 1,
                    firstName: "Dmitri",
                    lastName: "Davie",
                    password: "$2b$10$/FRhWHnHh.r.u5ftZYCELu4H3pOCYHMqBDM5PkiqYF6FLws5z.3Tm",
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
            return knex("assignments").insert([{ id: 1 }, { id: 2 }, { id: 3 }]);
        })
        .then(() => {
            return knex("questions").insert([
                { type: "single", content: "When was BCIT’s 50th-anniversary celebration?", assignment_id: 1 },
                {
                    type: "multiple",
                    content: "Which of the following services does the LTC provide? Select all that apply",
                    assignment_id: 2,
                },
                {
                    type: "text",
                    content: "The current Prime Minister in Canada is(include the starting year for the PM)",
                    assignment_id: 3,
                },
            ]);
        })
        .then(() => {
            return knex("answers").insert([
                { question_id: 1, answer: "2016" },
                { question_id: 1, answer: "1967" },
                { question_id: 1, answer: "2017" },
                { question_id: 1, answer: "1987" },
                { question_id: 2, answer: "Technical illustration" },
                { question_id: 2, answer: "Instructional design" },
                { question_id: 2, answer: "Financial advice" },
                { question_id: 2, answer: "Admission and Registration" },
                { question_id: 2, answer: "Audio-visual loans" },
            ]);
        })
        /* .then(() => {
            return knex("student_answers").insert([
                { user_id: 1, question_id: 1, answer: "2016" },
                { user_id: 1, question_id: 2, answer: "Instructional design" },
            ]);
        }); */
};
