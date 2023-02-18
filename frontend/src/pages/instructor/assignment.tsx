import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { IUser } from "./user";
import Link from "next/link";

export interface IAssignmentProps {}

export default function Assignment(props: IAssignmentProps) {
    const [students, setStudents] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await axios.get("http://192.9.229.157:3000/student");
            setStudents(data);
        };
        fetchStudents();
    }, []);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Marking</Card.Title>
                    <Card.Subtitle>{students.length} students</Card.Subtitle>
                </Card.Body>
            </Card>
            {students.map((student: IUser) => (
                <Card key={student.id}>
                    <Card.Body>
                        <Row>
                            <Col md={8}>
                                <Card.Title>
                                    {student.firstName} {student.lastName}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{student.email}</Card.Subtitle>
                            </Col>
                            <Col md={4}>
                                <Link href={`/instructor/assignment/${student.id}`}>
                                    <Button variant="primary">View</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
