import { IUser } from "@/interface";
import Image from "react-bootstrap/Image";

export interface IProfileProps {
    user: IUser;
}

export default function Profile({ user }: IProfileProps) {
    return (
        <div className="profile">
            <div className="w-50">
                <Image src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="user photo" fluid />
            </div>
            <div>
                {user.lastName} {user.firstName} ({user.username})
            </div>
            <div>ID: {user.id}</div>
            <div>{user.role == 0 ? "student" : "Instructor"}</div>
        </div>
    );
}
