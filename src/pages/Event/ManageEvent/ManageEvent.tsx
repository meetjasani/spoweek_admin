import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "./ManageEvent.css";
import Buttons from "../../../component/Buttons/Buttons";
import ManageEventList from "./ManageEventList";
import { CSVLink } from "react-csv";
import moment from "moment";
import { ApiGet, ApiPut } from "../../../helper/API/ApiData";
import { Sports } from "../../../helper/Constant";
import DeleteEvent from "../../../modal/DeleteMember";
import { useHistory } from "react-router";
import Select from "react-select";
registerLocale("ko", ko);


export interface manageEvent {
  id: string;
  no_id: string;
  region: string;
  sports: string;
  writer: string;
  status: string;
  event_name: string;
  recruit_method: string;
  date: string;
  location: string;
  registered_date: string;
  deadline: string;
  participants_information: any;
}

let manageEventID: any = [];
const ManageWithdrawal = () => {

  const history = useHistory();

  const sports = Sports;
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [totalSize, setTotalSize] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("InProgress");
  const [manageEventData, setManageEventData] = useState<manageEvent[]>([]);
  const [exportManageEventData, setExportManageEventData] = useState<manageEvent[]>([]);
  const [manageEventIdList, setManageEventIdList] = useState<any>([]);
  const [isDeleteEventData, setIsDeleteEventData] = useState(false);
  const [selectRegion, setSelectRegion] = useState<any>([])

  const [eventDefaultInfo, setEventDefaultInfo] = useState({
    eventStatus: "",
    searchTerm: "",
    eventInformation: "",
    sportName: "",
    regionName: ""
  });

  useEffect(() => {
    eventDefaultInfo.eventInformation = eventInfo[0].value;
  }, [activeTab])

  useEffect(() => {
    setEventDefaultInfo({ ...eventDefaultInfo, regionName: selectRegion[0]?.value || "" })
  }, [selectRegion])

  const eventInfo = [
    { value: "all", label: "전체" },
    { value: "content", label: "내용" },
    { value: "writer", label: "작성자" },
  ];

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

  const viewMore = () => {
    getManageEvent();
  };

  useEffect(() => {
    eventDefaultInfo.eventStatus = eventStatus[0].value;
    eventDefaultInfo.eventInformation = eventInfo[0].value;
  }, []);

  const GetSportName = (sport_name: any) => {
    // let sport_name_ko = ""   
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

  const Getrecruitmethod = (recruit_method: any) => {
    switch (recruit_method) {
      case "atSpoweek":
        recruit_method = "스포위크"
        break;
      case "fromOutside":
        recruit_method = "외부에서 모집"
        break
      default:
        break;
    }
    return recruit_method
  }


  //[+] Get Manage Event Data
  // API:- http://localhost:5002/api/v1/event/getEventFilterByAdmin?start_date=&end_date=&per_page=10&page_number=1&lang=ko&event_information=all&search_term=test&region=&sport_name&event_status=InProgress

  const getManageEvent = (page = 1, sizePerPage = 50) => {
    let start = startDate ? moment(startDate).format("YYYY-MM-DD") : "";
    let end = endDate ? moment(endDate).format("YYYY-MM-DD") : "";

    ApiGet(
      `event/getEventFilterByAdmin?start_date=${start}&end_date=${end}&per_page=${sizePerPage}&page_number=${page}&event_information=${eventDefaultInfo.eventInformation
      }&search_term=${eventDefaultInfo.searchTerm}&region=${eventDefaultInfo.regionName}&sport_name=${eventDefaultInfo.sportName}&event_status=${eventDefaultInfo.eventStatus}`
    ).then((res: any) => {
      setTotalSize(res.data && res.data.count);
      setManageEventData(
        res.data &&
        res.data.eventRegistration &&
        res.data.eventRegistration.map((eventDetails: any, index: any) => {
          return {
            id: eventDetails.id,
            no_id: res.data.count - (page - 1) * sizePerPage - index,
            region: eventDetails.region,
            sports: GetSportName(eventDetails.sport_name),
            writer: eventDetails.writer,
            status: eventDetails.status,
            event_name: eventDetails.event_name,
            recruit_method: Getrecruitmethod(eventDetails.recruit_method),
            date: eventDetails.event_date,
            location: eventDetails.location,
            registered_date: eventDetails.register_date,
            deadline: eventDetails.deadline_date,
            participants_information: eventDetails.participants_information.map((participantDetails: any) => {
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
      setExportManageEventData(
        res.data &&
        res.data.eventRegistration &&
        res.data.eventRegistration.map((eventDetails: any, index: any) => {
          return {
            번호: res.data.count - (page - 1) * sizePerPage - index,
            지역: eventDetails.region,
            종목: GetSportName(eventDetails.sport_name),
            작성자: eventDetails.writer,
            이벤트명: eventDetails.event_name,
            모집방법: Getrecruitmethod(eventDetails.recruit_method),
            일시: eventDetails.event_date,
            장소: eventDetails.location,
            상태: eventDetails.status,
            마감일: eventDetails.deadline_date,
            등록일: eventDetails.register_date,
            // participants_no: eventDetails.participants_information.map((participantDetails: any, index: any) => index + 1),
            모집부문: eventDetails.participants_information.map((participantDetails: any) => Getparticipants(participantDetails.recuitement_division)),
            참가비: eventDetails.participants_information.map((participantDetails: any) => GetParticipantfee(participantDetails.participants_fee)),
            모집인원: eventDetails.participants_information.map((participantDetails: any) => participantDetails.volume_recruitment),
            참가자: eventDetails.participants_information.map((participantDetails: any) => participantDetails.participants),
            스위칭대기자: eventDetails.participants_information.map((participantDetails: any) => Getswitchingawaiters(participantDetails.switching_awaiters)),
          };
        })
      )
    }).catch((error: any) => console.error(error));
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
  // [-] Delete Event Data Modal
  const deleteEventDataModal = () => {
    if (manageEventIdList.length > 0) {
      setIsDeleteEventData(true);
    }
  }

  //[-] Delete Event Data
  //API :- http://localhost:5002/api/v1/event/deleteEventByAdmin?lang=en

  const deleteEventData = () => {
    ApiPut('event/deleteEventByAdmin', {
      id: manageEventIdList.map((m: any) => m.id).join(","),
    })
      .then((res: any) => {
        setIsDeleteEventData(false);
        setActiveTab(activeTab)
        getManageEvent()
      })
      .catch((error: any) => console.error(error));
  }

  const TabChange = (TabValue: any) => {
    eventDefaultInfo.eventStatus = TabValue;
    getManageEvent();
    setActiveTab(TabValue);
  };

  useEffect(() => {
    getManageEvent();

  }, [eventDefaultInfo.eventStatus]);

  const selectRow = {
    mode: "checkbox",
    onSelect: (isSelect: any, rows: any, e: any) => {
      const index = manageEventID.findIndex(
        (item: any) => item.id === isSelect.id
      );
      if (index !== -1 && index !== undefined) {
        manageEventID.splice(index, 1);
      } else {
        manageEventID.push({ id: isSelect.id });
      }
      setManageEventIdList(manageEventID);
    },
    onSelectAll: (isSelect: any, rows: any, e: any) => {
      if (isSelect === true) {
        rows.map((x: any) => manageEventID.push({ id: x.id }));
        setManageEventIdList(manageEventID);
      } else {
        setManageEventIdList([]);
      }
    },
  };

  const selectOption = (label: string, dropDownName: string) => {
    let list: any = []
    if (dropDownName === "event_information") {
      list = eventInfo
    }
    if (dropDownName === "region") {
      list = selectRegion
    }
    if (dropDownName === "sport") {
      list = sportsDropDown
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
          <p className="font-20-bold roboto color-01">이벤트 관리</p>
        </div>
        <div className="d-flex ml-auto register-member">
          <div>
            <Buttons
              type=""
              ButtonStyle="normalBtn"
              onClick={() => {
                history.push("/event/register-event")
              }}
            >
              이벤트 등록
            </Buttons>
          </div>
        </div>
      </div>
      <div className="border-black mt-20"></div>
      <div className="search-section">
        <p className="title">이벤트 검색</p>
      </div>
      <div className="border"></div>
      <div className="d-flex search-sign-up-date">
        <div className="width d-flex">
          <div className="date-of-registration-set">
            <label className="">등록일</label>
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
                autoComplete="off"
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
              className="minimal"
              name="event_information"
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
      <div className="Search-Results-row search-results-ctn mj-selectdropDown">
        <span> 검색 결과 </span>
        <div>
          <div className="re-Search-results-box">
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
            <Select
              id="region"
              className="minimal mr-10"
              name="region"
              options={selectRegion}
              // defaultValue={selectRegion[2] || { value: "", lable: "" }}
              value={selectOption(eventDefaultInfo.regionName, "region")}
              onChange={(e: any) => {
                setEventDefaultInfo({ ...eventDefaultInfo, regionName: e.value });
              }}
            />

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
            <Select
              id="sport"
              className="minimal"
              name="sport"
              options={sportsDropDown}
              defaultValue={sportsDropDown[0]}
              value={selectOption(eventDefaultInfo.sportName, "sport")}
              onChange={(e: any) => {
                setEventDefaultInfo({ ...eventDefaultInfo, sportName: e.value });
              }}
            />
          </div>
        </div>
      </div>
      <div className="border"></div>
      {/* <div className={activeTab === "InProgress" ? "text-center custom-datatable member-list-table manage-event-progress" : "text-center custom-datatable member-list-table manage-event-ended"}> */}
      <div className="text-center custom-datatable member-list-table manage-event-progress-end">
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

        <div className="p-0">
          <div className="table-width">
            <ManageEventList
              data={manageEventData}
              getManageEvent={getManageEvent}
              totalSize={totalSize}
              selectRow={selectRow}
            />
          </div>
        </div>
        <div className="position-relative">
          <div className="button-table-exv">
            <div className="memorial-hall-detail-title">
              <button
                className={
                  manageEventData.length === 0
                    ? "delete-btn button-no-data"
                    : "delete-btn"
                }
                onClick={() => {
                  deleteEventDataModal()
                }}
              >
                삭제하기
              </button>
              <CSVLink
                data={exportManageEventData}
                className={manageEventData.length === 0 ? "Download-Excel-File-btn font-weight-bold button-no-data " : "Download-Excel-File-btn font-weight-bold"}
              >
                엑셀 다운로드
              </CSVLink>
            </div>
          </div>
        </div>
      </div>
      {isDeleteEventData && <DeleteEvent show={isDeleteEventData} onHide={() => setIsDeleteEventData(false)} TerminatedMemberModal={deleteEventData} />}
    </>
  );
};

export default ManageWithdrawal;
