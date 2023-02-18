import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Card, Button, Row, Badge, Table, Alert, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Divider from "@/Components/Divider";
import AnsForm from "@/Components/Assignment/AnsForm";
import FormAction from "@/Components/Assignment/FormAction";
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

export interface IAssignmentActionProps {
    questions: Questions[];
    studentAns: StudentAns;
    assignment_id: number;
}

export default function AssignmentAction(props: IAssignmentActionProps) {
    const router = useRouter();
    const { studentId, assignment_id } = router.query;
    const [loading, setLoading] = useState<boolean>(true);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [studentAns, setStudentAns] = useState<StudentAns>({});
    const [error, setError] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const handleAnsChange = (event, question_id) => {
        setMsg("");
        const { name, value, checked, type } = event.target;
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
        axios
            .post(`http://192.9.229.157:3000/assignment/questions/${studentId}`, _studentAns)
            .then((res) => {
                console.log(res);
                if (submit) {
                    router.push(`/assignments/${studentId}`);
                } else {
                    setMsg("Save draft success");
                }
            })
            .catch((err) => {
                setMsg("Failed to save answer");
                console.log(err);
            });
    };

    useEffect(() => {
        if (!studentId || !assignment_id) return;
        Promise.all([
            axios.get(`http://192.9.229.157:3000/assignment/${assignment_id}`),
            axios.get(`http://192.9.229.157:3000/assignment/${studentId}/${assignment_id}`),
        ])
            .then(([assignmentsQuestionResponse, sudentAnsResponse]) => {
                setQuestions(assignmentsQuestionResponse.data);
                setStudentAns(sudentAnsResponse.data);
            })
            .catch((err) => {
                setError("Failed to load assignments");
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, [studentId, assignment_id]);

    if (error) {
        return (
            <Container>
                <Alert variant={"danger"}>{error}</Alert>
            </Container>
        );
    }

    console.log({ studentAns });
    return (
        <Container>
            {loading ? (
                <Alert variant={"primary"}>Loading...</Alert>
            ) : (
                <>
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
                                    msg={msg}
                                />
                                <FormAction handleSave={handleSave} />
                                {msg && <Alert variant={"primary"}>{msg}</Alert>}
                            </Card.Body>
                        )}
                    </Card>
                </>
            )}
        </Container>
    );
}
