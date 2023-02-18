import * as React from "react";
import { IAssignment } from "@/interface";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Card, Button, Row, Badge, Table, Alert } from "react-bootstrap";

export interface Assignment {
    assignment_id: number;
    num_questions: number;
    num_submitted: number;
    num_draft: number;
    score:string
}

export interface IAssignmentProps {
    assignments: Assignment[];
    error?: string;
}

export default function Assignment({ assignments,  error }: IAssignmentProps) {
    const router = useRouter();
    const { studentId } = router.query;

    /* const _assignments = assignments.map((assignment) => {
        const { id } = assignment;
        const completed = completeStatus[id].num_questions == completeStatus[id].num_submitted;
        return (
            <tr key={assignment.id}>
                <td>{assignment.id}</td>
                <td>{completed ? "Submitted" : "Draft"} </td>
                <td>
                    {completed?completeStatus[id].num_questions:completeStatus[id].num_draft}/{completeStatus[id].num_questions}
                </td>
                <td>{completed ? "-" : "-"}</td>
                <td>
                    <Button size="sm" disabled={completed ? true : false} onClick={()=>router.push(`/assignments/${studentId}/${id}`)}>
                       Access
                    </Button>
                </td>
            </tr>
        );
    }); */
    return (
        <div>
            <h1>Assignments for Course </h1>
            {error && <Alert variant={"danger"}>{error}</Alert>}
            <Table className="w-75" striped hover>
                <thead>
                    <tr>
                        <th>Assignment ID</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Mark</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => {
                        const completed = assignment.num_questions == assignment.num_submitted
                        return (
                            <tr key={assignment.assignment_id}>
                                <td>{assignment.assignment_id}</td>
                                <td>{assignment.score? "Scored":completed ? "Submitted" : "Draft"} </td>
                                <td>
                                    {completed ? assignment.num_questions : assignment.num_draft}/
                                    {assignment.num_questions}
                                </td>
                                <td>{assignment.score?assignment.score:"-"}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        disabled={completed ? true : false}
                                        onClick={() =>
                                            router.push(`/assignments/${studentId}/${assignment.assignment_id}`)
                                        }
                                    >
                                        Access
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<IAssignmentProps> = async (context) => {
    /* const result = (await axios.get(`http://192.9.229.157:3000/assignment`)).data;
    const complete;
    const assignments = result.data;

    return {
        props: { assignments },
    }; */
    const { studentId } = context.params;
    return axios
        .get(`http://192.9.229.157:3000/assignment/status/${studentId}`)
        .then((res) => {
            console.log(res.data);
            return {
                props: {
                    assignments: res.data,
                },
            };
        })
        .catch((err) => {
            return {
                props: {
                    assignments: [],
                    error: "Failed to load assignments",
                },
            };
        });

    /* return Promise.all([
        axios.get(`http://192.9.229.157:3000/assignment`),
        axios.get(`http://192.9.229.157:3000/assignment/complete/${studentId}`),
    ])
        .then(([assignmentsResponse, completeStatusResponse]) => {
            return {
                props: {
                    assignments: assignmentsResponse.data,
                    completeStatus: completeStatusResponse.data,
                },
            };
        })
        .catch((err) => {
            console.log(err);
            return {
                props: {
                    assignments: [],
                    completeStatus: {},
                    error: "Failed to load assignments",
                },
            };
        }); */
};
