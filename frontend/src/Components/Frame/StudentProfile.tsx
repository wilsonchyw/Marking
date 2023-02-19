import { IUser } from "@/interface";
import { Card, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export interface IProfileProps {
    user: IUser;
}

export default function StudentProfile({ user }: IProfileProps) {
    return (
        <Card className="profile">
            <Row>
                <Col lg={3}>
                    <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP7twP8-u8Mjwn3HoPmQKRWpNdktcf2YuFvfi9Jh305eJa0mUVypuMjQq9BAaTGSL9C1g&usqp=CAU"
                        fluid
                    />
                </Col>
                <Col lg={9}>
                    <div>ID: {user.id}</div>
                    <div>
                        {user.lastName} {user.firstName} ({user.username})
                    </div>
                    <div>{user.role == 0 ? "student" : "Instructor"}</div>
                </Col>
            </Row>
        </Card>
    );
}
