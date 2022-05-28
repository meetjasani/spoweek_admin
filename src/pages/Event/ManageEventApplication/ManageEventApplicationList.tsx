import RemotePagination from "../../../component/RemotePagination/RemotePagination";
import { useHistory } from "react-router";
import { manageEventApp } from "./ManageEventApplication";

interface Props {
    data: manageEventApp[];
    getManageEvent: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const ManageEventApplicationList: React.FC<Props> = ({
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
                    const eventname = row?.event_name
                    history.push(`/event/manage-event-participant?id=${row.id}&ename=${eventname}`);
                    // history.push({
                    //     pathname: `/event/manage-event-participant?id=${row.id}`,
                    //     state: { eventname },
                    // });

                    // history.push(`/event/manage-event-participant?id=${"bc95618a-2bd4-438d-922b-e0017c8632fd"}`);
                }}
            >
                참가자 보기
            </a>
        );
    };

    const columns = [
        {
            dataField: "no_id",
            text: "번호",
        },
        {
            dataField: "status",
            text: "상태",
        },
        {
            dataField: "writer",
            text: "작성자",
        },
        {
            dataField: "event_name",
            text: "이벤트명",
        },
        {
            dataField: "recruitment",
            text: "모집방법",
        },
        {
            dataField: "date",
            text: "일시",
        },
        {
            dataField: "locations",
            text: "장소",
        },
        {
            dataField: "volume_of_recruitment",
            text: "모집인원",
        },
        {
            dataField: "participants_waiting",
            text: "참가자/대기자",
        },
        {
            dataField: "deadline",
            text: "접수 마감일",
        },

        {
            dataField: "View participants",
            text: "참가자 보기",
            formatter: linkEditFollow,
        },
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getManageEvent(pagenumber, sizeperpage);
    };

    return (
        <>
            <div className="member-list-table manage-application-list sel-manage manage-event-participant-app">
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
                    id={"keyId"}
                    expandRow=""
                    pageName=""
                />
            </div>
        </>
    );
};

export default ManageEventApplicationList;
