import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Card, Button, Row, Badge, Table, Alert, Container, Form, Col } from "react-bootstrap";
import axios from "axios";
import { Assignment } from "@/pages/assignments/[studentId]";
import { useRouter } from "next/router";

export interface IMarkingPageProps {}

export default function MarkingPage(props: IMarkingPageProps) {
    const router = useRouter();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const { studentId } = router.query;

    const fetchStudentAns = ()=>{}

    useEffect(() => {
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
            <Col>
                {assignments.map((assignment: Assignment) => {
                    const completed = assignment.num_questions == assignment.num_submitted;
                    return (
                        <Card key={assignment.assignment_id}>
                            <Card.Body>
                                <Card.Title>Assignment {assignment.assignment_id}</Card.Title>
                                <Card.Text>{completed ? "Submitted" : "Not yet submit"}</Card.Text>
                                <Button
                                    size="sm"
                                    disabled={completed ? true : false}
                                    onClick={fetchStudentAns}
                                >
                                    View
                                </Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Col>
            <Col></Col>
        </Row>
    );
}
