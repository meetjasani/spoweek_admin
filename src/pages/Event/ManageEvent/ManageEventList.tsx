
import { useEffect } from "react";
import RemotePagination from "../../../component/RemotePagination/RemotePagination";
import { useHistory } from "react-router";
import { manageEvent } from "./ManageEvent";


interface Props {
    data: manageEvent[];
    getManageEvent: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const ManageEventList: React.FC<Props> = ({
    data,
    getManageEvent,
    totalSize,
    selectRow,
    rowEvents,
}) => {
    const history = useHistory();

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
                    // history.push(`/event/register-event?id=${row.id}`);
                    history.push(`/event/register-view?id=${row.id}`);
                }}
            >
                보기
            </a>
        );
    };

    const columns = [
        {
            dataField: "no_id",
            text: "번호",
        },
        {
            dataField: "region",
            text: "지역",
        },
        {
            dataField: "sports",
            text: "종목",
        },
        {
            dataField: "writer",
            text: "작성자",
        },
        {
            dataField: "status",
            text: "상태",
        },
        {
            dataField: "event_name",
            text: "이벤트명",
        },
        {
            dataField: "recruit_method",
            text: "모집방법",
        },
        {
            dataField: "date",
            text: "일시",
        },
        {
            dataField: "location",
            text: "장소",
        },
        {
            dataField: "registered_date",
            text: "등록일",
        },
        {
            dataField: "deadline",
            text: "마감일",
        },
        {
            dataField: "edit_information",
            text: "보기",
            formatter: linkEditFollow,
        },
    ];

    const expandRow = {
        renderer: (row: any) => (
            <div className="collapsable-table">

                <table >
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>참가비</th>
                            <th>모집인원</th>
                            <th>참가/대기</th>
                            <th>대기전환</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            row.participants_information && row.participants_information.map((participantDetails: any) => (
                                <tr>
                                    <td>{participantDetails.recuitement_division}</td>
                                    <td>{participantDetails.participation_fee}</td>
                                    <td>{participantDetails.volume_of_recruitment}</td>
                                    <td>{participantDetails.participants_waiting}</td>
                                    <td>{participantDetails.switching_awaiters}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        ),
        showExpandColumn: true,
        expandColumnPosition: 'right',
        expandHeaderColumnRenderer: (expandedColumn: any) => {
            if (expandedColumn.isAnyExpands) {
                return <b></b>;
            }
            return <b></b>;
        },
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


    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getManageEvent(pagenumber, sizeperpage);
    };


    return (
        <>
            <div className="member-list-table manage-event-list search-results-table">
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
                    expandRow={expandRow}
                    pageName=""
                />
            </div>
        </>
    );
};

export default ManageEventList;
