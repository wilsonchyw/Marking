import * as React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";
import Divider from "../Divider";
import { IUser } from "@/interface";
import Image from "react-bootstrap/Image";

export interface IProfileProps {
    user: IUser
}

export default function Profile({ user }: IProfileProps) {
    return (
        <Card className="mt-1">
            <Card.Body>
                <Card.Text>
                    <Row>
                        <Col sm="12" md="5">
                            <Image
                                src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                                fluid
                            />
                        </Col>
                        <Col sm="12" md="7">
                            <div>{user.username}</div>
                            <div>ID: {user.id}</div>
                            <div>{user.role == 0 ? "student" : "Instructor"}</div>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
