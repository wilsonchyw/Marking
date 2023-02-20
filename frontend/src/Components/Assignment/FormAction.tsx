import { Button, Card } from "react-bootstrap";
export interface IFormActionProps {
    handleSave: Function;
}

export default function FormAction({ handleSave }: IFormActionProps) {
    return (
        <Card.Text>
            <Button variant="primary" type="submit" onClick={() => handleSave(true)}>
                Submit
            </Button>
            <Button variant="secondary" type="submit" onClick={() => handleSave(false)}>
                Save draft
            </Button>
        </Card.Text>
    );
}
