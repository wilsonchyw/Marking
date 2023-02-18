import * as React from "react";
import { Navbar, Nav, Container, Row, Col, Card, Button } from "react-bootstrap";
import Divider from "../Divider";
import Image from "react-bootstrap/Image";
import Profile from "./Profile";
import { useRouter } from "next/router";

export interface ISidebarProps {
    isLoggedIn: boolean;
    user: {
        user: string;
        role: number;
        id: number;
    } | null;
}

export default function Sidebar({ user, isLoggedIn }: ISidebarProps) {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <Col xs={2} id="sidebar-wrapper">
            {user && isLoggedIn && (
                <>
                    <Profile user={user} />
                    <Card className="mt-1">
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <Nav.Link href="/home">Home</Nav.Link>

                            <Divider content={"Management"} />
                            <Nav.Link href="/instructor/assignment">Assignments</Nav.Link>
                            <Nav.Link href="/instructor/user">Students</Nav.Link>
                            <Divider content={"Marking"} />
                            <Nav.Link href="/instructor/assignment">Marking</Nav.Link>
                            <Divider content={"Student"} />
                            <Nav.Link href={`/assignments/${user.id}`}>Assignment</Nav.Link>
                            <Button size="sm" className="m-3" onClick={logout}>
                                Logout
                            </Button>
                        </Nav>
                    </Card>
                </>
            )}
        </Col>
    );
}
