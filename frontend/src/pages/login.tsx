import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);
        axios
            .post("http://192.9.229.157:3000/login", {
                username,
                password,
            })
            .then((response) => {
                localStorage.setItem("token", response.data);
                setError("");
                router.push("/");
            })
            .catch((err) => {
                if (err.response) return setError(err.response.data.message);
                console.log(err);
                setError("Invalid username or password");
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Container>
            <div className="w-50 mx-auto mt-5">
                <h2>Marking System</h2>

                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    {error && <p className="text-danger">{error}</p>}

                    <Button variant="primary" type="submit" disabled={isLoading} className="my-3">
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
