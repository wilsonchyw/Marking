import Divider from "@/Components/Divider";
import { Form } from "react-bootstrap";
import { IQuestions, IStudentAns } from "../interface";

export interface IAnsFormProps {
    handleAnsChange?: Function;
    studentAns: IStudentAns;
    questions: IQuestions[];
}

export default function AnsForm({ studentAns, questions, handleAnsChange = () => {} }: IAnsFormProps) {
    return (
        <Form className="mb-2">
            {questions.map((question, index) => (
                <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div>
                            <Form.Label>Question {index + 1}</Form.Label>
                        </div>
                        <div>
                            <Form.Label>{question.content}</Form.Label>
                        </div>

                        {question.type != "text" ? (
                            question.answer.map((ans) => (
                                <Form.Check
                                    key={ans}
                                    checked={studentAns[question.question_id]?.student_answer?.includes(ans)}
                                    onChange={(e) => handleAnsChange(e, question.question_id)}
                                    name={question.question_id}
                                    type={question.type == "single" ? "radio" : "checkbox"}
                                    value={ans}
                                    label={ans}
                                    disabled={studentAns[question.question_id]?.issubmit || false}
                                />
                            ))
                        ) : (
                            <Form.Control
                                type="text"
                                onChange={(e) => handleAnsChange(e, question.question_id)}
                                value={studentAns[question.question_id]?.student_answer[0] || ""}
                                disabled={studentAns[question.question_id]?.issubmit || false}
                            />
                        )}
                    </Form.Group>
                    <Divider />
                </>
            ))}
        </Form>
    );
}
