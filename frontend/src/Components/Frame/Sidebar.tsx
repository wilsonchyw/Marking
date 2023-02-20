import { IUser } from "@/interface";
import fetchHandler from "@/lib/fetchHandler";
import { useRouter } from "next/router";
import { Col, Nav } from "react-bootstrap";
import { INSTRUCTOR } from "../interface";
import Profile from "./Profile";
export interface ISidebarProps {
    isLoggedIn: boolean;
    user: IUser | null;
}

export default function Sidebar({ user, isLoggedIn }: ISidebarProps) {
    const router = useRouter();
    const logout = () => {
        const callback = () => {
            localStorage.removeItem("token");
            router.push("/login");
        };
        fetchHandler("/logout", callback, { method: "post" });
    };

    if (!isLoggedIn || !user) return <></>;

    return (
        <Col lg={2} md={3} id="sidebar-wrapper h-100" className="sidebar">
            <Profile user={user} />

            <ul className="my-4">
                {user && user.role == INSTRUCTOR ? (
                    <>
                        <li className="item-title">Management</li>
                        <li>
                            <Nav.Link href="/instructor/assignment">Assignments</Nav.Link>
                        </li>
                        <li>
                            <Nav.Link href="/instructor/user">Students</Nav.Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="item-title">Access</li>
                        <li>
                            <Nav.Link href={`/assignments/${user.id}`}>Assignment</Nav.Link>
                        </li>
                    </>
                )}

                <li className="item-title">Action</li>
                <li>
                    <div onClick={logout}>Logout</div>
                </li>
            </ul>
        </Col>
    );
}
