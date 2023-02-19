import StudentProfile from "@/Components/Frame/StudentProfile";
import { Questions, StudentAns } from "@/Components/interface";
import StudentAssignmentRow from "@/Components/Marking/StudentAssignmentRow";
import { IUser } from "@/interface";
import fetchHandler from "@/lib/fetchHandler";
import { Assignment } from "@/pages/assignments/[studentId]";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import StudentAnsFrame from "@/Components/Marking/StudentAnsFrame";

export interface IMarkingPageProps {}

export default function MarkingPage(props: IMarkingPageProps) {
    const router = useRouter();
    const [student, setStudent] = useState<IUser | null>(null);
    const [assignmentId, setAssignmentId] = useState<number | null>();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [studentAns, setStudentAns] = useState<StudentAns | null>(null);
    const [score, setScore] = useState<string>("");
    const [scored, setScored] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");

    console.log(assignments);
    const { studentId } = router.query;

    const handleGrade = () => {
        const callback = () => {
            setMsg("Grade assignment success");
            setScored(true);
        };
        fetchHandler(`/assignment/score/${assignmentId}/${studentId}`, callback, {
            data: score,
            method: "post",
            errorMessage: "Failed to grade assignments",
        });
    };
    const fetchStudentAns = (assignment_id: number) => {
        setScore("");
        setScored(false);
        setMsg("");
        setAssignmentId(assignment_id);

        fetchHandler(`/assignment/${assignment_id}`, setQuestions);
        fetchHandler(`/assignment/${studentId}/${assignment_id}`, setStudentAns);
        fetchHandler(`/assignment/score/${assignment_id}/${studentId}`, (data) => {
            if (data) {
                setScore(data.score);
                setScored(true);
                setMsg("You have scored this assignment");
            }
        });
    };

    useEffect(() => {
        if (studentId) {
            fetchHandler(`/user/student/${studentId}`, setStudent);
            fetchHandler(`/assignment/status/${studentId}`, setAssignments);
        }
    }, [studentId]);

    return (
        <Row className="m-2">
            <Col md={4}>
                {student && <StudentProfile user={student} />}
                <Card>
                    <Card.Body className="card-table-title">
                        <Row>
                            <Col md={4}>Assignment</Col>
                            <Col md={5}>status</Col>
                            <Col md={3}>Action</Col>
                        </Row>
                    </Card.Body>
                </Card>
                {assignments.map((assignment: Assignment) => (
                    <StudentAssignmentRow assignment={assignment} fetchStudentAns={fetchStudentAns} />
                ))}
            </Col>
            <Col md={8}>
                {studentAns && (
                    <StudentAnsFrame
                        studentAns={studentAns}
                        questions={questions}
                        score={score}
                        setScore={setScore}
                        scored={scored}
                        handleGrade={handleGrade}
                        msg={msg}
                    />
                )}
            </Col>
        </Row>
    );
}
