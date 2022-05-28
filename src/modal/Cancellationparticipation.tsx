import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiPut } from "../helper/API/ApiData";
import { useHistory } from "react-router";

interface Props {
    show: boolean;
    onHide: () => void;
    eventId?: any;
    // closeModal: () => void,
}
const Cancellationparticipation: React.FC<Props> = ({
    onHide,
    show,
    eventId,
}) => {
    const history = useHistory();

    const cancelReson = {
        reson: "",
    };

    const [cancelData, setCancelData] = useState(cancelReson);

    const handleInputChange = (e: any) => {
        setCancelData({ ...cancelData, [e.target.name]: e.target.value });
    };

    const DeleteApplicationHistory = async (
        deleteId: any,
        deleteInfo: string
    ) => {
        await ApiPut(`event/CancleApplicationByGeneral`, {
            id: deleteId,
            cancle_application_reason: deleteInfo,
        })
            .then((res: any) => {
                history.push(`/event/manage-event-participant?id=${eventId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };




    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                backdrop="static"
                dialogClassName="deletemember-pop-up"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="pm-deletemember-popup">
                    <Modal.Title
                        className="deletemember-pop-up-title"
                        id="contained-modal-title-vcenter"
                    >
                        이벤트 참가 취소
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="deletemember-pop-up-content pv-deletemember-pop-1 pm-deletemember-popupctn">
                    <h4>이벤트 참가 취소 이후에는 복구가 불가능하며 참가자가 직접 다시 참가 </h4>
                    <h4>신청을 해야합니다. 선택하신 회원을 이벤트 참가 취소하시겠어요?</h4>
                    <label className="pm-application-labelctn pm-application-labelctnbox">이벤트 참가 취소 사유</label>
                    <Form.Control
                        name="reson"
                        value={cancelData.reson}
                        className="delete-post-popup-input pv-delete-post-input pm-Deletepopup-input pm-cancelapplication-input"
                        type="text"
                        placeholder="입력해 주세요."
                        onChange={(e: any) => {
                            handleInputChange(e);
                        }}
                    />
                </Modal.Body>
                <Modal.Footer className="deletemember-pop-up-footer">
                    <Button
                        onClick={onHide}
                        className="deletemember-pop-up-No-btn  pv-deletemember-pop-up-No-btn"
                    >아니오</Button>
                    <Button
                        onClick={() => DeleteApplicationHistory(eventId, cancelData.reson)}
                        className="deletemember-pop-up-yes-btn "
                    >네</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Cancellationparticipation;
