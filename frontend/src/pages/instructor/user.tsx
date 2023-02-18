import { ChangeEvent, useState } from "react";
import UserForm from "@/Components/Manage/UserForm";
import axios from "axios";

export interface IManageUserProps {}

export interface IUser {
    id?:number
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: number;
    email: string;
}

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

        axios
            .post("http://192.9.229.157:3000/user", { ...user })
            .then((response) => {
                console.log("User created:", response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <UserForm user={user} handleInput={handleInput} handleSubmit={handleSubmit} />
        </>
    );
}
