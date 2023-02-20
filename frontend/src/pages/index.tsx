import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { IUser } from "@/Components/interface";

export default function Home({ user }: { user: IUser }) {
    return <h2 style={{ position: "fixed", top: "50%", left: "50%" }}>Welcome {user.lastName} {user.firstName}</h2>;
}
