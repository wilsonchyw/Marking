import { IUser } from "@/Components/interface";
import StudentRow from "@/Components/Marking/StudentRow";
import fetchHandler from "@/lib/fetchHandler";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
export interface IAssignmentProps {}

export default function Assignment(props: IAssignmentProps) {
    const [students, setStudents] = useState<IUser[]>([]);

    useEffect(() => {
        fetchHandler("/user/student", setStudents);
    }, []);


    return (
        <Container classname="card-table">
            <h4 className="page-title">Marking</h4>
            <Card>
                <Card.Body className="card-table-title">
                    <Row>
                        <Col md={3}>students({students.length})</Col>
                        <Col md={3}>Username</Col>
                        <Col md={3}>Content</Col>
                        <Col md={3}>Action</Col>
                    </Row>
                </Card.Body>
            </Card>
            {students.map((student: IUser) => (
                <StudentRow student={student} />
            ))}
        </Container>
    );
}
