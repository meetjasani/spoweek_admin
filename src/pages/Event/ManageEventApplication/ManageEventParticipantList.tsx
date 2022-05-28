
import { useEffect, useState } from "react";
import RemotePagination from "../../../component/RemotePagination/RemotePagination";
import { useHistory } from "react-router";
import { arrayTableSubData, arrayTableData, exportExcel, phoneNumberMasking } from "../../../helper/util";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";

interface Props {
    data: any;
    getManageEvent: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
    eventstatus: string;
    event_id: string | undefined;
    manageOperationTableData: any;
    event_name: any;
}

const ManageEventParticipantList: React.FC<Props> = ({
    data,
    getManageEvent,
    totalSize,
    selectRow,
    rowEvents,
    event_id,
    eventstatus,
    manageOperationTableData,
    event_name
    // expandRow
}) => {
    const history = useHistory();
    let column: any[] = [];

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any,
    ) => {
        return (
            <a
                className="action-link"
                onClick={() => {
                    // const eventname = e_name?.e_name
                    // console.log("e", event_name);
                    // console.log("row", row);
                    history.push(`/event/participant-view?id=${row.keyId}&event_id=${event_id}&ename=${event_name}`);
                }}
            >
                {row.is_defination_by ? "보기" : null}
            </a>

        );
    };

    let expandColumn: any = [];
    if (eventstatus != "CanceledParticipation") {
        expandColumn = [
            {
                dataField: "no_id",
                text: "번호",
            },
            {
                dataField: "name",
                text: "신청자",
                formatter: tdValuename
            },
            {
                dataField: "applied_date",
                text: "신청일",
                formatter: tdValueapplied_date
            },
            {
                dataField: "participant_applicant",
                text: "구분",
                formatter: tdValueparticipantapplicant
            },
            {
                dataField: "division",
                text: "부문",
                formatter: tdValuedivision
            },
            {
                dataField: "name_of_group",
                text: "단체명",
                formatter: tdValuenameofgroup
            },
            {
                dataField: "date_Of_birth",
                text: "생년월일",
                formatter: tdValuedateOfbirth
            },
            {
                dataField: "gender",
                text: "성별",
                formatter: tdValuegender
            },
            {
                dataField: "affiliation",
                text: "소속",
                formatter: tdValueAffiliation
            },
            {
                dataField: "mobile_no",
                text: "핸드폰 번호",
                formatter: tdValuemobile
            },
            {
                dataField: "status",
                text: "참가",
                formatter: tdValuestatus
            },

            {
                dataField: "attendance",
                text: "출석",
                formatter: tdValueattendance
            },

            {
                dataField: "COVID_19_symptoms",
                text: "코로나 증상유무",
                formatter: tdValueCOVID_19_symptoms
            },

            {
                dataField: "vaccination",
                text: "접종",
                formatter: tdValuevaccination
            },

            {
                dataField: "temperature",
                text: "체온",
                formatter: tdValuetemperature
            },
            {
                dataField: "View",
                text: "보기",
                formatter: linkEditFollow,
            },
            {
                dataField: "_blank",
                text: "",
            },
            {
                dataField: "blank",
                text: "",
            },

        ];
    } else {
        expandColumn = [
            {
                dataField: "no_id",
                text: "번호",
            },
            {
                dataField: "name",
                text: "신청자",
                formatter: tdValuename
            },
            {
                dataField: "applied_date",
                text: "신청일",
                formatter: tdValueapplied_date
            },
            {
                dataField: "participant_applicant",
                text: "구분",
                formatter: tdValueparticipantapplicant
            },
            {
                dataField: "division",
                text: "부문",
                formatter: tdValuedivision
            },
            {
                dataField: "name_of_group",
                text: "단체명",
                formatter: tdValuenameofgroup
            },
            {
                dataField: "date_Of_birth",
                text: "생년월일",
                formatter: tdValuedateOfbirth
            },
            {
                dataField: "gender",
                text: "성별",
                formatter: tdValuegender
            },
            {
                dataField: "affiliation",
                text: "소속",
                formatter: tdValueAffiliation
            },
            {
                dataField: "mobile_no",
                text: "핸드폰 번호",
            },
            eventstatus === "CanceledParticipation" &&
            {
                dataField: "cancle_application_reason",
                text: "취소사유",
            },
            eventstatus != "CanceledParticipation" && {
                dataField: "status",
                text: "참가",
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "attendance",
                text: "출석",
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "symptoms",
                text: "코로나 증상유무",
                formatter: tdValueCOVID_19_symptoms
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "vaccination",
                text: "접종",
                formatter: tdValuevaccination
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "temperature",
                text: "체온",
                formatter: tdValuetemperature
            },
            {
                dataField: "View",
                text: "보기",
                formatter: linkEditFollow,
            },

        ];
    }

    function tdValuename(cell: any, row: any) {
        return row?.name ? row?.name : "-"
    }
    function tdValueapplied_date(cell: any, row: any) {
        return row?.applied_date ? row?.applied_date : "-"
    }
    function tdValueparticipantapplicant(cell: any, row: any) {
        return row?.participant_applicant ? `${row?.participant_division_to_recruit}/${row?.participant_applicant}` : "-"
    }
    function tdValuedivision(cell: any, row: any) {
        return row?.division ? row?.division : "-"
    }
    function tdValuenameofgroup(cell: any, row: any) {
        return row?.name_of_group ? row?.name_of_group : "-"
    }
    function tdValuedateOfbirth(cell: any, row: any) {
        return row?.date_Of_birth ? row?.date_Of_birth : "-"
    }
    function tdValuegender(cell: any, row: any) {
        return row?.gender ? row?.gender : "-"
    }
    function tdValueAffiliation(cell: any, row: any) {
        return row?.affiliation ? row?.affiliation : "-"
    }
    function tdValuemobile(cell: any, row: any) {
        return row?.mobile_no ? phoneNumberMasking(row?.mobile_no, '-') : "-"
    }
    function tdValuestatus(cell: any, row: any) {
        return row?.status ? row?.status : "-"
    }
    function tdValueattendance(cell: any, row: any) {
        return row?.attendance ? row?.attendance : "-"
    }
    function tdValueCOVID_19_symptoms(cell: any, row: any) {
        return row?.COVID_19_symptoms ? row?.COVID_19_symptoms : "-"
    }
    function tdValuevaccination(cell: any, row: any) {
        return row?.vaccination ? row?.vaccination : "-"
    }
    function tdValuetemperature(cell: any, row: any) {
        return row?.temperature ? row?.temperature : "-"
    }


    const expandRow = {

        renderer: ({ keyId }: any) => (
            <div className="manage-operation-minitable manage-event-participent pm-manageopration-minitable">
                <BootstrapTable
                    remote
                    keyField="keyId"
                    data={arrayTableSubData(manageOperationTableData, keyId)}
                    columns={expandColumn}
                    // expandRow={expandRow}
                    selectRow={selectRow}
                    filter={filterFactory()}
                />
            </div>
        ),

        showExpandColumn: true,
        expandColumnPosition: 'right',
        // expandColumnRenderer: (expanded: any) => {
        //     if (expanded) {
        //         return (
        //             <div className="row-expanded"></div>
        //         );
        //     }
        //     return (
        //         <div className="row-collapsed"></div>
        //     );
        // }
        expandColumnRenderer: (expandedColumn: any) => {
            if (expandedColumn.expanded) {
                return (
                    <div className="row-expanded"></div>
                );
            }
            return (
                <div className="row-collapsed"></div>
            );
        }
    };

    // <BootstrapTable
    //     remote
    //     keyField="user_id"
    //     data={arrayTableData(manageOperationTableData)}
    //     columns={column}
    //     expandRow={expandRow}
    //     selectRow={selectRow}
    //     filter={filterFactory()}
    // // pagination={paginationFactory(options)}
    // />
    // const expandRow12 = {
    //     renderer: (user_id: any) => (
    //         <div className="collapsable-table">

    //             <table >
    //                 <thead>
    //                     <tr>
    //                         <th>구분</th>
    //                         <th>참가비</th>
    //                         <th>모집인원</th>
    //                         <th>참가/대기</th>
    //                         <th>대기전환</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {
    //                         user_id.participants_information && user_id.participants_information.map((participantDetails: any) => (
    //                             <tr>
    //                                 <td>{participantDetails.recuitement_division}</td>
    //                                 <td>{participantDetails.participation_fee}</td>
    //                                 <td>{participantDetails.volume_of_recruitment}</td>
    //                                 <td>{participantDetails.participants_waiting}</td>
    //                                 <td>{participantDetails.switching_awaiters}</td>
    //                             </tr>
    //                         ))
    //                     }
    //                 </tbody>
    //             </table>
    //         </div>
    //     ),
    //     showExpandColumn: true,
    //     expandColumnPosition: 'right',
    //     expandHeaderColumnRenderer: (expandedColumn: any) => {
    //         if (expandedColumn.isAnyExpands) {
    //             return <b></b>;
    //         }
    //         return <b></b>;
    //     },
    //     expandColumnRenderer: (expandedColumn: any) => {
    //         if (expandedColumn.expanded) {
    //             return (
    //                 <div className="row-expanded"></div>
    //             );
    //         }
    //         return (
    //             <div className="row-collapsed"></div>
    //         );
    //     }

    // };

    if (eventstatus != "CanceledParticipation") {
        column = [
            {
                dataField: "no_id",
                text: "번호",
            },
            {
                dataField: "name",
                text: "신청자",
                formatter: tdValuename
            },
            {
                dataField: "applied_date",
                text: "신청일",
                formatter: tdValueapplied_date
            },
            {
                dataField: "participant_applicant",
                text: "구분",
                formatter: tdValueparticipantapplicant
            },
            {
                dataField: "division",
                text: "부문",
                formatter: tdValuedivision
            },
            {
                dataField: "name_of_group",
                text: "단체명",
                formatter: tdValuenameofgroup
            },
            {
                dataField: "date_Of_birth",
                text: "생년월일",
                formatter: tdValuedateOfbirth
            },
            {
                dataField: "gender",
                text: "성별",
                formatter: tdValuegender
            },
            {
                dataField: "affiliation",
                text: "소속",
                formatter: tdValueAffiliation
            },
            {
                dataField: "mobile_no",
                text: "핸드폰 번호",
                formatter: tdValuemobile
            },
            {
                dataField: "status",
                text: "참가",
                formatter: tdValuestatus
            },

            {
                dataField: "attendance",
                text: "출석",
                formatter: tdValueattendance
            },

            {
                dataField: "COVID_19_symptoms",
                text: "코로나 증상유무",
                formatter: tdValueCOVID_19_symptoms
            },

            {
                dataField: "vaccination",
                text: "접종",
                formatter: tdValuevaccination
            },

            {
                dataField: "temperature",
                text: "체온",
                formatter: tdValuetemperature
            },
            {
                dataField: "View",
                text: "보기",
                formatter: linkEditFollow,
            },
            {
                dataField: "_blank",
                text: "",
            },

        ];
    } else {
        column = [
            {
                dataField: "no_id",
                text: "번호",
            },
            {
                dataField: "name",
                text: "신청자",
                formatter: tdValuename
            },
            {
                dataField: "applied_date",
                text: "신청일",
                formatter: tdValueapplied_date
            },
            {
                dataField: "participant_applicant",
                text: "구분",
                formatter: tdValueparticipantapplicant
            },
            {
                dataField: "division",
                text: "부문",
                formatter: tdValuedivision
            },
            {
                dataField: "name_of_group",
                text: "단체명",
                formatter: tdValuenameofgroup
            },
            {
                dataField: "date_Of_birth",
                text: "생년월일",
                formatter: tdValuedateOfbirth
            },
            {
                dataField: "gender",
                text: "성별",
                formatter: tdValuegender
            },
            {
                dataField: "affiliation",
                text: "소속",
                formatter: tdValueAffiliation
            },
            {
                dataField: "mobile_no",
                text: "핸드폰 번호",
            },
            eventstatus === "CanceledParticipation" &&
            {
                dataField: "cancle_application_reason",
                text: "취소사유",
            },
            eventstatus != "CanceledParticipation" && {
                dataField: "status",
                text: "참가",
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "attendance",
                text: "출석",
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "symptoms",
                text: "코로나 증상유무",
                formatter: tdValueCOVID_19_symptoms
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "vaccination",
                text: "접종",
                formatter: tdValuevaccination
            },

            eventstatus != "CanceledParticipation" && {
                dataField: "temperature",
                text: "체온",
                formatter: tdValuetemperature
            },
            {
                dataField: "View",
                text: "보기",
                formatter: linkEditFollow,
            },

        ];
    }

    const header: any = [
        {
            header: "no_id",
            key: "no_id",
            width: 20,
        },
        {
            header: "name",
            key: "name",
            width: 20,
        },
        {
            header: "applied_date",
            key: "applied_date",
            width: 15,
        },
        {
            header: "participant_applicant",
            key: "participant_applicant",
            width: 15,
        },
        {
            header: "division",
            key: "division",
            width: 20,
        },
        {
            header: "name_of_group",
            key: "name_of_group",
            width: 15,
        },
        {
            header: "date_Of_birth",
            key: "date_Of_birth",
            width: 15,
        },
        {
            header: "gender",
            key: "gender",
            width: 15,
        },
        {
            header: "affiliation",
            key: "affiliation",
            width: 20,
        },
        {
            header: "mobile_no",
            key: "mobile_no",
            width: 20,
        },
        {
            header: "status",
            key: "status",
            width: 20,
        },
        {
            header: "attendance",
            key: "attendance",
            width: 15,
        },
        {
            header: "COVID_19_symptoms",
            key: "COVID_19_symptoms",
            width: 20,
        },
        {
            header: "vaccination",
            key: "vaccination",
            width: 20,
        },
        {
            header: "temperature",
            key: "temperature",
            width: 15,
        },
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getManageEvent(pagenumber, sizeperpage);
    };

    return (
        <div className="Participant-list">
            <div className="member-list-table manage-application-list manage-event-participent-main pm-manage-participant-ctn">
                <RemotePagination
                    data={data}
                    columns={column}
                    totalSize={totalSize}
                    onTableChange={(page, sizePerPage) =>
                        handleTableChange(page, sizePerPage)
                    }
                    pagesizedropdownflag={true}
                    selectRow={selectRow}
                    rowEvents={rowEvents}
                    expandRow={expandRow}
                    // expandRow={expandRow12}
                    pageName=""
                />
            </div>

            <button
                className={manageOperationTableData.length === 0 ? "Download-data" : "Downloads"}
                onClick={() =>
                    exportExcel(
                        header,
                        data,
                        "ParticipantListEvent"
                    )
                }
            >엑셀 다운로드</button>
        </div>
    );
};

export default ManageEventParticipantList;