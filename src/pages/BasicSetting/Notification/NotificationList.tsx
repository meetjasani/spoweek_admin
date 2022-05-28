import React from 'react'
import { useHistory } from 'react-router';
import RemotePagination from '../../../component/RemotePagination/RemotePagination';


interface Props {
    data: any[];
    getNotificationData: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const NotificationList: React.FC<Props> = ({
    data,
    getNotificationData,
    totalSize,
    selectRow,
    rowEvents,
}) => {

    const history = useHistory();

    const EditNotification = (id: any) => {
        history.push(`/basicsettings/notification-register?id=${id}`);
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
                    // debugger
                    EditNotification(row.id);
                }}
            >
                수정
            </a>
        );
    };


    // const textUnderline = (cell: any,
    //     row: any,
    //     rowIndex: any,
    //     formatExtraData: any) => {

    //     if (row.gender) {
    //         return (
    //             <h1 className="text-decoration">
    //                 {cell}
    //             </h1>
    //         );
    //     }
    // }

    const columns = [
        {
            dataField: "no_id",
            text: "번호",
        },
        {
            dataField: "title",
            text: "제목",
        },
        {
            dataField: "content",
            text: "내용",
        },
        {
            dataField: "registered_date",
            text: "작성일",
        },

        {
            dataField: "edit_information",
            text: "정보수정",
            formatter: linkEditFollow,
        },
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getNotificationData(pagenumber, sizeperpage);
    };


    return (
        <div className="member-list-table notification-list setting-notice-table">
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
    )
}

export default NotificationList
