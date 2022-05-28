import RemotePagination from "../../../component/RemotePagination/RemotePagination";
import { memeberManageWithdrawal } from "./ManageWithdrawal";


interface Props {
    data: memeberManageWithdrawal[];
    getMemberWithdrawal: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
    userType: string;
}


const MemberWithdrawalList: React.FC<Props> = ({
    data,
    getMemberWithdrawal,
    totalSize,
    selectRow,
    rowEvents,
    userType
}
) => {


    const textUnderline = (cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any) => {

        if (row.gender) {
            return (
                <h1 className="text-decoration text-decoration-withdrawal">
                    {cell}
                </h1>
            );
        }
    }

    const textNameline = (cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any) => {

        if (row.name) {
            return (
                <h1 className="text-name-decoration">
                    {cell}
                </h1>
            );
        }
    }

    const columns = [
        {
            dataField: "no_id",
            text: "번호",
        },
        {
            dataField: "name",
            text: "이름",
            formatter: textNameline,
        },
        {
            dataField: "email",
            text: "이메일",
        },
        {
            dataField: "mobile",
            text: "휴대폰 번호",
        },
        userType === "General" ? {
            dataField: "gender",
            text: "성별",
            formatter: textUnderline,
        } : {
            dataField: "company_name",
            text: "회사명",
        },
        userType === "General" ? {
            dataField: "dob",
            text: "생년월일",
        } : {
            dataField: "department",
            text: "부서명",
        },
        userType === "General" ? {
            dataField: "affiliation",
            text: "소속",
        } : {
            dataField: "position",
            text: "직함",
        },
        {
            dataField: "interests",
            text: "관심분야",
        },
        {
            dataField: "sign_up",
            text: "가입일",
        },
        {
            dataField: "withdrawal_date",
            text: "탈퇴일",
        },
    ];


    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getMemberWithdrawal(pagenumber, sizeperpage);
    };

    return (
        <>
            <div className="member-list-table member-list">
                <RemotePagination
                    data={data}
                    columns={columns}
                    totalSize={totalSize}
                    onTableChange={(page, sizePerPage) =>
                        handleTableChange(page, sizePerPage)
                    }
                    pagesizedropdownflag={true}
                    selectRow={selectRow}
                    rowEvents={rowEvents}
                    expandRow={false}
                    pageName=""
                />
            </div>
        </>
    )
}

export default MemberWithdrawalList
