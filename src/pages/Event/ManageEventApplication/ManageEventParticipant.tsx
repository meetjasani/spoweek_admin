import React, { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import { CSVLink } from "react-csv";
import NumberFormat from "react-number-format";
import { useHistory, useLocation, useParams } from "react-router";
import Buttons from "../../../component/Buttons/Buttons";
import { ApiGet, ApiPut } from "../../../helper/API/ApiData";
import { Recruitment_method, Sports } from "../../../helper/Constant";
import { arrayTableData, arrayTableSubData, exportExcel } from "../../../helper/util";
import "./ManageEventApplication.css";
import ManageEventApplicationList from "./ManageEventApplicationList";
import ManageEventParticipantList from "./ManageEventParticipantList";

export interface manageParticipant {
    id: string,
    no_id: string;
    name: string;
    applied_date: string;
    participant_applicant: string;
    division: string;
    name_of_group: string;
    date_Of_birth: string;
    gender: string;
    affiliation: string;
    mobile_no: string;
    participation_fee: string;
    status: string;
    attendance: string;
    COVID_19_symptoms: string;
    vaccination: string;
    temperature: string;
    cancle_application_reason: string;
}

let manageEventApplicationID: any = [];

const ManageEventParticipant = () => {

    const location = useLocation();
    // const { id }: any = useParams();
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')?.toString();
    const ename = queryParams.get('ename')?.toString();
    const history = useHistory();
    const [manageEventParticipantData, setManageEventParticipantData] = useState<any>([]);
    // const [exportManageApplicationData, setExportManageApplicationData] = useState<manageParticipant[]>([]);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [manageEventApplicationIdList, setManageEventApplicationIdList] = useState<any>([]);
    const [activeTab, setActiveTab] = useState("Participant");

    const getManageEventParticipant = (page = 1, sizePerPage = 50) => {

        ApiGet(
            `event/getEventManageOperationByAdmin?event_operation_status=${activeTab}&per_page=${sizePerPage}&page_number=${page}&event_id=${id}`
        ).then((res: any) => {
            setTotalSize(res.data && res.data.count);
            let tempData = [...res.data.eventParticipants]
            tempData = tempData.map((mainItem: any, index: number) => {
                mainItem = mainItem.map((subItem: any) => {
                    if (subItem.is_defination_by) {
                        const temp = {
                            ...subItem,
                            no_id: res.data.count - (page - 1) * sizePerPage - index
                        }
                        return temp
                    }
                    return subItem
                })
                return mainItem
            })
            setManageEventParticipantData(tempData)
        }).catch((error: any) => {
            console.log("error", error);
        })
    }
    useEffect(() => {
        getManageEventParticipant()
    }, [])

    useEffect(() => {
        getManageEventParticipant()
    }, [activeTab])

    const TabChange = (TabValue: any) => {
        setActiveTab(TabValue);
    };

    const deleteEventParticipant = () => {
        ApiPut('event/deleteParticipationByAdmin', {
            keyId: manageEventApplicationIdList.map((m: any) => m.id).join(","),
        })
            .then((res: any) => {

                // setIsDeleteAccount(false);
                // setActiveTab(activeTab)
                getManageEventParticipant()
            })
            .catch((error: any) => console.error(error));
    }

    // useEffect(() => {
    // setEventId(location?.state?.id)
    // console.log("location?.state", location);
    // console.log("ename ename", ename);

    // }, [location]);

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = manageEventApplicationID.findIndex(
                (item: any) => item.keyId === isSelect.keyId
            );
            if (index !== -1 && index !== undefined) {
                manageEventApplicationID.splice(index, 1);
            } else {
                manageEventApplicationID.push({ id: isSelect.keyId });
            }
            setManageEventApplicationIdList(manageEventApplicationID);
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => manageEventApplicationID.push({ id: x.keyId }));
                setManageEventApplicationIdList(manageEventApplicationID);
            } else {
                setManageEventApplicationIdList([]);
            }
        },
    };

    return (
        <>
            <div className="main-heading-wrap member-list">
                <div>
                    <p className="font-20-bold roboto color-01">이벤트 신청내역 관리</p>
                </div>

                <div className="back-btn">
                    <button
                        className="back"
                        onClick={() => {
                            history.push("/event/manage-event-application");
                        }}
                    >
                        이전으로
                    </button>
                    <button className="save" onClick={() => {
                        // history.push(`/event/manage-event-participant-register?id=${id}`);
                        history.push(`/event/manage-event-participant-register?id=${id}&ename=${ename}`);
                    }}>
                        참가자 추가
                    </button>
                </div>
            </div>

            <div className="border-black mt-20"></div>
            <div className="search-section">
                <p className="title">{ename}</p>
            </div>
            <div className="border"></div>
            <div className="text-center custom-datatable member-list-table">
                <div className="tab-main">
                    <span
                        className={
                            activeTab === "Participant" ? "pl-3 pr-3 active" : "pl-3 pr-3"
                        }
                        onClick={() => TabChange("Participant")}
                    >
                        참가자
                    </span>
                    <span className="tab-line pm-tab-line"></span>
                    <span
                        className={
                            activeTab === "awaiter" ? "pl-3 pr-3 active" : "pl-3 pr-3"
                        }
                        onClick={() => TabChange("awaiter")}
                    >
                        대기자
                    </span>
                    <span className="tab-line tab-line1"></span>
                    <span
                        className={
                            activeTab === "CanceledParticipation" ? "pl-3 pr-3 active" : "pl-3 pr-3"
                        }
                        onClick={() => TabChange("CanceledParticipation")}
                    >
                        참가신청 취소자
                    </span>
                </div>

                <div className="border"></div>

                <div className={activeTab === "CanceledParticipation" ? "p-0 cancle-participation-table" : "p-0"}>
                    {/* <div className="p-0"> */}
                    <div className="table-width">
                        <ManageEventParticipantList
                            data={arrayTableData(manageEventParticipantData)}
                            getManageEvent={getManageEventParticipant}
                            totalSize={totalSize}
                            selectRow={selectRow}
                            manageOperationTableData={manageEventParticipantData}
                            eventstatus={activeTab}
                            event_id={id}
                            event_name={ename}
                        />
                    </div>
                </div>
            </div >
            <div className="position-relative">
                <div className="button-table-exv">
                    <div className="memorial-hall-detail-title">
                        <button
                            className={
                                manageEventParticipantData.length === 0
                                    ? "delete-btn button-no-data"
                                    : "delete-btn"
                            }
                            onClick={() => {
                                deleteEventParticipant()
                            }}
                        >
                            삭제하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ManageEventParticipant;