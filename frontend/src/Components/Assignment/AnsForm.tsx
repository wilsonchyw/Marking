import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Card, Button, Row, Badge, Table, Alert, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Divider from "@/Components/Divider";
import { Questions, StudentAns } from "@/pages/assignments/[studentId]/[assignmentId]";
export interface IAnsFormProps {
    handleSave: Function;
    handleAnsChange: Function;
    studentAns: StudentAns;
    questions: Questions[];
    msg:string
}

export default function AnsForm({ studentAns, questions, handleSave, handleAnsChange,msg }: IAnsFormProps) {
    return (
        <Card.Body>
            <Card.Text>
                <Form>
                    {questions.map((question, index) => (
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <div>
                                <Form.Label>Question {index + 1}</Form.Label>
                            </div>
                            <div>
                                <Form.Label>{question.content}</Form.Label>
                            </div>

                            {question.type != "text" ? (
                                question.answer.map((ans) => (
                                    <Form.Check
                                        checked={studentAns[question.question_id]?.student_answer?.includes(ans)}
                                        onChange={(e) => handleAnsChange(e, question.question_id)}
                                        name={question.question_id}
                                        type={question.type == "single" ? "radio" : "checkbox"}
                                        value={ans}
                                        label={ans}
                                        disabled={studentAns[question.question_id].issubmit}
                                    />
                                ))
                            ) : (
                                <Form.Control
                                    type="text"
                                    onChange={(e) => handleAnsChange(e, question.question_id)}
                                    value={studentAns[question.question_id]?.student_answer[0] || ""}
                                />
                            )}
                            <Divider />
                        </Form.Group>
                    ))}
                </Form>
            </Card.Text>
            <Card.Text>
                <Button variant="primary" type="submit" onClick={() => handleSave(true)}>
                    Submit
                </Button>
                <Button variant="secondary" type="submit" onClick={() => handleSave(false)}>
                    Save draft
                </Button>
            </Card.Text>
            {msg && <Alert variant={"primary"}>{msg}</Alert>}
        </Card.Body>
    );
}
