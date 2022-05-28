import DatePicker, { registerLocale } from "react-datepicker";
import ReactHtmlParser from "react-html-parser";
import ko from "date-fns/locale/ko";
import Buttons from '../../../component/Buttons/Buttons'
import './Notifiaction.css'
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import NotificationList from "./NotificationList";
import moment from "moment";
import { ApiGet, ApiPut } from "../../../helper/API/ApiData";
registerLocale("ko", ko);

export interface notificationManagment {
    id: string;
    no_id: string;
    title: string;
    content: string;
    registered_date: string;
}

const NotificationManagement = () => {
    const history = useHistory();

    const [IsDelete, setIsDelete] = useState(false);
    const [IsDeleteAccount, setIsDeleteAccount] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [totalSize, setTotalSize] = useState<number>(0);

    const [state, setState] = useState({
        userType: "",
        searchTerm: "",
        user_information: "",
    });

    const [notificationData, setNotificationData] = useState<
        notificationManagment[]
    >([]);

    const [notificationIDList, setNotificationIDList] = useState<any>([]);



    const getNotificationData = (page = 1, sizePerPage = 50) => {
        let start = startDate ? moment(startDate).format("YYYY-MM-DD") : "";
        let end = endDate ? moment(endDate).format("YYYY-MM-DD") : "";
        ApiGet(
            `general/getAllNoticeByAdmin?start_date=${start + ""}&end_date=${end + ""}&per_page=${sizePerPage}&page_number=${page}&search_term=${state.searchTerm}`
        ).then((res: any) => {            
            setTotalSize(res.data && res.data.count);
            setNotificationData(
                res.data &&
                res.data.notice &&
                res.data.notice.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page - 1) * sizePerPage - index,
                        title: x.title.length > 11 ? x.title.substr(0,10)+"..." : x.title,
                        // content: ReactHtmlParser(x?.content),
                        content: x?.content.length > 21 ? ReactHtmlParser(x?.content.substr(0,20)+"...") : ReactHtmlParser(x?.content),
                        registered_date: x.created_date,
                    }
                })
            )
        })
    };

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = notificationIDList.findIndex((item: any) => item.id === isSelect.id);
            if (index !== -1 && index !== undefined) {
                notificationIDList.splice(index, 1);
            } else {
                notificationIDList.push({ id: isSelect.id });
            }
            // setNotificationIDList(notificationIDList);
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => notificationIDList.push({ id: x.id }));
                // setNotificationIDList(notificationIDList);
            } else {
                setNotificationIDList([]);
            }
        },
    };

    const deleteNotification = () => {
        ApiPut('general/deleteNotice', {
            id: notificationIDList.map((m: any) => m.id).join(","),
        })
            .then((res) => {
                getNotificationData()
            })
    }

    useEffect(() => {
        getNotificationData();
    }, [])

    return (
        <>
            <div className="notification-list">

                <div className="main-heading">
                    <span className="main-header">공지사항 설정</span>
                    <div className="d-flex ml-auto register-member">
                        <div>
                            <Buttons
                                type=""
                                ButtonStyle="normalBtn"
                                onClick={() => {
                                        history.push("/basicsettings/notification-register")
                                }}
                            >
                                공지사항 등록
                            </Buttons>
                        </div>
                    </div>
                </div>
                <div className="border-black mt-20"></div>
                <div className="search-section">
                    <p className="title">공지사항 검색</p>
                </div>
                <div className="border"></div>

                <div className="d-flex search-sign-up-date">
                    <div className="d-flex">
                        <div className="date-of-registration-set">
                            <label className="">작성일</label>
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
                            {/* <span> - </span> */}
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
                    <div className="d-flex">
                        <div className="search-term-label ">
                            <label className="">검색어</label>
                        </div>
                        {/* <div className="position-relative selector-padding">
                        <select
                            className="selector-set minimal"
                            name="user_information"
                            onChange={(e: any) => {
                                setState({
                                    ...state,
                                    user_information: e.target.value,
                                })
                            }}
                        >
                            {memberInfo.map(({ value, label }) => (
                                <option value={value}>{label}</option>
                            ))}
                        </select>
                    </div> */}
                        <div className="search-term-input-padding">
                            <input
                                className="search-term-input-set"
                                name="searchTerm"
                                value={state.searchTerm}
                                placeholder="입력해주세요."
                                type="text"
                                onChange={(e: any) => {
                                    setState({
                                        ...state,
                                        searchTerm: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="border"></div>
                <div className="search-btn-container">
                    <button className="Search-btn-set" onClick={() => getNotificationData()}>
                        <span> 검색 </span>
                    </button>
                </div>
                <div className="list-top-border"></div>
                <div className="Search-Results-row">
                    <span> 검색 결과 </span>
                </div>
                <div className="border"></div>

                <div className="text-center custom-datatable notification-list-table">
                    <div className="p-0">
                        <div className="">
                            <NotificationList
                            data={notificationData}
                            getNotificationData={getNotificationData}
                            totalSize={totalSize}
                            selectRow={selectRow}
                        />
                        </div>
                    </div>
                    <div className="position-relative">
                        <div className="button-table-exv">
                            <div className="notification-detail-title">
                                <button className= {notificationData.length <= 0 ? "delete-btn-no-data" : "delete-btn"} onClick={() => { deleteNotification() }}>삭제하기</button>

                            </div>
                        </div>
                    </div>
                </div >





            </div>
        </>
    )
}

export default NotificationManagement