import { IUser } from "@/Components/interface";

export default function Home({ user }: { user: IUser }) {
    return (
        user && (
            <h2 style={{ position: "fixed", top: "50%", left: "50%" }}>
                Welcome {user.lastName} {user.firstName}
            </h2>
        )
    );
}
