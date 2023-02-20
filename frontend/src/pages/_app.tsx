import Sidebar from "@/Components/Frame/Sidebar";
import Notification from "@/Components/Notification";
import useLogin from "@/lib/useLogin";
import "@/styles/globals.css";
import "@/styles/page.css";
import "@/styles/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { STUDENT } from "@/Components/interface";
import useAuth from "@/lib/useAuth";
export const notificationRef = React.createRef();

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { isLoggedIn, user, checking } = useLogin();

    useAuth(user)
    useEffect(() => {
        if (!isLoggedIn && !checking) {
            router.push("/login");
        }
    }, [isLoggedIn, checking]);

    return (
        <div>
            <Notification ref={notificationRef} />
            <Row style={{ height: "100vh" }}>
                <Sidebar user={user} isLoggedIn={isLoggedIn} />

                <Col lg={10} md={9}>
                    <Component {...pageProps} />
                </Col>
            </Row>
        </div>
    );
}
