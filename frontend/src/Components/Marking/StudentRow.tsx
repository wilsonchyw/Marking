import Link from "next/link";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IUser } from "./user";

export default function StudentRow({ student }: { student: IUser }): JSX.Element {
    return (
        <Card key={student.id} className="zoom">
            <Card.Body>
                <Row>
                    <Col md={3}>
                        <Card.Subtitle className="py-1">
                            {student.firstName} {student.lastName}
                        </Card.Subtitle>
                    </Col>
                    <Col md={3}>
                        <Card.Subtitle className="py-1">{student.username}</Card.Subtitle>
                    </Col>
                    <Col md={3}>
                        <Card.Subtitle className="py-1">{student.email}</Card.Subtitle>
                    </Col>
                    <Col md={3}>
                        <Link href={`/instructor/assignment/${student.id}`}>
                            <Button variant="primary" size="sm">
                                View
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
