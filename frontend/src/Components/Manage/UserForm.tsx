import { IUser } from "../interface";
import { Button, Form } from "react-bootstrap";
export interface IStudentFormProps {
    handleSubmit: Function;
    handleInput: Function;
    setEmailAsUsername: Function;
    emailAsUsername: boolean;
    user: IUser;
}

export default function UserForm({
    handleSubmit,
    handleInput,
    user,
    emailAsUsername,
    setEmailAsUsername,
}: IStudentFormProps) {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                />
                <Form.Check
                    checked={emailAsUsername}
                    onChange={() => setEmailAsUsername(!emailAsUsername)}
                    type="checkbox"
                    label={"user email as username"}
                />
            </Form.Group>

            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    disabled={emailAsUsername}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                />
            </Form.Group>

            <Form.Group controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInput}
                />
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInput}
                />
            </Form.Group>

            <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" value={user.role} onChange={handleInput}>
                    <option value="">Select role</option>
                    <option value="1">Instructor</option>
                    <option value="0">Student</option>
                </Form.Control>
            </Form.Group>

            <Button variant="secondary" type="submit" className="my-2" >
                Create user
            </Button>
        </Form>
    );
}
