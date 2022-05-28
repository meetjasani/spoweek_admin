import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import DatePicker, { registerLocale } from "react-datepicker";
import Buttons from '../../../component/Buttons/Buttons';
import { ApiGet, ApiPut } from '../../../helper/API/ApiData';
import { Sports } from "../../../helper/Constant";
import ManageDeletedEventList from './ManageDeletedEventList';
import "./ManageDeleteEvent.css";
import Select from "react-select";

export interface manageDelete {
    id: string,
    no_id: string;
    region: string;
    sports: string;
    writer: string;
    status: string;
    participants: string;
    event_name: string;
    recruit_method: string;
    date: string;
    locations: string;
    participation_fee: string;
    volume_of_recruitment: string;
    participants_waiting: string;
    switching_awaiters: string;
    registered_date: string;
    deadline: string;
    // participants_information: any;
}
let manageDeleteEventID: any = [];
const ManageDeletedEvent = () => {

    const sports = Sports;

    const [manageDeleteEventData, setManageDeleteEventData] = useState<manageDelete[]>([]);
    const [exportManageDeleteEvent, setExportManageDeleteEvent] = useState<manageDelete[]>([]);
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [totalSize, setTotalSize] = useState<number>(0);
    const [manageDeleteEventIdList, setManageDeleteEventIdList] = useState<any>([]);
    const [selectRegion, setSelectRegion] = useState<any>([])

    const [eventDefaultInfo, setEventDefaultInfo] = useState({
        eventStatus: "",
        searchTerm: "",
        eventInformation: "",
        sportName: "",
        regionName: ""
    });
    useEffect(() => {
        setEventDefaultInfo({ ...eventDefaultInfo, regionName: selectRegion[0]?.value || "" })
      }, [selectRegion])
    
    const eventInfo = [
        { value: "all", label: "전체" },
        { value: "content", label: "내용" },
        { value: "writer", label: "작성자" },
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

    const eventStatus = [
        { value: "InProgress", label: "진행중" },
        { value: "Ended", label: "종료" },
    ];

    useEffect(() => {
        eventDefaultInfo.eventStatus = eventStatus[0].value;
        eventDefaultInfo.eventInformation = eventInfo[0].value;
    }, []);

    const GetSportName = (sport_name: any) => {
        switch (sport_name) {
            case "football":
                sport_name = "축구"
                break;
            case "basketball":
                sport_name = "농구"
                break;
            case "baseball":
                sport_name = "야구"
                break;
            case "volleyball":
                sport_name = "배구"
                break;
            case "marathon":
                sport_name = "마라톤"
                break;
            case "bike":
                sport_name = "자전거"
                break;
            case "swimming":
                sport_name = "수영"
                break;
            case "golf":
                sport_name = "골프"
                break;
            case "tennis":
                sport_name = "테니스"
                break;
            case "badminton":
                sport_name = "배드민턴"
                break;
            case "table_Tennis":
                sport_name = "탁구"
                break;
            case "bowling":
                sport_name = "볼링"
                break;
            case "billiards":
                sport_name = "당구"
                break;
            case "hado":
                sport_name = "하도"
                break;
            case "other":
                sport_name = "기타추가"
                break;
            default:
                break;
        }
        return sport_name
    }

    const GetRecruitMethod = (recruit_method: any) => {
        switch (recruit_method) {
            case "atSpoweek":
                recruit_method = "스포위크에서 모집"
                break;
            case "fromOutside":
                recruit_method = "외부에서 모집"
                break;
            default:
                break;
        }
        return recruit_method;
    }

    const Getparticipants = (participants_information: any) => {
        switch (participants_information) {
            case "Individual":
                participants_information = "개인"
                break;
            case "Group":
                participants_information = "단체"
                break;
            default:
                break;
        }
        return participants_information
    }

    const GetParticipantfee = (participants_fee: any) => {
        switch (participants_fee) {
            case "free":
                participants_fee = "무료"
                break;
            case "withFee":
                participants_fee = "유료"
                break
            default:
                break;
        }
        return participants_fee
    }

    const Getswitchingawaiters = (switching_awaiters: any) => {
        switch (switching_awaiters) {
            case "Auto":
                switching_awaiters = "자동"
                break;
            case "Manual":
                switching_awaiters = "수동"
                break
            default:
                break;
        }
        return switching_awaiters
    }
    const getManageDeleteEvent = (page = 1, sizePerPage = 50) => {

        let start = startDate ? moment(startDate).format("YYY-MM-DD") : "";
        let end = endDate ? moment(endDate).format("YYYY-MM-DD") : "";

        ApiGet(`event/getEventManageFilterByAdmin?start_date=${start}&end_date=${end}&per_page=${sizePerPage}&page_number=${page}
            &event_information=${eventDefaultInfo.eventInformation}&search_term=${eventDefaultInfo.searchTerm}=&sport_name=${eventDefaultInfo.sportName}&event_status=${eventDefaultInfo.eventStatus}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setManageDeleteEventData(
                    res.data &&
                    res.data.eventRegistration &&
                    res.data.eventRegistration.map((eventDelete: any, index: any) => {
                        return {
                            id: eventDelete.id,
                            no_id: res.data.count - (page - 1) * sizePerPage - index,
                            region: eventDelete.region,
                            sports: GetSportName(eventDelete.sport_name),
                            writer: eventDelete.writer,
                            status: eventDelete.status,
                            event_name: eventDelete.event_name,
                            recruit_method: GetRecruitMethod(eventDelete.recruit_method),
                            date: eventDelete.event_date,
                            locations: eventDelete.location,
                            registered_date: eventDelete.register_date,
                            deadline: eventDelete.deadline_date,
                            participants_information: eventDelete.participants_information.map((participantDetails: any) => {
                                return {
                                    id: participantDetails.id,
                                    recuitement_division: Getparticipants(participantDetails.recuitement_division),
                                    participation_fee: GetParticipantfee(participantDetails.participants_fee),
                                    volume_of_recruitment: participantDetails.volume_recruitment,
                                    participants_waiting: participantDetails.participants,
                                    switching_awaiters: Getswitchingawaiters(participantDetails.switching_awaiters),
                                }
                            })
                        }
                    })
                )
                setExportManageDeleteEvent(
                    res.data &&
                    res.data.eventRegistration &&
                    res.data.eventRegistration.map((eventDelete: any, index: any) => {
                        return {
                            no_id: res.data.count - (page - 1) * sizePerPage - index,
                            region: eventDelete.region,
                            sports: GetSportName(eventDelete.sport_name),
                            writer: eventDelete.writer,
                            event_name: eventDelete.event_name,
                            recruit_method: GetRecruitMethod(eventDelete.recruit_method),
                            date: eventDelete.event_date,
                            location: eventDelete.location,
                            status: eventDelete.status,
                            deadline: eventDelete.deadline_date,
                            registered_date: eventDelete.register_date,
                            recuitement_division: eventDelete.participants_information.map((participantDetails: any) => Getparticipants(participantDetails.recuitement_division)),
                            participation_fee: eventDelete.participants_information.map((participantDetails: any) => GetParticipantfee(participantDetails.participants_fee)),
                            volume_of_recruitment: eventDelete.participants_information.map((participantDetails: any) => participantDetails.volume_recruitment),
                            participants_waiting: eventDelete.participants_information.map((participantDetails: any) => participantDetails.participants),
                            switching_awaiters: eventDelete.participants_information.map((participantDetails: any) => Getswitchingawaiters(participantDetails.switching_awaiters)),
                        };
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
        getManageDeleteEvent()
    }, [])

    const deleteManageEvent = () => {
        ApiPut('event/deleteEventManageByAdmin', {
            id: manageDeleteEventIdList.map((m: any) => m.id).join(","),
        })
            .then((res: any) => {
                getManageDeleteEvent()
            })
            .catch((error: any) => console.error(error));
    }

    const viewMore = () => {
        getManageDeleteEvent()
    }
    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = manageDeleteEventID.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                manageDeleteEventID.splice(index, 1);
            } else {
                manageDeleteEventID.push({ id: isSelect.id });
            }
            setManageDeleteEventIdList(manageDeleteEventID);
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => manageDeleteEventID.push({ id: x.id }));
                setManageDeleteEventIdList(manageDeleteEventID);
            } else {
                setManageDeleteEventIdList([]);
            }
        },
    };

    const selectOption = (label: string, dropDownName: string) => {
        let list: any = []
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
                    <p className="font-20-bold roboto color-01 pb-28">이벤트 삭제내역 관리</p>
                </div>
            </div>
            <div className="border-black mt-20"></div>
            <div className="search-section">
                <p className="title">이벤트 삭제내역 검색</p>
            </div>
            <div className="border"></div>
            <div className="d-flex search-sign-up-date">
                <div className="width d-flex">
                    <div className="date-of-registration-set">
                        <label className="">삭제일</label>
                    </div>
                    <div className="DatePicker-set-main">
                        <div className="DatePicker-set-input">
                            <DatePicker
                                id="startDate"
                                selected={startDate}
                                onChange={(startDate: Date | null) => setStartDate(startDate)}
                                dateFormat="yyyy.MM.dd"
                                placeholderText="YYYY.MM.DD"
                                className="DatePicker-set"
                                locale="ko"
                            ></DatePicker>
                        </div>
                        <div className="DatePicker-set-input">
                            <span className="datepicker-separator">-</span>
                            <DatePicker
                                id="endDate"
                                selected={endDate}
                                onChange={(endDate: Date | null) => setEndDate(endDate)}
                                dateFormat="yyyy.MM.dd"
                                placeholderText="YYYY.MM.DD"
                                className="DatePicker-set"
                                locale="ko"
                            ></DatePicker>
                        </div>
                    </div>
                </div>
                <div className="width d-flex">
                    <div className="date-of-registration-set ">
                        <label className="">검색</label>
                    </div>
                    <div className="position-relative selector-padding mj-selectdropDown search-dropdown">
                        {/* <select
                            className="selector-set minimal event-app-dropdwn"
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
                            value={eventDefaultInfo.searchTerm}
                            placeholder="입력해주세요."
                            type="text"
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
                <button className="Search-btn-set" onClick={viewMore}>
                    <span> 검색 </span>
                </button>
            </div>
            <div className="list-top-border"></div>
            <div className="Search-Results-row  search-results-ctn section-row">
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
                <div className="p-0">
                    <div className="table-width">
                        <ManageDeletedEventList
                            data={manageDeleteEventData}
                            getManageEvent={getManageDeleteEvent}
                            totalSize={totalSize}
                            selectRow={selectRow}
                        />
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className="button-table-exv">
                    <div className="memorial-hall-detail-title">
                        <button
                            className={
                                manageDeleteEventData.length === 0
                                    ? "delete-btn button-no-data"
                                    : "delete-btn"
                            }
                            onClick={() => {
                                deleteManageEvent()
                            }}
                        >
                            삭제하기
                        </button>
                        <CSVLink
                            data={exportManageDeleteEvent}
                            className={manageDeleteEventData.length === 0 ? "Download-Excel-File-btn font-weight-bold button-no-data " : "Download-Excel-File-btn font-weight-bold"}
                        >
                            엑셀 다운로드
                        </CSVLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageDeletedEvent
