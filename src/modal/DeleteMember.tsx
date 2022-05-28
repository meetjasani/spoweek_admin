import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Modal.css';


interface Props {
    show: boolean,
    onHide: () => void,
    TerminatedMemberModal: () => void
}

const DeleteMember: React.FC<Props> = ({ onHide, show, TerminatedMemberModal }) => {

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
                        삭제하기
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="deletemember-pop-up-content pm-deletemember-popupctn">
                    <h4 className='Deletemember-tittle'>해당 내역을 삭제하시겠어요?</h4>
                </Modal.Body>
                <Modal.Footer className="deletemember-pop-up-footer">
                    <Button onClick={onHide} className="deletemember-pop-up-No-btn">아니오</Button>
                    <Button onClick={TerminatedMemberModal} className="deletemember-pop-up-yes-btn ">네</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteMember
