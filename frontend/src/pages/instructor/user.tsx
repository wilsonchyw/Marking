import { ChangeEvent, useState } from "react";
import UserForm from "@/Components/Manage/UserForm";
import axios from "axios";
import { IUser } from "@/Components/interface";
import fetchHandler from "@/lib/fetchHandler";
import { notificationRef } from "../_app";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

export interface IManageUserProps {}

export default function ManageUser(props: IManageUserProps) {
    const router = useRouter();
    const [emailAsUsername, setEmailAsUsername] = useState<boolean>(true);
    const [user, setUser] = useState<IUser>({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: 0,
        email: "",
    });

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if(emailAsUsername && name=="email")setUser((prevState) => ({ ...prevState, username: value }));
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const callback = () => {
            notificationRef.current.showNotification("success", "User created");
            router.push("/instructor/assignment");
        };
        fetchHandler("/user", callback, { data: user, method: "post" });
    };
    return (
        <Container className="card-table">
            <h4 className="page-title">Create student account</h4>
            <UserForm
                user={user}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                emailAsUsername={emailAsUsername}
                setEmailAsUsername={setEmailAsUsername}
            />
        </Container>
    );
}
