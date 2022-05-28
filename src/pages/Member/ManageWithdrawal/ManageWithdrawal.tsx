import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import moment from "moment";
import { ApiGet, ApiPut } from "../../../helper/API/ApiData";
import "../MemberList/MemberList.css";
import MemberWithdrawalList from "./MemberWithdrawalList";
import DeleteAccount from "../../../modal/DeleteAccount";
import Select from "react-select";
import { phoneNumberMasking } from '../../../helper/util';
registerLocale("ko", ko);

export interface memeberManageWithdrawal {
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
    withdrawal_date: Date;
    user_type: string;
    user_type_ko: string;
    company_name: string;
    department: string;
    position: string;
}

let memberWithdrawalID: any = [];
const ManageWithdrawal = () => {

    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [totalSize, setTotalSize] = useState<number>(0);
    const [activeTab, setActiveTab] = useState("General");
    const [memeberManageWithdrawalData, setMemeberManageWithdrawalData] =
        useState<memeberManageWithdrawal[]>([]);
    const [memberWithdrawalIdList, setMemberWithdrawalIdList] = useState<any>([]);
    const [IsDeleteAccount, setIsDeleteAccount] = useState(false);


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
    ];

    const viewMore = () => {
        getMemberWithdrawal();
    };

    useEffect(() => {
        state.userType = memberType[0].value;
        state.user_information = memberInfo[0].value;
    }, []);

    // const maskingMobileNumber = (mobileNumber: string) => {
    //     if (mobileNumber.length === 10) {
    //         return mobileNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
    //     }

    //     if (mobileNumber.length === 11) {
    //         return mobileNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1.$2.$3");
    //     }
    // };
    //[+] Get Withdrawal Member Data
    const getMemberWithdrawal = (page = 1, sizePerPage = 50) => {
        let start = startDate ? moment(startDate).format("YYYY-MM-DD") : "";
        let end = endDate ? moment(endDate).format("YYYY-MM-DD") : "";
        ApiGet(
            `admin/getTerminatedUsers?start_date=${start}&end_date=${end}&per_page=${sizePerPage}&page_number=${page}&user_information=${state.user_information
            }&search_term=${state.searchTerm}&user_type=${state.userType}`
        ).then((res: any) => {
            setTotalSize(res.data && res.data.count);
            setMemeberManageWithdrawalData(
                res.data &&
                res.data.users &&
                res.data.users.map((memberData: any, index: any) => {
                    return {
                        id: memberData.id,
                        no_id: res.data.count - (page - 1) * sizePerPage - index,
                        name: memberData.name,
                        email: memberData.email,
                        mobile: phoneNumberMasking(memberData.phone_number, "."),
                        gender: memberData.gender,
                        dob: memberData.dob,
                        affiliation: memberData.affiliation,
                        interests: memberData.interests,
                        sign_up: memberData.created_at,
                        withdrawal_date: memberData.deleted_at,
                        company_name: memberData.company_name,
                        department: memberData.department,
                        position: memberData.position,
                    };
                })
            );
        }).catch((error: any) => console.error(error));
    };

    //[+] Delete Withdrawal Member Data
    // const DeleteAccountModal = () => {
    //     if (memberWithdrawalIdList.length > 0) {
    //         setIsDeleteAccount(true)
    //     }
    // }
    const DeleteAccounts = () => {
        ApiPut('admin/auth/deleteUser', {
            id: memberWithdrawalIdList.map((m: any) => m.id).join(","),
        })
            .then((res: any) => {
                setIsDeleteAccount(false);
                setActiveTab(activeTab)
                getMemberWithdrawal()
            })
            .catch((error: any) => console.error(error));
    }

    const TabChange = (TabValue: any) => {
        state.userType = TabValue;
        getMemberWithdrawal();
        setActiveTab(TabValue);
    };

    useEffect(() => {
        getMemberWithdrawal();
    }, []);

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = memberWithdrawalID.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                memberWithdrawalID.splice(index, 1);
            } else {
                memberWithdrawalID.push({ id: isSelect.id });
            }
            setMemberWithdrawalIdList(memberWithdrawalID);
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => memberWithdrawalID.push({ id: x.id }));
                setMemberWithdrawalIdList(memberWithdrawalID);
            } else {
                setMemberWithdrawalIdList([]);
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
            <div className="main-heading-wrap member-list manage-withdrawal-title-ctn">
                <div>
                    <p className="font-20-bold roboto color-01">회원 리스트 관리</p>
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
                        <label className="">탈퇴일</label>
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
                            // className="selector-set minimal"
                            className={`${state.user_information === "" ? "selector-set" : "selector-set-grays"} minimal form-custom-select`}
                            name="user_information"
                            onChange={(e: any) => {
                                setState({
                                    ...state,
                                    user_information: e.target.value,
                                });
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
            <div className={activeTab === "General" ? 'text-center custom-datatable member-list-table withdraw-member-genral-profile' : 'text-center custom-datatable member-list-table withdraw-member-bussiness-profile'}>
                {/* <div className="text-center custom-datatable member-list-table"> */}
                <div className="tab-main">
                    <span
                        className={
                            activeTab === "General" ? "pl-3 pr-3 active " : "pl-3 pr-3 "
                        }
                        onClick={() => TabChange("General")}
                    >
                        일반회원
                    </span>
                    <span className="tab-line"></span>
                    <span
                        className={
                            activeTab === "Business" ? "pl-3 pr-3 active" : "pl-3 pr-3"
                        }
                        onClick={() => TabChange("Business")}
                    >
                        기업회원
                    </span>
                </div>

                <div className="p-0">
                    <div className="table-width">
                        <MemberWithdrawalList
                            data={memeberManageWithdrawalData}
                            getMemberWithdrawal={getMemberWithdrawal}
                            totalSize={totalSize}
                            selectRow={selectRow}
                            userType={state.userType}
                        />
                    </div>
                </div>
                <div className="position-relative">
                    <div className="button-table-exv">
                        <div className="memorial-hall-detail-title">
                            <button
                                className={
                                    memeberManageWithdrawalData.length === 0
                                        ? "delete-btn button-no-data "
                                        : "delete-btn"
                                }
                                onClick={() => {
                                    // DeleteAccountModal();
                                    DeleteAccounts();
                                }}
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {IsDeleteAccount && <DeleteAccount show={IsDeleteAccount} onHide={() => setIsDeleteAccount(false)} DeleteAccounts={DeleteAccounts} />} */}

        </>
    );
};

export default ManageWithdrawal;
