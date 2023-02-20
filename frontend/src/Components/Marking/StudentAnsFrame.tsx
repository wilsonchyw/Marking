import AnsForm from "@/Components/Assignment/AnsForm";
import { Questions } from "@/pages/assignments/[studentId]/[assignmentId]";
import { Alert, Button, Card, Form } from "react-bootstrap";

export interface IStudentAnsProps {
    studentAns: any;
    questions: Questions[];
    setScore: Function;
    score: string;
    scored: boolean;
    handleGrade: Function;
    msg: string;
}

export default function StudentAnsFrame({
    studentAns,
    questions,
    setScore,
    score,
    scored,
    handleGrade,
    msg,
}: IStudentAnsProps) {
    return (
        <Card>
            <Card.Body>
                <AnsForm studentAns={studentAns} questions={questions} />
                <Form.Control
                    type="text"
                    onChange={(e) => setScore(e.target.value)}
                    value={score}
                    disabled={scored ? true : false}
                />
                <Button size="sm" className="my-2" onClick={handleGrade} disabled={scored ? true : false}>
                    Grade assignment
                </Button>
                {msg && <Alert variant={"primary"}>{msg}</Alert>}
            </Card.Body>
        </Card>
    );
}
