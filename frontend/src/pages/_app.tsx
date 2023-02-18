import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "@/Components/Frame/Sidebar";
import _Navbar from "@/Components/Frame/_Navbar";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import useLogin from "@/lib/useLogin";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { isLoggedIn, user,checking } = useLogin();
    console.log({isLoggedIn})
    
    useEffect(() => {
        if (!isLoggedIn && !checking) {            
            router.push("/login");
        }
    }, [isLoggedIn,checking]);
    return (
        <>
            <_Navbar />
            <Container fluid>
                <Row>
                    <Sidebar user={user} isLoggedIn={isLoggedIn}/>
                    <Col lg={10} md={9} id="page-content-wrapper">
                        <Component {...pageProps} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
