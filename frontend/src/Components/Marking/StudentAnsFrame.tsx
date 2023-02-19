import * as React from "react";
import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Card, Button, Row, Badge, Table, Alert, Container, Form, Col } from "react-bootstrap";
import axios from "axios";
import { Assignment } from "@/pages/assignments/[studentId]";
import { useRouter } from "next/router";
import { Questions, StudentAns } from "@/pages/assignments/[studentId]/[assignmentId]";
import AnsForm from "@/Components/Assignment/AnsForm";
import { IUser } from "@/interface";
import StudentProfile from "@/Components/Frame/StudentProfile";
import fetchHandler from "@/lib/fetchHandler";
import StudentAssignmentRow from "@/Components/Marking/StudentAssignmentRow";

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
