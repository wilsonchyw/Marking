export interface IAssignment {
    id: number;
}

export interface IAnswer {
    id: number;
    question_id: number;
    answer: string;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    role: number;
    firstName: string;
    lastName: string;
    password: string;
}
