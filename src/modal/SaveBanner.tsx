import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import './Modal.css';

interface Props {
    show: boolean,
    onHide: () => void,
}

const SaveBanner: React.FC<Props> = ({ onHide, show }) => {

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                backdrop='static'
                dialogClassName="deletemember-pop-up"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="deletemember-pop-up-title" id="contained-modal-title-vcenter">
                        저장완료
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="deletemember-pop-up-content">
                    <h4>저장 되었습니다.</h4>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SaveBanner
