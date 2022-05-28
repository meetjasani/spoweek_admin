import _ from "lodash";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory, useParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import Buttons from "../../../component/Buttons/Buttons";
import { ApiGet, ApiPost, ApiPut } from "../../../helper/API/ApiData";
import { Gender, Participate_Status, Attendance, Vaccination, Covid_Symptoms } from "../../../helper/Constant";
import { isEmpty } from "../../../helper/util";
import AllDivisionInfo from "./AllDivisionInfo";
import DynamicFormData from "./DynamicFormData";
import "./ManageEventApplication.css";

interface manageEvent {
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

const ManageEventParticipantRegister = () => {

    // const { id }: any = useParams(); 
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')?.toString() ?? "";
    const ename = queryParams.get('ename')?.toString();
    const [totalCount, setTotalCount] = useState([0])
    const [totalParticipateFee, setTotalParticipateFee] = useState<any>([])
    const [viewTourSection, setViewTourSection] = useState<any>();
    const [emptyFiled, setEmptyFiled] = useState({})
    const [emptyApplicationData, setemptyApplicationData] = useState({})
    const [allSelectData, setAllSelectData] = useState<any>([{ isShow: true }])
    const [applicationInfoRequired, setapplicationInfoRequired] = useState<any>()
    const [minNumberGroup, setMinNumberGroup] = useState<any>([])
    const [selectDivision, setSelectDivision] = useState<any>([""])

    const manageEvent: manageEvent = {
        id: "",
        applicant_name: "",
        applied_date: "",
        classfication: "",
        division: "",
        group_name: "",
        dob: "",
        gender: "",
        email: "",
        phone_number: "",
        affiliation: "",
        participation_status: "",
        participation_fee: "",
        image: "",
        attendance: "",
        vaccination: "",
        COVID: "",
        address: "",
        temperature: "",
    }

    const gender = Gender;
    const participate_status = Participate_Status;
    const attendance = Attendance;
    const vaccination = Vaccination;
    const covid_symptoms = Covid_Symptoms;

    const history = useHistory();
    const [manageEventApp, setManageEventApp] = useState(manageEvent);
    // const [manageEventApp, setManageEventApp] = useState<manageEvent[]>([]);
    const [imgSrc, setImgSrc] = useState("");
    const [imageName, setImageName] = useState("");
    const [allFiledData, setFiledData] = useState<any>([])
    const [applicationEmptyFiled, setApplicationEmptyFiled] = useState<any>([])
    const [allData, setAllData] = useState<any>([])
    const [selectedFile, setSelectedFile] = useState<File>();
    const [allDivision, setAllDivision] = useState(["as"])

    // drop down
    const genderDropDown = [
        { label: gender.Male, value: "남성" },
        { label: gender.Female, value: "여자" },
    ]

    const participate_statusDropDown = [
        { label: participate_status.Confirmed, value: "참가확정" },
        // { label: participate_status.Female, value: "여자" },
    ]

    const attendanceDropDown = [
        { label: attendance.Attended, value: "출석확인" },
        // { label: attendance.Female, value: "여자" },
    ]

    const vaccinationDropDown = [
        { label: vaccination.Vaccinated, value: "접종" },
        // { label: gender.Female, value: "여자" },
    ]

    const covid_symptomsDropDown = [
        { label: covid_symptoms.No, value: "접종" },
        // { label: gender.Female, value: "여자" },
    ]

    const attechImage = () => {
        document.getElementById("attechImage")?.click();
    };

    const getEventParticipant = () => {
        ApiGet(`event/GetParticipateDataByAdmin/${id}`)
            .then((res: any) => {
                let tempFormData: any = res?.data?.basicDivision
                let tempFiledData: any = _.map(res?.data?.participant_display_control_information, function (x) { return { id: x.id, control_order: x.control_order, control_lable: x.control_lable, control_placeholder: x.control_placeholder, control_placeholder_ko: x.control_placeholder_ko, control_lable_ko: x.control_lable_ko, control_type: x.control_type, field_status: x.field_status, control_lable_enum: x.control_lable_enum } })
                let dataFind = tempFiledData.find((data: any) => data.control_lable_enum == "Address")
                if (dataFind != undefined || dataFind != null) {
                    const data = {
                        id: "LandmarkId",
                        control_lable: "Landmark",
                        control_placeholder: "경계표",
                        control_placeholder_ko: "경계표",
                        control_lable_ko: "경계표",
                        control_order: "7",
                        control_lable_enum: "Landmark",
                        control_type: "textarea",
                        field_status: "Static"
                    }
                    tempFiledData = [...tempFiledData, data]
                }
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

                tempFiledData = [...tempFiledData, ...covidData]
                let tempFiled = _.sortBy(_.filter(tempFiledData, function (o) { return o.field_status == "Static" }), [function (o) { return o.control_order; }])
                setFiledData(tempFiled)
                let EmptyData: any = _.map(tempFiled, function (x) { return { [x.control_lable_enum]: "" } })
                setEmptyFiled(Object.assign({}, ...EmptyData))


                let tempApplication: any = [{
                    "id": "6c2892cd-0e57-4ceb-8bea-ffebfa1ffe4a",
                    "control_lable_enum": "Name",
                    "control_lable": "Name",
                    "control_lable_ko": "이름",
                    "control_placeholder": "Name",
                    // "control_placeholder_ko": "이름",
                    "control_placeholder_ko": "신청자 이름 입력",
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
                    "control_placeholder_ko": "휴대폰 번호 입력",
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
                    "control_placeholder_ko": "생년월일 입력",
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
                    "control_placeholder_ko": "이메일 입력",
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


                let EmptyApplicationData: any = _.map(tempApplicationFiled, function (x) { return { [x.control_lable_enum]: null } })
                setemptyApplicationData(EmptyApplicationData)
                setFiledData(tempFiled)


                tempFormData = tempFormData.map((mainItem: any, mainIndex: number) => {
                    let tempApplicationData: any = {}
                    if (mainItem.recuitement_division == "Group") {
                        tempApplicationData = EmptyApplicationData
                    } else {
                        tempApplicationData = EmptyApplicationData
                    }
                    return {
                        ...mainItem,
                        event_id: id,
                        counter: 0,
                        keyId: uuidv4() + Date.now(),
                        application_amount: mainItem?.participation_fee,
                        participant_approve: res.data?.participant_display_control?.approve_participants,
                        awaiter_receipt: res.data?.participant_display_control?.awaiter_receipt,
                        information: [
                            {
                                applicationInfo: Object.assign({}, ...tempApplicationData),
                                participantInfo: []
                            }
                        ]
                    }
                });

                setViewTourSection(() => {
                    let list: any = [];
                    for (let i = 0; i < allDivision.length; i++) {
                        list[i] = false;
                    }
                    return list;
                })

                setAllData(tempFormData)
            })
    }

    const handleApplication = () => {

        let isApiCall = selectDivision.filter((o: string) => o == "").length > 0

        if (!(isApiCall)) {
            const tepForumData: any = [...allSelectData];
            let tempApplicationData: any = []
            for (let i = 0; i < tepForumData.length; i++) {
                let result = Object.values(tepForumData[i].information[0].applicationInfo).filter((o: any) => isEmpty(o)).length > 0;
                tempApplicationData = [...tempApplicationData, result];
            }
            setapplicationInfoRequired(tempApplicationData);

            let minError: any = [...minNumberGroup];

            const tepFormData = [...allSelectData];
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
            const application = tempApplicationData.filter((o: any) => o).length > 0;

            if (!minimum && !application) {
                let tempApplicationData = [...allSelectData]
                tempApplicationData = tempApplicationData.map((item: any) => {
                    delete item.max_persons;
                    delete item.participation_fee;
                    delete item.min_persons;
                    delete item.id;
                    delete item.isShow;
                    item.information = JSON.stringify(item.information);
                    return item;
                })
                ApiPost(`event/AddParticipantsByAdmin`, { participate_info: tempApplicationData })
                    .then((res: any) => {
                        history.push(`/event/manage-event-participant?id=${tempApplicationData[0]?.event_id}`);
                    })
                    .catch((error) => {
                        console.log("error", error)
                    });

                tempApplicationData = allData.map((item: any) => {
                    item.information = JSON.parse(item.information);
                    return item;
                })
            }
        }

    }

    const handleAddParticipateGroup = (keyId: any) => {
        let value: any = [...allSelectData];
        value = value.map((group: any, idx: number) => {
            if (group.keyId === keyId) {
                group.information = group.information.map((info: any) => {
                    return {
                        ...info,
                        participantInfo: [...info.participantInfo, emptyFiled]
                    }
                })
                return group
            }
            return group
        })
        setAllSelectData(value)
    }

    const handleAddParticipateIndividual = (keyId: any) => {
        let value: any = [...allSelectData];
        value = value.map((group: any, idx: number) => {
            if (group.keyId === keyId) {
                group.information = group.information.map((info: any) => {
                    return {
                        ...info,
                        participantInfo: [...info.participantInfo, emptyFiled]
                    }
                })
                return group
            }
            return group
        })
        setAllSelectData(value)
    }

    const handleDeleteParticipateIndividual = (keyId: any) => {
        let value: any = [...allSelectData];
        value = value.map((group: any, idx: number) => {
            if (group.keyId === keyId) {
                group.information = group.information.map((info: any) => {
                    info.participantInfo.pop()
                    return {
                        ...info,
                        participantInfo: info.participantInfo
                    }
                })
            }
            return group
        })
        setAllSelectData(value)
    }

    const handleDeleteParticipateGroup = (keyId: any) => {
        let value: any = [...allSelectData];
        value = value.map((group: any, idx: number) => {
            if (group.keyId === keyId) {
                group.information = group.information.map((info: any) => {
                    return {
                        ...info,
                        participantInfo: [info.participantInfo[0]]
                    }
                })
            }
            return group
        })
        setAllSelectData(value)
    }

    const participateAdd = (MainIndex: any, tempTotalData: any, tempParticipateFee: any, tempMainData: any, key: number) => {
        if (key) {
            if (tempTotalData != 0) {
                let tempFormData: any = [...tempMainData];
                tempFormData = tempFormData.map((mainItem: any, mainIndex: number) => {
                    if (mainIndex == MainIndex) {
                        mainItem.information = mainItem.information.map((subItem: any, subIndex: number) => {
                            let tempparticipantInfo: any = []
                            let tempApplicationData: any = {}
                            if (mainItem.recuitement_division == "Group") {
                                tempApplicationData = emptyApplicationData
                                for (let i = 0; i < mainItem.min_persons; i++) {
                                    tempparticipantInfo.push(emptyFiled)
                                }
                            } else {
                                tempApplicationData = emptyApplicationData
                                for (let i = 0; i < tempTotalData[MainIndex]; i++) {
                                    tempparticipantInfo.push(emptyFiled)
                                }
                            }
                            return {
                                ...subItem,
                                participantInfo: tempparticipantInfo
                            }
                        })
                        return mainItem
                    }
                    return mainItem
                })
                if (key && tempTotalData[MainIndex] > 1) {
                    if (tempFormData[MainIndex].recuitement_division == "Group") {
                        tempFormData.splice(MainIndex + 1, 0, { ...tempFormData[MainIndex], keyId: uuidv4() + Date.now(), isShow: false })
                        setAllDivision([...allDivision, "New"])
                        selectDivision.splice(MainIndex + 1, 0, tempFormData[MainIndex].id)
                        setSelectDivision(selectDivision)
                        tempTotalData.splice(MainIndex + 1, 0, 0)
                        setTotalCount(tempTotalData)
                        tempParticipateFee.splice(MainIndex + 1, 0, 0)
                        setTotalParticipateFee(tempParticipateFee)
                    }
                }
                setAllSelectData(tempFormData)
            }
        } else {
            allDivision.length = tempMainData.length
            setAllDivision(allDivision)

            if (tempTotalData[MainIndex] != 0) {
                let tempFormData: any = [...tempMainData];
                tempFormData = tempFormData.map((mainItem: any, mainIndex: number) => {
                    if (mainIndex == MainIndex) {
                        mainItem.information = mainItem.information.map((subItem: any, subIndex: number) => {
                            let tempparticipantInfo: any = []
                            let tempApplicationData: any = {}
                            if (mainItem.recuitement_division == "Group") {
                                tempApplicationData = emptyApplicationData
                                for (let i = 0; i < mainItem.min_persons; i++) {
                                    tempparticipantInfo.push(emptyFiled)
                                }
                            } else {
                                tempApplicationData = emptyApplicationData
                                for (let i = 0; i < tempTotalData[MainIndex]; i++) {
                                    tempparticipantInfo.push(emptyFiled)
                                }
                            }
                            return {
                                ...subItem,
                                applicationInfo: Object.assign({}, ...tempApplicationData),
                                participantInfo: []
                            }
                        })
                        return mainItem
                    }
                    return mainItem
                })
                setAllSelectData(tempFormData)
            }
        }
    }

    const participateRemove = (MainIndex: any, tempTotalData: any, tempParticipateFee: any) => {
        let tempFormData: any = [...allSelectData];
        if (tempFormData[MainIndex].recuitement_division == "Group") {
            if (tempTotalData[MainIndex] == 0) {
                tempFormData = tempFormData.map((mainItem: any, mainIndex: number) => {
                    if (mainIndex == MainIndex) {
                        mainItem.information = mainItem.information.map((subItem: any, subIndex: number) => {
                            return {
                                ...subItem,
                                participantInfo: []
                            }
                        })
                        return mainItem
                    }
                    return mainItem;
                })
                setAllSelectData(tempFormData)
            } else {
                let tempData = tempFormData.filter((o: any) => o.id == tempFormData[MainIndex].id)
                let keyId = tempData[tempData.length - 1]?.keyId
                let removeIndex = tempFormData.findIndex((i: any) => i.keyId == keyId)
                tempFormData.splice(removeIndex, 1)
                setAllSelectData(tempFormData)
                allDivision.splice(removeIndex, 1)
                setAllDivision(allDivision)
                selectDivision.splice(removeIndex, 1)
                setSelectDivision(selectDivision)
                tempTotalData.splice(removeIndex, 1)
                setTotalCount(tempTotalData)
                tempParticipateFee.splice(removeIndex, 1)
                setTotalParticipateFee(tempParticipateFee)
            }
        } else {
            tempFormData = tempFormData.map((mainItem: any, mainIndex: number) => {
                if (mainIndex == MainIndex) {
                    mainItem.information = mainItem.information.map((subItem: any, subIndex: number) => {
                        // let tempparticipantInfo: any = []
                        if (mainItem.recuitement_division == "Group") {

                        } else {
                            subItem.participantInfo.pop()
                        }
                        return {
                            ...subItem,
                            participantInfo: subItem.participantInfo
                        }
                    })
                    return mainItem
                }
                return mainItem;
            })
            setAllSelectData(tempFormData)
        }
    }

    const individualApplicationData = (participantData: any, keyId: string) => {
        let tempFormData: any = [...allSelectData];
        let isDivExists = tempFormData.filter((participant: any) => participant.keyId == keyId).length > 0
        if (isDivExists == false) {
            let applicationItem = {
                division_id: keyId,
                keyId: uuidv4() + Date.now(),
                application_amount: 0,
                event_id: id,
                information: [
                    {
                        applicationInfo: emptyApplicationData,
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
                        applicationInfo: participantData,
                    }

                })
            }
            return participant
        })
        setAllSelectData(tempFormData)
    }

    const individualParticipantData = (participantData: any, keyId: string, participantCount: number) => {
        let tempFormData: any = [...allSelectData];
        let isDivExists = tempFormData.filter((participant: any) => participant.keyId == keyId).length > 0
        if (isDivExists == false) {
            let applicationItem = {
                division_id: keyId,
                keyId: uuidv4() + Date.now(),
                application_amount: 0,
                event_id: id,
                information: [
                    {
                        applicationInfo: emptyApplicationData,
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
                    value[participantCount] = participantData
                    return {
                        ...info,
                        participantInfo: value,
                    }
                })
            }
            return participant
        })
        setAllSelectData(tempFormData)
    }


    useEffect(() => {
        getEventParticipant()
    }, [])

    const handleDivisionDelete = (idx: any) => {
        let tempData = [...allDivision]
        setAllDivision(tempData.filter((_, index) => index != idx))

        let tempSelectData = [...selectDivision]
        setSelectDivision(tempSelectData.filter((_, index) => index != idx))

        let tempAllSelectData = [...allSelectData]
        setAllSelectData(tempAllSelectData.filter((_, index) => index != idx))

        let tempCountData = [...totalCount]
        setTotalCount(tempCountData.filter((_, index) => index != idx))
    }


    useEffect(() => {
        if (!selectedFile) {
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setImgSrc(objectUrl);
        setImageName(selectedFile.name)

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);


    return (
        <div className="application">
            <div className="application-title">
                <div className="applicatison-heading-titile">
                    <h4>이벤트 신청내역 등록</h4>
                </div>
                <div className="btn-2">
                    {/* <Buttons
                        type=""
                        ButtonStyle="Cancel-participation"
                        onClick={() => history.push("/event/manage-event-application")}
                    >이벤트 참가 취소하기</Buttons> */}
                    <Buttons
                        type=""
                        ButtonStyle="BackBtn"
                        onClick={() => {
                            history.push(`/event/manage-event-participant?id=${id}`)
                        }}
                    >취소</Buttons>
                    <Buttons
                        type=""
                        ButtonStyle="save-btn"
                        onClick={handleApplication}
                    >저장</Buttons>
                </div>
            </div>

            <div className="border-bottom" />
            <div className="btn-3 align-items-center">
                <div className="heading-2">
                    {/* <h5>이벤트 참가자 정보 수정 </h5> */}
                    <h5>{ename}</h5>
                </div>
                <div className="edit-back-btn-add ml-auto">
                    <Buttons
                        type=""
                        ButtonStyle="saveBtn "
                        onClick={() => {
                            let divisionAdd = !(selectDivision.filter((data: any) => data == "").length > 0)
                            if (divisionAdd) {
                                setAllDivision([...allDivision, "New"])
                                setAllSelectData([...allSelectData, { isShow: true }])
                                setSelectDivision([...selectDivision, ""])
                            }
                        }}
                    >부문 추가</Buttons>
                </div>

            </div>

            <div className="">
                <div className="border" />
            </div>

            {allDivision && allDivision.map((item: any, index: number) => (
                <AllDivisionInfo key={index} mainIndex={index} allData={allData} item={item} allFiledData={allFiledData} emptyFiled={emptyFiled} setSelectDivision={setSelectDivision} selectDivision={selectDivision} totalCount={totalCount} setTotalCount={setTotalCount} allSelectData={allSelectData} setAllSelectData={setAllSelectData} handleDivisionDelete={handleDivisionDelete} totalParticipateFee={totalParticipateFee} setTotalParticipateFee={setTotalParticipateFee} applicationEmptyFiled={applicationEmptyFiled} individualApplicationData={individualApplicationData} participateAdd={participateAdd} participateRemove={participateRemove} individualParticipantData={individualParticipantData} emptyApplicationData={emptyApplicationData} handleAddParticipateGroup={handleAddParticipateGroup} handleDeleteParticipateGroup={handleDeleteParticipateGroup} minNumberGroup={minNumberGroup} applicationInfoRequired={applicationInfoRequired} viewTourSection={viewTourSection} showTourSection={setViewTourSection} allDivision={allDivision} handleAddParticipateIndividual={handleAddParticipateIndividual} handleDeleteParticipateIndividual={handleDeleteParticipateIndividual} />
            ))}
        </div>

    );
};

export default ManageEventParticipantRegister;