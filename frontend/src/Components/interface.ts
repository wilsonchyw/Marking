export interface Questions {
    type: "text" | "single" | "multiple";
    content: string;
    assignment_id: number;
    question_id: number;
    ans_question_id: number | null;
    answer: string[];
}

export interface StudentAns {
    [key: string]: {
        assignment_id: number;
        question_id: number;
        student_answer: string[];
        issubmit: boolean;
    };
}

export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: number;
    email: string;
}

export interface Assignment {
    assignment_id: number;
    num_questions: number;
    num_submitted: number;
    num_draft: number;
    score: string;
}

export interface IAnswer {
    id: number;
    question_id: number;
    answer: string;
}
