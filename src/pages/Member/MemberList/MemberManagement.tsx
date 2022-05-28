import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import moment from "moment";
import MemberList from "./MemberList";
import { useHistory } from "react-router";
import { CSVLink } from "react-csv";
import Buttons from "../../../component/Buttons/Buttons";
import './MemberList.css';
import { ApiGet, ApiPut } from "../../../helper/API/ApiData";
import DeleteMember from "../../../modal/DeleteMember";
import DeleteAccount from "../../../modal/DeleteAccount";
import Select from "react-select";
import { phoneNumberMasking } from '../../../helper/util';
registerLocale("ko", ko);

export interface memeberManagment {
    id: string;
    no_id: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    affiliation: string;
    interests: string;
    sign_up: Date;
    user_type: string;
    user_type_ko: string;
}
let memberID: any = [];
const MemberManagement = () => {
    const history = useHistory();

    const [IsDelete, setIsDelete] = useState(false);
    const [IsDeleteAccount, setIsDeleteAccount] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [totalSize, setTotalSize] = useState<number>(0);
    const [memeberManagment, setMemeberManagmentData] = useState<memeberManagment[]>([]);
    const [exportMemeberManagment, setExportMemeberManagmentData] = useState<memeberManagment[]>([]);
    const [memeberIDList, setMemeberIDList] = useState<any>([]);
    const [activeTab, setActiveTab] = useState("General");


    const [state, setState] = useState({
        userType: "",
        searchTerm: "",
        user_information: "",
    });

    const memberInfo = [
        { value: "all", label: "전체" },
        { value: "name", label: "이름" },
        { value: "general", label: "일반 회원" },
        { value: "business", label: "기업 회원" },
    ];
    const memberType = [
        { value: "General", label: "일반회원" },
        { value: "Business", label: "기업회원" },
    ]
    const viewMore = () => {
        getMemberManagment();
    };
    useEffect(() => {
        state.userType = memberType[0].value;
    }, [])
    useEffect(() => {
        state.user_information = memberInfo[0].value;
    }, []);

    // const maskingMobileNumber = (mobileNumber: any) => {
    //     return mobileNumber.toString().replaceAll("-", ".");
    // }

    const getMemberManagment = (page = 1, sizePerPage = 50) => {
        let start = startDate ? moment(startDate).format("YYYY-MM-DD") : "";
        let end = endDate ? moment(endDate).format("YYYY-MM-DD") : "";
        ApiGet(
            `admin/getFilteredUser?start_date=${start + ""
            }&end_date=${end + ""
            }&per_page=${sizePerPage}&page_number=${page}&user_information=${state.user_information
            }&search_term=${state.searchTerm}&user_type=${state.userType}`
        ).then((res: any) => {
            setTotalSize(res.data && res.data.count);
            setMemeberManagmentData(
                res.data &&
                res.data.users &&
                res.data.users.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page - 1) * sizePerPage - index,
                        name: x.name,
                        email: x.email,
                        mobile: phoneNumberMasking(x.phone_number,"."),
                        gender: x.gender,
                        dob: x.dob,
                        affiliation: x.affiliation,
                        interests: x.interests,
                        sign_up: x.created_at,
                        company_name: x.company_name,
                        department: x.department,
                        position: x.position
                    }
                })
            )
            setExportMemeberManagmentData(
                res.data &&
                res.data.users &&
                res.data.users.map((x: any, index: any) => {
                    return {
                        no_id: res.data.count - (page - 1) * sizePerPage - index,
                        name: x.name,
                        email: x.email,
                        mobile: x.phone_number,
                        gender: x.gender,
                        dob: x.dob,
                        affiliation: x.affiliation,
                        interests: x.interests,
                        sign_up: x.created_at,
                        company_name: x.company_name,
                        department: x.department,
                        position: x.position
                    };
                })
            )
        })
    };

    // Delete Member
    const TerminatedMemberModal = () => {
        if (memeberIDList.length > 0) {
            setIsDelete(true)
        }
    }
    const TerminatedMember = () => {
        if (memeberIDList.length > 0) {
            ApiPut(`admin/auth/terminateUser`, {
                id: memeberIDList.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getMemberManagment();
                setIsDelete(false)
            })
        }
    }

    // Delete DeleteAccount
    const DeleteAccountModal = () => {
        if (memeberIDList.length > 0) {
            setIsDeleteAccount(true)
        }
    }
    const DeleteAccounts = () => {
        ApiPut('admin/auth/deleteUser', {
            id: memeberIDList.map((m: any) => m.id).join(","),
        })
            .then((res) => {
                setIsDeleteAccount(false);
                setActiveTab(activeTab)
                getMemberManagment()
                history.push("/member/member-list");
            })
    }

    const TabChange = (TabValue: any) => {
        state.userType = TabValue;
        getMemberManagment();
        setActiveTab(TabValue);
    };

    useEffect(() => {
        getMemberManagment();
    }, []);

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = memberID.findIndex((item: any) => item.id === isSelect.id);
            if (index !== -1 && index !== undefined) {
                memberID.splice(index, 1);
            } else {
                memberID.push({ id: isSelect.id });
            }
            setMemeberIDList(memberID);
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => memberID.push({ id: x.id }));
                setMemeberIDList(memberID);
            } else {
                setMemeberIDList([]);
            }
        },
    };

    const selectOption = (label: string, dropDownName: string) => {
        let list: any = []
        if (dropDownName === "user") {
            list = memberInfo
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
                    <p className="font-20-bold roboto color-01">회원 리스트 관리</p>
                </div>
                <div className="d-flex ml-auto register-member">
                    <div>
                        <Buttons
                            type=""
                            ButtonStyle="normalBtn"
                            onClick={() => {
                                history.push("/member/member-register");
                            }}
                        >
                            회원 등록
                        </Buttons>
                    </div>
                </div>
            </div>
            <div className="border-black mt-20"></div>
            <div className="search-section">
                <p className="title">회원 검색</p>
            </div>
            <div className="border"></div>
            <div className="d-flex search-sign-up-date">
                <div className="width d-flex">
                    <div className="date-of-registration-set">
                        <label className="">가입일</label>
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
                <div className="width d-flex">
                    <div className="date-of-registration-set ">
                        <label className="">검색</label>
                    </div>
                    <div className="position-relative selector-padding mj-selectdropDown search-dropdown">
                        {/* <select
                            // className="selector-set minimal event-app-dropdwn"
                            className={`${state.user_information === "" ? "selector-set" : "selector-set-grays"} minimal form-custom-select`}
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
                        </select> */}
                        <Select
                            id="markating_info"
                            name="user"
                            className="minimal"

                            options={memberInfo}
                            defaultValue={memberInfo[0]}
                            value={selectOption(state.user_information, "markating")}
                            onChange={(e: any) => {
                                setState({ ...state, user_information: e.value });
                            }}
                        />
                        {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}

                    </div>
                    <div className="Please-enter-input-set-padding">
                        <input
                            className="Please-enter-input-set color-11 custom-placeholder"
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
                <button className="Search-btn-set" onClick={viewMore}>
                    <span> 검색 </span>
                </button>
            </div>
            <div className="list-top-border"></div>
            <div className="Search-Results-row">
                <span> 검색 결과 </span>
            </div>
            <div className="border"></div>
            <div className={activeTab === "General" ? "text-center custom-datatable member-list-table setting-member-genrel-member" : "text-center custom-datatable member-list-table setting-member-bussiness-member"}>
                {/* <div className="text-center custom-datatable member-list-table "> */}
                <div className="tab-main">
                    <span
                        className={activeTab === "General" ? "pl-3 pr-3 active " : "pl-3 pr-3"}
                        onClick={() => TabChange("General")}
                    >
                        일반회원
                    </span>
                    <span className="tab-line"></span>
                    <span
                        className={activeTab === "Business" ? "pl-3 pr-3 active" : "pl-3 pr-3"}
                        onClick={() => TabChange("Business")}
                    >
                        기업회원
                    </span>
                </div>

                <div className="p-0">
                    <div className="table-width">
                        <MemberList
                            data={memeberManagment}
                            getMemberManagment={getMemberManagment}
                            totalSize={totalSize}
                            selectRow={selectRow}
                            userType={state.userType}
                        />
                    </div>
                </div>
                <div className="position-relative">
                    <div className="button-table-exv">
                        <div className="memorial-hall-detail-title">
                            <button className={memeberManagment.length === 0 ? "delete-btn button-no-data " : "delete-btn"} onClick={() => { TerminatedMemberModal() }}>삭제하기</button>
                            <button className={memeberManagment.length === 0 ? "delete-account-btn button-no-data " : "delete-account-btn"} onClick={() => { DeleteAccountModal() }}>탈퇴처리</button>
                            <CSVLink
                                data={exportMemeberManagment}
                                className={memeberManagment.length === 0 ? "Download-Excel-File-btn font-weight-bold button-no-data " : "Download-Excel-File-btn font-weight-bold"}
                            >
                                엑셀 다운로드
                            </CSVLink>
                        </div>
                    </div>
                </div>
            </div >
            {IsDelete && <DeleteMember show={IsDelete} onHide={() => setIsDelete(false)} TerminatedMemberModal={TerminatedMember} />}
            {IsDeleteAccount && <DeleteAccount show={IsDeleteAccount} onHide={() => setIsDeleteAccount(false)} DeleteAccounts={DeleteAccounts} />}
        </>
    );
};

export default MemberManagement;
