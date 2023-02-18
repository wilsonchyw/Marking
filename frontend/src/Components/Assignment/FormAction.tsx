import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Card, Button, Row, Badge, Table, Alert, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Divider from "@/Components/Divider";
import { Questions, StudentAns } from "@/pages/assignments/[studentId]/[assignmentId]";
export interface IFormActionProps {
    handleSave: Function;
}

export default function FormAction({ handleSave }: IFormActionProps) {
    return (
        <Card.Text>
            <Button variant="primary" type="submit" onClick={() => handleSave(true)}>
                Submit
            </Button>
            <Button variant="secondary" type="submit" onClick={() => handleSave(false)}>
                Save draft
            </Button>
        </Card.Text>
    );
}
