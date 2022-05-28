import DatePicker, { registerLocale } from "react-datepicker";
import ReactHtmlParser from "react-html-parser";
import ko from "date-fns/locale/ko";
import Buttons from '../../../component/Buttons/Buttons'
import './Faq.css'
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import moment from "moment";
import { ApiGet, ApiPut } from "../../../helper/API/ApiData";
import FaqList from "./FaqList";

export interface faqManagment {
    id: string;
    no_id: string;
    question: string;
    answer: string;
    view_count: string;
}

registerLocale("ko", ko);
const FaqManagement = () => {
    const history = useHistory();
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [totalSize, setTotalSize] = useState<number>(0);
    const [state, setState] = useState({
        userType: "",
        searchTerm: "",
        user_information: "",
    });
    const [faqData, setFaqData] = useState<
        faqManagment[]
    >([]);
    const [faqDList, setFaqIDList] = useState<any>([]);

    const getFaqData = (page = 1, sizePerPage = 50) => {
        let start = startDate ? moment(startDate).format("YYYY-MM-DD") : "";
        let end = endDate ? moment(endDate).format("YYYY-MM-DD") : "";
        ApiGet(
            `general/getAllFAQByAdmin?start_date=${start + ""}&end_date=${end + ""}&per_page=${sizePerPage}&page_number=${page}&search_term=${state.searchTerm}`
        ).then((res: any) => {
            
            setTotalSize(res.data && res.data.count);
            setFaqData(
                res.data &&
                res.data.faq &&
                res.data.faq.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page - 1) * sizePerPage - index,
                        // question: x.question,
                        question: x.question.length > 11 ? x.question.substr(0,10)+"..." : x.question,                        
                        //answer: ReactHtmlParser("<div class='ck-content'>" + x?.answer + "</div>"),
                        answer: x?.answer.length > 21 ? ReactHtmlParser("<div class='ck-content'>" + x?.answer.substr(0,20)+"..." + "</div>") : ReactHtmlParser("<div class='ck-content'>" + x?.answer + "</div>"),
                        view_count: x.view_count,
                    }
                })
            )
        })
    };

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = faqDList.findIndex((item: any) => item.id === isSelect.id);
            if (index !== -1 && index !== undefined) {
                faqDList.splice(index, 1);
            } else {
                faqDList.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => faqDList.push({ id: x.id }));
            } else {
                setFaqIDList([]);
            }
        },
    };

    const deleteNotification = () => {
        ApiPut('general/deleteFAQ', {
            id: faqDList.map((m: any) => m.id).join(","),
        })
            .then((res) => {
                getFaqData()
            })
    }

    useEffect(() => {
        getFaqData();
    }, [])

    return (
        <>
            <div className="faq-list">
                <div className="main-heading">
                    <span className="main-header">자주 묻는 질문 설정</span>
                    <div className="d-flex ml-auto register-member">
                        <div>
                            <Buttons
                                type=""
                                ButtonStyle="normalBtn"
                                onClick={() => {
                                    history.push("/basicsettings/FAQ-register")
                                }}
                            >
                                자주 묻는 질문 등록
                            </Buttons>
                        </div>
                    </div>
                </div>
                <div className="border-black mt-20"></div>
                <div className="search-section">
                    <p className="title">자주 묻는 질문 검색</p>
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
                    <button className="Search-btn-set" onClick={() => getFaqData()}>
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
                            <FaqList
                                data={faqData}
                                getNotificationData={getFaqData}
                                totalSize={totalSize}
                                selectRow={selectRow}
                            />
                        </div>
                    </div>
                    <div className="position-relative">
                        <div className="button-table-exv">
                            <div className="notification-detail-title">
                                <button className={faqData.length <= 0 ? "delete-btn-no-data" : "delete-btn"} onClick={() => { deleteNotification() }}>삭제하기</button>

                            </div>
                        </div>
                    </div>
                </div >


            </div>
        </>
    )
}

export default FaqManagement
