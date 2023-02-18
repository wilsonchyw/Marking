import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Card, Button, Row, Badge, Table, Alert, Container, Form, Col } from "react-bootstrap";
import axios from "axios";
import { Assignment } from "@/pages/assignments/[studentId]";
import { useRouter } from "next/router";
import { Questions, StudentAns } from "@/pages/assignments/[studentId]/[assignmentId]";
import AnsForm from "@/Components/Assignment/AnsForm";
import { IUser } from "@/interface";
import Profile from "@/Components/Frame/Profile";

export interface IMarkingPageProps {}

export default function MarkingPage(props: IMarkingPageProps) {
    const router = useRouter();
    const [student, setStudent] = useState<IUser | null>(null);
    const [assignmentId, setAssignmentId] = useState<number | null>();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [studentAns, setStudentAns] = useState<StudentAns | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [score, setScore] = useState<string>("");
    const [scored, setScored] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");

    const { studentId } = router.query;

    const handleGrade = () => {
        axios
            .post(`http://192.9.229.157:3000/assignment/score/${assignmentId}/${studentId}`, { score })
            .then((res) => {
                setMsg("Grade assignment success");
            })
            .catch((err) => {
                setError("Failed to grade assignments");
            });
    };
    const fetchStudentAns = (assignment_id) => {
        setScore("");
        setScored(false);
        setMsg("");
        setAssignmentId(assignment_id);
        setLoading(true);
        console.log(`http://192.9.229.157:3000/assignment/score/${assignment_id}/${studentId}`)
        Promise.all([
            axios.get(`http://192.9.229.157:3000/assignment/${assignment_id}`),
            axios.get(`http://192.9.229.157:3000/assignment/${studentId}/${assignment_id}`),
            axios.get(`http://192.9.229.157:3000/assignment/score/${assignment_id}/${studentId}`),
        ])
            .then(([assignmentsQuestionResponse, sudentAnsResponse, scoreResponse]) => {
                setQuestions(assignmentsQuestionResponse.data);
                setStudentAns(sudentAnsResponse.data);
                console.log(scoreResponse.data);
                if (scoreResponse.data) {
                    setScore(scoreResponse.data.score);
                    setScored(true);
                    setMsg("You have scored this assignment");
                }
            })
            .catch((err) => {
                setError("Failed to load assignments");
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        axios
            .get(`http://192.9.229.157:3000/user/student/${studentId}`)
            .then((res) => setStudent(res.data))
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://192.9.229.157:3000/assignment/status/${studentId}`)
            .then((res) => {
                setAssignments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Row>
            <Col md={3}>
                {student && <Profile user={student} />}
                {assignments.map((assignment: Assignment) => {
                    const completed = assignment.num_questions == assignment.num_submitted;
                    return (
                        <Card key={assignment.assignment_id}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    Assignment {assignment.assignment_id}
                                    <Button
                                        size="sm"
                                        disabled={completed ? false : true}
                                        onClick={() => fetchStudentAns(assignment.assignment_id)}
                                    >
                                        View
                                    </Button>
                                </Card.Title>
                                <Card.Text>{completed ? "Submitted" : "Not yet submit"}</Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Col>
            <Col md={8}>
                {studentAns && (
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
                )}
            </Col>
        </Row>
    );
}
