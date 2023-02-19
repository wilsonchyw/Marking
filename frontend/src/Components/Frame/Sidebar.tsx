import { IUser } from "@/interface";
import { useRouter } from "next/router";
import { Col, Nav } from "react-bootstrap";
import Profile from "./Profile";
import _axios, { setToken } from "@/lib/axios";
import {useContext} from "react"
import { notificationRef } from "@/pages/_app";
export interface ISidebarProps {
    isLoggedIn: boolean;
    user: IUser | null;
}

export default function Sidebar({ user, isLoggedIn }: ISidebarProps) {


    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const handleClick = () => {
        notificationRef.current.showNotification('Hello world!', 'success');
    };
    const handleLogin = async () => {

        _axios
            .post("http://192.9.229.157:3000/login", {
                username: "admin",
                password: "admin",
            })
            .then((response) => {
                setToken(response.data);
                console.log(_axios.defaults.headers);
                console.log(_axios.headers);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!isLoggedIn || !user) return <></>;
    return (
        <Col lg={2} md={3} id="sidebar-wrapper h-100" className="sidebar">
            <Profile user={user} />
            <ul>
                <li className="item-title">Management</li>
                <li>
                    <Nav.Link href="/instructor/assignment">Assignments</Nav.Link>
                </li>
                <li>
                    <Nav.Link href="/instructor/user">Students</Nav.Link>
                </li>
                <li>
                    <Nav.Link href="/instructor/assignment">Marking</Nav.Link>
                </li>
                <li>
                    <Nav.Link href={`/assignments/${user.id}`}>Assignment</Nav.Link>
                </li>
                <li className="item-title">Action</li>
                <li>
                    <div onClick={handleLogin}>Login</div>
                </li>
                <li>
                    <div onClick={logout}>Logout</div>
                </li>
                <li>
                    <div onClick={handleClick}>Notification</div>
                </li>
            </ul>
        </Col>
    );
}
