import _ from "lodash";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import Buttons from "../../../component/Buttons/Buttons";
import { ApiGet, ApiPost, ApiPut } from "../../../helper/API/ApiData";
import { Gender, Participate_Status, Attendance, Vaccination, Covid_Symptoms } from "../../../helper/Constant";
import { isEmpty } from "../../../helper/util";
import Cancellationparticipation from "../../../modal/Cancellationparticipation";
import AllDivisionEditInfo from "./AllDivisionEditInfo";
import "./ManageEventApplication.css";

interface EventApp {
    id: string,
    applicant_name: string,
    applied_date: string,
    classfication: string,
    division: string,
    group_name: string,
    dob: string,
    gender: string,
    email: string,
    phone_number: string,
    affiliation: string,
    participation_status: string,
    participation_fee: string,
    image: string,
    attendance: string,
    vaccination: string,
    COVID: string,
    address: string,
    temperature: string,
}

const ParticipantRegisterView = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id")?.toString();
    const ename = queryParams.get('ename')?.toString();
    const event_id = queryParams.get("event_id")?.toString();
    const history = useHistory();
    const [applicationEmptyFiled, setApplicationEmptyFiled] = useState<any>([])
    const [allData, setAllData] = useState<any>([])
    const [allFiledData, setFiledData] = useState<any>([])
    const [minNumberGroup, setMinNumberGroup] = useState<any>([])
    const [isApplicationCancle, setIsApplicationCancle] = useState(false)
    const [emptyFiled, setEmptyFiled] = useState({})
    const [viewTourSection, setViewTourSection] = useState<any>();

    useEffect(() => {
        ApiPut(`event/GetParticipateViewByAdmin`, {
            keyId: id
        }).then((res: any) => {
            let tempData: any = [...res?.data?.eventParticipants]
            tempData = tempData.map((mainItem: any) => {
                let count = mainItem.information[0].participantInfo.length
                return {
                    ...mainItem,
                    totalCount: count
                }
            })

            tempData = tempData.map((mainItem: any) => {
                mainItem.information = mainItem.information.map((info: any) => {
                    info.participantInfo = info.participantInfo.map((participant: any) => {
                        let data = {
                            COVID_19_symptoms: participant?.COVID_19_symptoms,
                            is_Attendance: participant?.is_Attendance,
                            participant_approve_status: participant?.participant_approve_status,
                            temperature: participant?.temperature,
                            vaccination: participant?.vaccination
                        }
                        return {
                            ...participant,
                            information: { ...participant.information, ...data }
                        }
                    })
                    return info
                })
                return mainItem
            })

            tempData = tempData.map((mainItem: any) => {
                mainItem.information = mainItem.information.map((info: any) => {
                    let data = {
                        COVID_19_symptoms: info?.applicationInfo?.COVID_19_symptoms,
                        is_Attendance: info?.applicationInfo?.is_Attendance,
                        participant_approve_status: info?.applicationInfo?.participant_approve_status,
                        temperature: info?.applicationInfo?.temperature,
                        vaccination: info?.applicationInfo?.vaccination
                    }
                    return {
                        ...info,
                        applicationInfo: { ...info.applicationInfo, information: { ...info.applicationInfo.information, ...data } },
                    }
                })
                return mainItem
            })

            setAllData(tempData)

            const covidData = [
                {
                    id: "participant_approve_status",
                    control_lable: "participant_approve_status",
                    control_placeholder: "Choose participate status",
                    control_placeholder_ko: "참가상태 선택",
                    control_lable_ko: "참가상태",
                    control_order: "9",
                    control_lable_enum: "participant_approve_status",
                    control_type: "select",
                    field_status: "Static"
                },
                {
                    id: "is_Attendance",
                    control_lable: "is_Attendance",
                    control_placeholder: "출석확인 선택",
                    control_placeholder_ko: "Choose attended or absent",
                    control_lable_ko: "출석확인",
                    control_order: "9",
                    control_lable_enum: "is_Attendance",
                    control_type: "select",
                    field_status: "Static"
                },
                {
                    id: "vaccination",
                    control_lable: "vaccination",
                    control_placeholder: "Choose vaccinated or unvaccinated",
                    control_placeholder_ko: "접종 유무 선택",
                    control_lable_ko: "접종",
                    control_order: "9",
                    control_lable_enum: "vaccination",
                    control_type: "select",
                    field_status: "Static"
                }, {
                    id: "COVID_19_symptoms",
                    control_lable: "COVID_19_symptoms",
                    control_placeholder: "Choose Yes or No",
                    control_placeholder_ko: "증상유무 선택",
                    control_lable_ko: "코로나 증상유무",
                    control_order: "9",
                    control_lable_enum: "COVID_19_symptoms",
                    control_type: "select",
                    field_status: "Static"
                }, {
                    id: "temperature",
                    control_lable: "temperature",
                    control_placeholder: "Enter body temperture",
                    control_placeholder_ko: "체온 입력",
                    control_lable_ko: "체온",
                    control_order: "9",
                    control_lable_enum: "temperature",
                    control_type: "select",
                    field_status: "Static"
                }
            ]

            let tempApplication: any = [{
                "id": "6c2892cd-0e57-4ceb-8bea-ffebfa1ffe4a",
                "control_lable_enum": "Name",
                "control_lable": "Name",
                "control_lable_ko": "이름",
                "control_placeholder": "Name",
                "control_placeholder_ko": "이름",
                "control_type": "text",
                "control_order": "1",
                "control_status": true,
                "field_status": "Static",
                "participant_approve": "Manual",
                "awaiter_receipt": "No"
            },
            {
                "id": "8accce50-1bd2-475d-8152-4c8bfd338865",
                "control_lable_enum": "Gender",
                "control_lable": "Gender",
                "control_lable_ko": "성별",
                "control_placeholder": "Gender",
                "control_placeholder_ko": "성별",
                "control_type": "radio",
                "control_order": "5",
                "control_status": true,
                "field_status": "Static",
                "participant_approve": "Manual",
                "awaiter_receipt": "No"
            },
            {
                "id": "3a393d6f-5b77-4dd6-88d4-0181f6a581d1",
                "control_lable_enum": "MobileNo",
                "control_lable": "Mobile No.",
                "control_lable_ko": "휴대폰 번호",
                "control_placeholder": "Mobile No.",
                "control_placeholder_ko": "휴대폰 번호",
                "control_type": "number",
                "control_order": "3",
                "control_status": true,
                "field_status": "Static",
                "participant_approve": "Manual",
                "awaiter_receipt": "No"
            },
            {
                "id": "b1d3cf5a-c4b5-40aa-955c-2832309e5937",
                "control_lable_enum": "DateOfBirth",
                "control_lable": "Date of birth",
                "control_lable_ko": "생년월일",
                "control_placeholder": "Date of birth",
                "control_placeholder_ko": "생년월일",
                "control_type": "date",
                "control_order": "4",
                "control_status": true,
                "field_status": "Static",
                "participant_approve": "Auto",
                "awaiter_receipt": "Yes"
            },
            {
                "id": "b1d3cf5a-c4b5-40aa-955c-2832309e59355",
                "control_lable_enum": "group_name",
                "control_lable": "Group name",
                "control_lable_ko": "단체명",
                "control_placeholder": "Group name",
                "control_placeholder_ko": "단체명",
                "control_type": "text",
                "control_order": "6",
                "control_status": true,
                "field_status": "Static",
                "participant_approve": "Auto",
                "awaiter_receipt": "Yes"
            },
            {
                "id": "0ffa854a-3728-4899-9294-2c723b0564aa",
                "control_lable_enum": "EmailAddress",
                "control_lable": "Email address",
                "control_lable_ko": "이메일 주소",
                "control_placeholder": "Email address",
                "control_placeholder_ko": "이메일 주소",
                "control_type": "email",
                "control_order": "2",
                "control_status": true,
                "field_status": "Static",
                "participant_approve": "Manual",
                "awaiter_receipt": "No"
            },
            ]

            let tempApplicationFiled = _.sortBy(tempApplication, [function (o) { return o.control_order; }])
            tempApplicationFiled = [...tempApplicationFiled, ...covidData]
            setApplicationEmptyFiled(tempApplicationFiled)

            let tempFiledData: any = _.map(res?.data?.participant_display_control_information, function (x) { return { id: x.id, control_lable: x.control_lable, control_lable_ko: x.control_lable_ko, control_placeholder: x.control_placeholder, control_placeholder_ko: x.control_placeholder_ko, control_type: x.control_type, field_status: x.field_status, control_lable_enum: x.control_lable_enum, control_order: x.control_order } })
            let dataFind = tempFiledData.find((data: any) => data.control_lable_enum == "Address")
            if (dataFind != undefined || dataFind != null) {
                const data = {
                    id: "LandmarkId",
                    control_lable: "Landmark",
                    control_placeholder: "경계표",
                    control_placeholder_ko: "경계표",
                    control_lable_ko: "경계표",
                    control_lable_enum: "Landmark",
                    control_type: "textarea",
                    field_status: "Static"
                }
                tempFiledData = [...tempFiledData, data]
            }
            tempFiledData = [...tempFiledData, ...covidData]
            let tempFiled = _.sortBy(tempFiledData, [function (o) { return o.control_order; }])
            setFiledData(tempFiled)

            let EmptyData: any = _.map(tempFiled, function (x) { return { [x.control_lable_enum]: "" } })
            let FinalEmptyData: any = _.map(tempFiled, function (x) { return { ...x, is_defination_by: false } })
            setEmptyFiled(Object.assign({}, ...FinalEmptyData))

            setViewTourSection(() => {
                let list: any = [];
                for (let i = 0; i < res?.data?.eventParticipants.length; i++) {
                    list[i] = false;
                }
                return list;
            })
        })
    }, [])

    const handleEdit = () => {
        let minError: any = [...minNumberGroup];
        const tepFormData = [...allData];
        tepFormData.map((data: any, idx: number) => {
            let min = data.min_persons
            let name = data.recuitement_division
            let a = data.information.map((info: any) => {
                if (name == "Group") {
                    if (info.participantInfo.length < min) {
                        minError[idx] = true
                    } else {
                        minError[idx] = false
                    }
                }
            })
            return data
        })
        setMinNumberGroup(minError)
        const minimum = minError.filter((o: any) => o).length > 0;
        if (!minimum) {
            let tempData = [...allData]
            tempData = tempData.map((mainItem: any) => {
                mainItem.information = mainItem.information.map((info: any) => {
                    let data = {
                        COVID_19_symptoms: info?.applicationInfo?.information?.COVID_19_symptoms || null,
                        is_Attendance: info?.applicationInfo?.information?.is_Attendance || null,
                        participant_approve_status: info?.applicationInfo?.information?.participant_approve_status || "Waiting",
                        temperature: info?.applicationInfo?.information?.temperature || null,
                        vaccination: info?.applicationInfo?.information?.vaccination || null
                    }

                    delete info?.applicationInfo?.information?.COVID_19_symptoms
                    delete info?.applicationInfo?.information?.is_Attendance
                    delete info?.applicationInfo?.information?.participant_approve_status
                    delete info?.applicationInfo?.information?.temperature
                    delete info?.applicationInfo?.information?.vaccination

                    return {
                        ...info,
                        applicationInfo: { ...info.applicationInfo, ...data }
                    }
                })
                return mainItem
            })

            tempData = tempData.map((mainItem: any) => {
                mainItem.information = mainItem.information.map((info: any) => {
                    info.participantInfo = info.participantInfo.map((participant: any) => {
                        let data = {
                            COVID_19_symptoms: participant?.information?.COVID_19_symptoms,
                            is_Attendance: participant?.information?.is_Attendance,
                            participant_approve_status: participant?.information?.participant_approve_status,
                            temperature: participant?.information?.temperature,
                            vaccination: participant?.information?.vaccination
                        }

                        delete participant?.information?.COVID_19_symptoms
                        delete participant?.information?.is_Attendance
                        delete participant?.information?.participant_approve_status
                        delete participant?.information?.temperature
                        delete participant?.information?.vaccination

                        return {
                            ...participant,
                            ...data
                        }
                    })
                    return info
                })
                return mainItem
            })
            tempData = tempData.map((item: any) => {
                delete item.max_persons;
                delete item.min_persons;
                delete item.totalCount;
                return {
                    ...item,
                    information: JSON.stringify(item.information)
                };
            })
            ApiPut(`event/EditParticipantsByAdmin`, { participate_info: tempData })
                .then((res: any) => {
                    history.push(`/event/manage-event-participant?id=${event_id}&ename=${ename}`);
                })
                .catch((error) => {
                    console.log("error", error)
                });

            tempData = tempData.map((item: any) => {
                return {
                    ...item,
                    information: JSON.parse(item.information)
                };
            })
        }
    }

    useEffect(() => {
    }, [allData])

    const individualApplicationData = (participantData: any, keyId: string) => {
        let tempFormData: any = [...allData];
        let isDivExists = tempFormData.filter((participant: any) => participant.keyId == keyId).length > 0
        if (isDivExists == false) {
            let applicationItem = {
                division_id: keyId,
                keyId: uuidv4() + Date.now(),
                application_amount: 0,
                event_id: event_id,
                information: [
                    {
                        applicationInfo: {},
                        participantInfo: []
                    }
                ]
            }
            tempFormData = [...tempFormData, applicationItem]
        }
        tempFormData = tempFormData.map((participant: any) => {
            if (keyId === participant.keyId) {
                participant.information = participant.information.map((info: any, subIndex: number) => {
                    return {
                        ...info,
                        applicationInfo: { ...info.applicationInfo, information: participantData },
                    }

                })
            }
            return participant
        })
        setAllData(tempFormData)
    }

    const individualParticipantData = (participantData: any, keyId: string, participantCount: number) => {
        let tempFormData: any = [...allData];
        let isDivExists = tempFormData.filter((participant: any) => participant.keyId == keyId).length > 0
        if (isDivExists == false) {
            let applicationItem = {
                division_id: keyId,
                keyId: uuidv4() + Date.now(),
                application_amount: 0,
                event_id: event_id,
                information: [
                    {
                        applicationInfo: {},
                        participantInfo: []
                    }
                ]
            }
            tempFormData = [...tempFormData, applicationItem]
        }

        tempFormData = tempFormData.map((participant: any) => {
            if (keyId === participant.keyId) {
                participant.information = participant.information.map((info: any, subIndex: number) => {
                    let value: any = [...info.participantInfo];
                    value[participantCount] = { ...value[participantCount], information: participantData }
                    return {
                        ...info,
                        participantInfo: value,
                    }
                })
            }
            return participant
        })
        setAllData(tempFormData)
    }

    const handleDivisionAdd = (divisionId: string, event_id: string) => {
        let tempFormData: any = [...allData];
        tempFormData = tempFormData.map((mainItem: any) => {
            if (mainItem.recuitement_division == "Group") {
                if (mainItem.max_persons > mainItem.totalCount) {
                    mainItem.information = mainItem.information.map((info: any) => {

                        const emptyFiledData = {
                            id: 0,
                            divisionId,
                            event_id,
                            is_defination_by: false,
                            information: emptyFiled,
                        };

                        let tempparticipantInfo: any = [...info.participantInfo]
                        tempparticipantInfo.push(emptyFiledData)
                        return { ...info, participantInfo: tempparticipantInfo }
                    })
                    return {
                        ...mainItem,
                        totalCount: mainItem.totalCount + 1
                    }
                } else {
                    return mainItem
                }
            } else {
                mainItem.information = mainItem.information.map((info: any) => {
                    const emptyFiledData = {
                        id: 0,
                        divisionId,
                        event_id,
                        is_defination_by: false,
                        information: emptyFiled,
                    };

                    let tempparticipantInfo: any = [...info.participantInfo]
                    tempparticipantInfo.push(emptyFiledData)
                    return { ...info, participantInfo: tempparticipantInfo }
                })
                return {
                    ...mainItem,
                    totalCount: mainItem.totalCount + 1
                }
            }
        })
        setAllData(tempFormData)
    }

    const handleDivisionMinus = () => {
        let tempFormData: any = [...allData];
        tempFormData = tempFormData.map((mainItem: any) => {
            if (mainItem.totalCount != 0) {
                mainItem.information = mainItem.information.map((info: any) => {
                    info.participantInfo.pop()
                    return { ...info, participantInfo: info.participantInfo }
                })
                return {
                    ...mainItem,
                    totalCount: mainItem.totalCount - 1
                }
            } else {
                return {
                    ...mainItem,
                    totalCount: 0
                }
            }
        })
        setAllData(tempFormData)
    }

    const handleDivisionMinusAll = () => {
        let tempFormData: any = [...allData];
        tempFormData = tempFormData.map((mainItem: any) => {
            if (mainItem.totalCount != 0) {
                mainItem.information = mainItem.information.map((info: any) => {
                    return { ...info, participantInfo: [info.participantInfo[0]] }
                })
                return {
                    ...mainItem,
                    totalCount: 1
                }
            } else {
                return {
                    ...mainItem,
                    totalCount: 0
                }
            }
        })
        setAllData(tempFormData)
    }

    return (
        <div className="application">
            <div className="application-title">
                <div className="application-heading-titile">
                    <h4>이벤트 신청내역 수정</h4>
                </div>
                <div className="btn-2">
                    <Buttons
                        type=""
                        ButtonStyle="Cancel-participation pm-cancel-participation-ctn"
                        onClick={() => setIsApplicationCancle(true)}
                    >이벤트 참가 취소</Buttons>
                    <Buttons
                        type=""
                        ButtonStyle="BackBtn"
                        onClick={() => {
                            history.push(`/event/manage-event-participant?id=${event_id}&ename=${ename}`);
                        }}
                    >취소</Buttons>
                    <Buttons
                        type=""
                        ButtonStyle="save-btn"
                        onClick={() => handleEdit()}
                    >저장</Buttons>
                </div>
            </div>

            {/* <div className="border-bottom" /> */}

            {allData && !isEmpty(allData) && allData.map((mainItem: any, mainIndex: number) => (
                <AllDivisionEditInfo mainItem={mainItem} key={mainIndex} viewTourSection={viewTourSection} setViewTourSection={setViewTourSection} mainIndex={mainIndex} individualApplicationData={individualApplicationData} individualParticipantData={individualParticipantData} applicationEmptyFiled={applicationEmptyFiled} allFiledData={allFiledData} handleDivisionAdd={handleDivisionAdd} handleDivisionMinus={handleDivisionMinus} handleDivisionMinusAll={handleDivisionMinusAll} minNumberGroup={minNumberGroup} />
            ))
            }

            <Cancellationparticipation onHide={() => setIsApplicationCancle(false)} show={isApplicationCancle} eventId={event_id} />
        </div>

    );
};

export default ParticipantRegisterView;