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
        .then(() => knex("assignment_score").del())
        .then(() => knex("assignments").del())
        .then(() => knex("users").del())
        .then(() => {
            // Inserts seed entries
            return knex("users")
                .insert([
                    {
                        id: 1,
                        username: "admin",
                        email: "admin@admin.com",
                        role: 1,
                        firstName: "Dmitri",
                        lastName: "Davie",
                        password: "$2b$10$/FRhWHnHh.r.u5ftZYCELu4H3pOCYHMqBDM5PkiqYF6FLws5z.3Tm",
                    },
                    {
                        id: 2,
                        username: "student1",
                        email: "student1@test.com",
                        role: 0,
                        firstName: "Jane",
                        lastName: "Doe",
                        password: "$2b$10$uKzbsM8wzA6BwFOWZEdUB.OG7x2TSJ8NiXwpKmNYmuJlxsYRbDFF6",
                    },
                    {
                        id: 3,
                        username: "student2",
                        email: "student2@test.com",
                        role: 0,
                        firstName: "Luciano",
                        lastName: "Aniketos",
                        password: "$2b$10$uKzbsM8wzA6BwFOWZEdUB.OG7x2TSJ8NiXwpKmNYmuJlxsYRbDFF6",
                    },
                    {
                        id: 4,
                        username: "student3",
                        email: "student3@test.com",
                        role: 0,
                        firstName: "Nosipho",
                        lastName: "Reima",
                        password: "$2b$10$uKzbsM8wzA6BwFOWZEdUB.OG7x2TSJ8NiXwpKmNYmuJlxsYRbDFF6",
                    },
                ])
                .onConflict("id")
                .merge();
        })
        .then(() => {
            return knex("assignments")
                .insert([{ id: 1 }, { id: 2 }, { id: 3 }])
                .onConflict("id")
                .merge();
        })
        .then(() => {
            return knex("questions")
                .insert([
                    {
                        id: 1,
                        type: "single",
                        content: "When was BCIT’s 50th-anniversary celebration?",
                        assignment_id: 1,
                    },
                    {
                        id: 2,
                        type: "multiple",
                        content: "Which of the following services does the LTC provide? Select all that apply",
                        assignment_id: 2,
                    },
                    {
                        id: 3,
                        type: "text",
                        content: "The current Prime Minister in Canada is(include the starting year for the PM)",
                        assignment_id: 3,
                    },
                ])
                .onConflict("id")
                .merge();
        })
        .then(() => {
            return knex("answers")
                .insert([
                    { id: 1, question_id: 1, answer: "2016" },
                    { id: 2, question_id: 1, answer: "1967" },
                    { id: 3, question_id: 1, answer: "2017" },
                    { id: 4, question_id: 1, answer: "1987" },
                    { id: 5, question_id: 2, answer: "Technical illustration" },
                    { id: 6, question_id: 2, answer: "Instructional design" },
                    { id: 7, question_id: 2, answer: "Financial advice" },
                    { id: 8, question_id: 2, answer: "Admission and Registration" },
                    { id: 9, question_id: 2, answer: "Audio-visual loans" },
                ])
                .onConflict("id")
                .merge();
        });
};
