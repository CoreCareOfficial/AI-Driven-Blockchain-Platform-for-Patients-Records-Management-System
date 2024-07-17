import { Button, Modal } from "react-bootstrap";
import '../css/customModal/customModal.css'

function ConfirmedDialog(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            scrollable={props.isSummary}
            dialogClassName="custom-modal"
            size={props.isSummary ? 'lg' : ''}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    !props.isSummary ?
                        props.message :
                        <div dangerouslySetInnerHTML={{ __html: props.message }} />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleOk}>
                    {props.isSummary ? 'Save Summary' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmedDialog;