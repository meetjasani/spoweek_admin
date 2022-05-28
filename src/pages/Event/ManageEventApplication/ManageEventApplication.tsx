import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router";
import Buttons from "../../../component/Buttons/Buttons";
import { ApiGet } from "../../../helper/API/ApiData";
import { Recruitment_method, Sports } from "../../../helper/Constant";
import "./ManageEventApplication.css";
import ManageEventApplicationList from "./ManageEventApplicationList";
import ManageEventParticipant from "./ManageEventParticipant";
import Select from "react-select";


export interface manageEventApp {
    id: string,
    no_id: string;
    status: string;
    writer: string;
    event_name: string;
    date: string;
    locations: string;
    participation_fee: string;
    volume_of_recruitment: string;
    participants_waiting: string;
    deadline: string;
}

let manageEventApplicationID: any = [];

const ManageEventApplication = () => {

    const recruitment_method = Recruitment_method;
    const sports = Sports;
    const history = useHistory();
    const [manageEventApplicationData, setManageEventApplicationData] = useState<manageEventApp[]>([]);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [manageEventApplicationIdList, setManageEventApplicationIdList] = useState<any>([]);
    const [activeTab, setActiveTab] = useState("InProgress");
    const [selectRegion, setSelectRegion] = useState<any>([])


    const [eventDefaultInfo, setEventDefaultInfo] = useState({
        method_recruitment: "all",
        eventStatus: "",
        searchTerm: "",
        eventInformation: "all",
        sportName: "all",
        regionName: "all"
    });

    useEffect(() => {
        setEventDefaultInfo({ ...eventDefaultInfo, regionName: selectRegion[0]?.value || "all" })
    }, [selectRegion])

    const eventInfo = [
        { value: "all", label: "전체" },
        { value: "content", label: "내용" },
        { value: "writer", label: "작성자" },
    ];

    const recruitment = [
        { value: "all", label: "전체" },
        { value: "AtSpoweek", label: "스포위크에서 모집" },
        { value: "FromOutside", label: "외부에서 모집" },
    ]

    const eventStatus = [
        { value: "InProgress", label: "진행중" },
        { value: "Ended", label: "종료" },
    ];

    const sportsDropDown = [
        { label: sports.Football, value: "football" },
        { label: sports.Basketball, value: "basketball" },
        { label: sports.Baseball, value: "baseball" },
        { label: sports.Volley_Ball, value: "volleyball" },
        { label: sports.Marathon, value: "marathon" },
        { label: sports.Bike, value: "bike" },
        { label: sports.Swimming, value: "swimming" },
        { label: sports.Golf, value: "golf" },
        { label: sports.Tennis, value: "tennis" },
        { label: sports.Badminton, value: "badminton" },
        { label: sports.Table_Tennis, value: "table_Tennis" },
        { label: sports.Bowling, value: "bowling" },
        { label: sports.Billiards, value: "billiards" },
        { label: sports.Hado, value: "hado" },
        { label: sports.other, value: "other" },
    ];

    useEffect(() => {
        eventDefaultInfo.eventStatus = eventStatus[0].value;
        eventDefaultInfo.eventInformation = eventInfo[0].value;
        eventDefaultInfo.method_recruitment = recruitment[0].value;
        // eventDefaultInfo.sportName = sportsDropDown[0].value;
    }, []);

    const getManageEventApplication = (page = 1, sizePerPage = 50) => {

        ApiGet(
            `event/getEventManageByAdmin?per_page=${sizePerPage}&page_number=${page}&event_information=${eventDefaultInfo.eventInformation
            }&search_term=${eventDefaultInfo.searchTerm}&city=${eventDefaultInfo.regionName}&sport_name=${eventDefaultInfo.sportName}&event_status=${eventDefaultInfo.eventStatus
            }&method_to_recruit=${eventDefaultInfo.method_recruitment}`
        ).then((res: any) => {
            setTotalSize(res.data && res.data.count);
            setManageEventApplicationData(
                res.data &&
                res.data.eventRegistration &&
                res.data.eventRegistration.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page - 1) * sizePerPage - index,
                        status: x.status,
                        writer: x.writer,
                        event_name: x.event_name,
                        date: x.event_date,
                        locations: x.location,
                        recruitment: x.recruitment,
                        volume_of_recruitment: x.volume_of_recruitment,
                        participants_waiting: x.participants_watting,
                        deadline: x.deadline_date
                    }
                })
            )
        }).catch((error: any) => {
            console.log("error", error);
        })
    }

    useEffect(() => {
        ApiGet(`event/getRegion`)
            .then((res: any) => {
                setSelectRegion(
                    res.data &&
                    res.data.map((eventDetails: any, index: any) => {
                        return {
                            value: eventDetails.value,
                            label: eventDetails.lable
                        }
                    })
                )
            })
    }, [])
    useEffect(() => {
        getManageEventApplication()
    }, [])

    const search = () => {
        getManageEventApplication()
    }

    const TabChange = (TabValue: any) => {
        eventDefaultInfo.eventStatus = TabValue;
        getManageEventApplication();
        setActiveTab(TabValue);
    };
    const selectRow = {
        // mode: "checkbox",
        // onSelect: (isSelect: any, rows: any, e: any) => {
        //     const index = manageEventApplicationID.findIndex(
        //         (item: any) => item.id === isSelect.id
        //     );
        //     if (index !== -1 && index !== undefined) {
        //         manageEventApplicationID.splice(index, 1);
        //     } else {
        //         manageEventApplicationID.push({ id: isSelect.id });
        //     }
        //     setManageEventApplicationIdList(manageEventApplicationID);
        // },
        // onSelectAll: (isSelect: any, rows: any, e: any) => {
        //     if (isSelect === true) {
        //         rows.map((x: any) => manageEventApplicationID.push({ id: x.id }));
        //         setManageEventApplicationIdList(manageEventApplicationID);
        //     } else {
        //         setManageEventApplicationIdList([]);
        //     }
        // },
    };

    const selectOption = (label: string, dropDownName: string) => {
        let list: any = []
        if (dropDownName === "recruitment") {
            list = recruitment
        }
        if (dropDownName === "event_information") {
            list = eventInfo
        }
        if (dropDownName === "sport") {
            list = sportsDropDown
        }
        if (dropDownName === "region") {
            list = selectRegion
        }

        let findData = list.find((data: any) => data?.value === label)

        let dataObj = undefined
        if (findData?.value) {
            dataObj = {
                label: findData?.label,
                value: findData?.value,
            }
        }
        return dataObj;
    }

    return (
        <>
            <div className="main-heading-wrap member-list">
                <div>
                    <p className="font-20-bold roboto color-01">이벤트 신청내역 관리</p>
                </div>
                <div className="d-flex ml-auto register-member">
                    <div>
                        <Buttons
                            type=""
                            ButtonStyle="normalBtn"
                            onClick={() => {
                                history.push('/event/register-event');
                            }}>
                            이벤트 등록
                        </Buttons>
                    </div>
                </div>
            </div>
            <div className="border-black mt-20"></div>
            <div className="search-section">
                <p className="title">이벤트 신청내역 검색</p>
            </div>
            <div className="border"></div>
            <div className="d-flex search-sign-up-date mj-selectdropDown search-dropdown">
                <div className="width d-flex">
                    <div className="date-of-registration-set">
                        <label className="">모집방법</label>
                    </div>
                    <div className="DatePicker-set-main manage-application">
                        <div className="position-relative pl-0 selector-padding">
                            {/* <select
                                // className="selector-set minimal event-app-dropdwn"
                                className={`${eventDefaultInfo.method_recruitment === "" ? "selector-set" : "selector-set-grays"} minimal form-custom-select`}
                                name="method_recruitment"
                                onChange={(e: any) => {
                                    setEventDefaultInfo({
                                        ...eventDefaultInfo,
                                        method_recruitment: e.target.value,
                                    });
                                }}
                            >
                                {recruitment.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                ))}
                            </select> */}
                            <Select
                                // className="mj-selectdropDown search-dropdown"
                                id="recruitment"
                                className="minimal"
                                name="recruitment"
                                options={recruitment}
                                defaultValue={recruitment[0]}
                                value={selectOption(eventDefaultInfo.method_recruitment, "recruitment")}
                                onChange={(e: any) => {
                                    setEventDefaultInfo({ ...eventDefaultInfo, method_recruitment: e.value });
                                }}
                            />
                            {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                        </div>
                    </div>
                </div>
                <div className="width d-flex">
                    <div className="date-of-registration-set ">
                        <label className="">검색</label>
                    </div>
                    <div className="position-relative selector-padding">
                        {/* <select
                            // className="selector-set minimal event-app-dropdwn"
                            className={`${eventDefaultInfo.eventInformation === "" ? "selector-set" : "selector-set-grays"} minimal form-custom-select`}
                            name="event_information"
                            onChange={(e: any) => {
                                setEventDefaultInfo({
                                    ...eventDefaultInfo,
                                    eventInformation: e.target.value,
                                });
                            }}
                        >
                            {eventInfo.map(({ value, label }) => (
                                <option value={value}>{label}</option>
                            ))}
                        </select> */}
                        <Select
                            id="event_information"
                            name="event_information"
                            className="minimal"
                            options={eventInfo}
                            defaultValue={eventInfo[0]}
                            value={selectOption(eventDefaultInfo.eventInformation, "event_information")}
                            onChange={(e: any) => {
                                setEventDefaultInfo({ ...eventDefaultInfo, eventInformation: e.value });
                            }}
                        />
                        {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                    </div>
                    <div className="Please-enter-input-set-padding">
                        <input
                            className="Please-enter-input-set color-11 custom-placeholder"
                            name="searchTerm"
                            placeholder="입력해주세요."
                            type="text"
                            autoComplete="off"
                            value={eventDefaultInfo.searchTerm}
                            onChange={(e: any) => {
                                setEventDefaultInfo({
                                    ...eventDefaultInfo,
                                    searchTerm: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="border"></div>
            <div className="search-btn-container">
                <button className="Search-btn-set" onClick={search}>
                    <span> 검색 </span>
                </button>
            </div>
            <div className="list-top-border"></div>
            <div className="Search-Results-row search-results-ctn  section-row">
                <span> 검색 결과 </span>
                <div>
                    <div className="re-Search-results-box mj-selectdropDown">
                        {/* <select
                            className="react-results results-minimal"
                            name="region"
                            value={eventDefaultInfo.regionName}
                            onChange={(event: any) => {
                                setEventDefaultInfo({ ...eventDefaultInfo, regionName: event.target.value });
                            }}
                        >
                            {selectRegion.length > 0 && selectRegion.map((region: any) => (
                                <option value={region.value}>{region.lable}</option>
                            ))}
                        </select> */}
                        <div className='position-relative table-filter-select'>
                            <Select
                                id="region"
                                className="minimal"
                                name="region"
                                options={selectRegion}
                                // defaultValue={selectRegion[0]}
                                value={selectOption(eventDefaultInfo.regionName, "region")}
                                onChange={(e: any) => {
                                    setEventDefaultInfo({ ...eventDefaultInfo, regionName: e.value });
                                }}
                            />
                            {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                        </div>
                        {/* <select
                            className="react-results-A results-minimal"
                            name="sport"
                            value={eventDefaultInfo.sportName}
                            onChange={(event: any) => {
                                setEventDefaultInfo({ ...eventDefaultInfo, sportName: event.target.value });
                            }}
                        >
                            {sportsDropDown.map(({ value, label }) => (
                                <option value={value}>{label}</option>
                            ))}
                        </select> */}
                        <div className='position-relative table-filter-select-two'>
                            <Select
                                id="sport"
                                name="sport"
                                className="minimal"
                                options={sportsDropDown}
                                defaultValue={sportsDropDown[0]}
                                value={selectOption(eventDefaultInfo.sportName, "sport")}
                                onChange={(e: any) => {
                                    setEventDefaultInfo({ ...eventDefaultInfo, sportName: e.value });
                                }}
                            />
                            {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border"></div>
            <div className="text-center custom-datatable member-list-table">
                <div className="tab-main">
                    <span
                        className={
                            activeTab === "InProgress" ? "pl-3 pr-3 active" : "pl-3 pr-3"
                        }
                        onClick={() => TabChange("InProgress")}
                    >
                        진행중
                    </span>
                    <span className="tab-line"></span>
                    <span
                        className={
                            activeTab === "Ended" ? "pl-3 pr-3 active" : "pl-3 pr-3"
                        }
                        onClick={() => TabChange("Ended")}
                    >
                        종료
                    </span>
                </div>

                <div className="border"></div>

                <div className="p-0">
                    <div className="table-width">
                        <ManageEventApplicationList
                            data={manageEventApplicationData}
                            getManageEvent={getManageEventApplication}
                            totalSize={totalSize}
                            selectRow={selectRow}
                        />
                    </div>
                </div>
            </div >

        </>
    )
}



export default ManageEventApplication;
