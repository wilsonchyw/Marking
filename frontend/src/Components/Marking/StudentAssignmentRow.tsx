import { IAssignment } from "../interface";
import { Button, Card, Col, Row } from "react-bootstrap";

export interface IStudentAssignmentRowProps {
    assignment: IAssignment;
    fetchStudentAns: (assignment_id: any) => void;
}

export default function StudentAssignmentRow({ assignment, fetchStudentAns }: IStudentAssignmentRowProps) {
    const completed = assignment.num_questions == assignment.num_submitted;
    return (
        <Card key={assignment.assignment_id} className="zoom card-table">
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <Card.Subtitle className="py-1">{assignment.assignment_id}</Card.Subtitle>
                    </Col>
                    <Col md={5}>
                        <Card.Subtitle className="py-1">
                            {assignment.score ? "Scored" : completed ? "Submitted" : "not yet submitted"}
                        </Card.Subtitle>
                    </Col>
                    <Col md={3}>
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={completed ? false : true}
                            onClick={() => fetchStudentAns(assignment.assignment_id)}
                        >
                            View
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
