import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import Alert from "react-bootstrap/Alert";

const Notification = forwardRef((props, ref) => {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const showNotification = (type, message) => {
        setMessage(message);
        setType(type == "error" ? "danger" : "primary");
        setTimeout(() => {
            setMessage("");
            setType("");
        }, 5000);
    };

    const showNotificationRef = useRef(showNotification);

    useImperativeHandle(ref, () => ({
        showNotification: showNotificationRef.current,
    }));

    return (
        message && (
            <Alert variant={type} className="alert-fixed w-25 card">
                {message}
            </Alert>
        )
    );
});

export default Notification;
