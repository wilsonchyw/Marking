import AnsForm from "@/Components/Assignment/AnsForm";
import FormAction from "@/Components/Assignment/FormAction";
import { IQuestions, IStudentAns } from "@/Components/interface";
import fetchHandler from "@/lib/fetchHandler";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";

export interface IAssignmentActionProps {
    questions: IQuestions[];
    studentAns: IStudentAns;
    assignment_id: number;
}

export default function AssignmentAction(props: IAssignmentActionProps) {
    const router = useRouter();
    const { studentId, assignment_id } = router.query;
    const [loading, setLoading] = useState<boolean>(true);
    const [questions, setQuestions] = useState<IQuestions[]>([]);
    const [studentAns, setStudentAns] = useState<IStudentAns>({});
    const [error, setError] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const handleAnsChange = (event, question_id) => {
        setMsg("");
        let { name, value, checked, type } = event.target;
        value = String(value);
        setStudentAns((prevAnswers) => {
            const newAnswers = { ...prevAnswers };
            if (!newAnswers[question_id]) {
                newAnswers[question_id] = {
                    student_answer: [],
                    issubmit: false,
                    assignment_id: Number(assignment_id),
                    question_id: question_id,
                };
            }
            if (type == "radio") {
                newAnswers[question_id].student_answer = [value];
            } else if (type == "checkbox") {
                const newAns = new Set(prevAnswers[question_id]?.student_answer || []);
                if (checked) {
                    newAns.add(value);
                } else {
                    newAns.delete(value);
                }
                newAnswers[question_id].student_answer = [...newAns.values()];
            } else {
                const regex = /^[a-zA-Z]+\s\d+$/;
                if (!/^[a-zA-Z]+\s\d+$/.test(value))
                    setMsg("input should match [alphabetical letters][1 white space][numbers]");
                newAnswers[question_id].student_answer = [value];
            }
            return newAnswers;
        });
    };

    const handleSave = (submit: boolean) => {
        if (msg) return;
        const _studentAns = Object.values(studentAns).map((ans) => ({ ...ans, issubmit: submit }));
        confirm("Confirm submit assignment?\nYou wouldn't be able to edit the answer once submitted") && fetchHandler(`/assignment/questions`, null, { data: _studentAns, method: "post" })
            .then((res) => {
                //console.log(res);
                if (submit) {
                    router.push(`/assignments/${studentId}`);
                } else {
                    setMsg("Save draft success");
                }
            })
            .catch((err) => {
                setMsg("Failed to save answer");
                //console.log(err);
            });
    };

    useEffect(() => {
        if (!studentId || !assignment_id) return;
        fetchHandler(`/assignment/${assignment_id}`, setQuestions);
        fetchHandler(`/assignment/${studentId}/${assignment_id}`, setStudentAns);
    }, [studentId, assignment_id]);

    if (error) {
        return (
            <Container>
                <Alert variant={"danger"}>{error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Assignment {1}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Not submitted</Card.Subtitle>
                </Card.Body>
            </Card>
            <Card>
                {error ? (
                    <Alert variant={"danger"}>{error}</Alert>
                ) : (
                    <Card.Body>
                        <AnsForm
                            studentAns={studentAns}
                            questions={questions}
                            handleAnsChange={handleAnsChange}
                        />
                        <FormAction handleSave={handleSave} />
                        {msg && <Alert variant={"primary"}>{msg}</Alert>}
                    </Card.Body>
                )}
            </Card>
        </Container>
    );
}
