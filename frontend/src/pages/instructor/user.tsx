import { ChangeEvent, useState } from "react";
import UserForm from "@/Components/Manage/UserForm";
import axios from "axios";
import { IUser } from "@/Components/interface";
import fetchHandler from "@/lib/fetchHandler";
import { notificationRef } from "../_app";

export interface IManageUserProps {}

export default function ManageUser(props: IManageUserProps) {
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
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const callback = () => notificationRef.current.showNotification("User created");
        fetchHandler("/user", callback, { data: user, method: "post" });
    };
    return (
        <>
            <UserForm user={user} handleInput={handleInput} handleSubmit={handleSubmit} />
        </>
    );
}
