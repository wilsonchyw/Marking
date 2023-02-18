import * as React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";
import Divider from "../Divider";
import Image from "react-bootstrap/Image";

export interface IProfileProps {
    user: {
        user: string;
        role: number;
    }
}

export default function Profile ({user}: IProfileProps) {
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
                                    <div>{user.user}</div>
                                    <div>{user.role == 0 ? "student" : "Instructor"}</div>
                                    <div>
                                        <span style={{ color: "green" }}>●</span>Online
                                    </div>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
  );
}
