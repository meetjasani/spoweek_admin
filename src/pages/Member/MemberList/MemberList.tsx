import React, { useEffect } from "react";
import { useHistory } from "react-router";
import RemotePagination from "../../../component/RemotePagination/RemotePagination";
import { memeberManagment } from "./MemberManagement";

interface Props {
    data: memeberManagment[];
    getMemberManagment: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
    userType: string;
}

const MemberList: React.FC<Props> = ({
    data,
    getMemberManagment,
    totalSize,
    selectRow,
    rowEvents,
    userType,
}) => {
    const history = useHistory();

    const EditMember = (id: any) => {
        history.push(`/member/member-register?id=${id}`);
    };


    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a
                className="action-link"
                onClick={() => {
                    EditMember(row.id);
                }}
            >
                수정
            </a>
        );
    };

    const textUnderline = (cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any) => {

        if (row.gender) {
            return (
                <h1 className="text-decoration">
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
            dataField: "edit_information",
            text: "정보수정",
            formatter: linkEditFollow,
        },
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getMemberManagment(pagenumber, sizeperpage);
    };

    return (
        <>
            <div className="member-list-table member-list ">
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
    );
};

export default MemberList;

