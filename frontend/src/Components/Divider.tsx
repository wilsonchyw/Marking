import { FunctionComponent } from "react";
import { Stack } from "react-bootstrap";

export interface IDividerProps {
    className?: string;
    vertical?: boolean;
    content?: string;
}

const verticalStyle = {
    borderLeft: "solid 0.1px rgb(220 220 220)",
    marginTop: "2vw",
    marginBottom: "2vw",
    marginLeft: "-1px",
    width: "0px",
    padding: "0px",
};

export default function Divider({ content = "", vertical = false }: IDividerProps) {
    if (vertical) return <div style={verticalStyle} />;
    return (
        <div
            className="mx-3"
            style={{
                //paddingRight:"20px",
                borderBottom: "solid 0.1px rgb(220 220 220)",
                color:"gray"
            }}
        >
            {" "}
            <small>{content}</small>
        </div>
    );
}
