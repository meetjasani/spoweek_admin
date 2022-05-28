import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { arrayTableSubData } from '../../helper/util';
import { manageDelete } from '../../pages/Event/ManageDeletedEvent/ManageDeletedEvent';
import { manageEvent } from '../../pages/Event/ManageEvent/ManageEvent';
import { manageEventApp } from '../../pages/Event/ManageEventApplication/ManageEventApplication';
import { manageParticipant } from '../../pages/Event/ManageEventApplication/ManageEventParticipant';
import { memeberManageWithdrawal } from '../../pages/Member/ManageWithdrawal/ManageWithdrawal';
import { memeberManagment } from '../../pages/Member/MemberList/MemberManagement';
import $ from 'jquery';

interface Props {
  data: memeberManagment[] | manageEvent[] | memeberManageWithdrawal[] | manageDelete[] | manageEventApp[] | manageParticipant[];
  columns: any
  onTableChange: (page?: any, sizePerPage?: any) => void;
  totalSize?: any;
  pagesizedropdownflag: boolean
  selectRow: any;
  rowEvents: any;
  pageName: any;
  expandRow: any;
  id?: string
}


const RemotePagination: React.FC<Props> = ({ data, columns, onTableChange, totalSize, pagesizedropdownflag, selectRow, rowEvents, pageName, expandRow, id = "id" }) => {

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(50);
  const onPageChange = (pageNumber: any) => {
    setPage(pageNumber);
    onTableChange(pageNumber, sizePerPage);
  }
  const onSizePerPageChange = (sizeperpage: any) => {
    setSizePerPage(sizeperpage)
    setPage(1);
    onTableChange(1, sizeperpage);
  }

  const tableRowEvents = {
    onClick: (e: any, row: any, rowIndex: any) => {
      if (pageName === "MemorialHallList") {
        rowEvents(row.id)
      }
    }
  }

  useEffect(() => {
    $(".dropdown-menu li").each(function () {
      var current = $(this);
      var data = current.children().attr("data-page");
      if (data) {
        if (parseInt(data) == sizePerPage) {
          current.children().addClass("ColorChnage")
        } else {
          current.children().removeClass("ColorChnage")
        }
      }
    });
  }, [sizePerPage])


  return (
    <div>

      <PaginationProvider
        pagination={
          paginationFactory({
            custom: true,
            // firstPageText:<img src="./img/firstarrow.svg"/>,
            // lastPageText:<img src="./img/lastarrow.svg"/>,
            // prePageText: <img src="./img/nextarrow.svg"/>,
            // nextPageText: <img src="./img/prevarrow.svg"/>,

            page,
            sizePerPage,
            totalSize,
            sizePerPageList: [{
              text: '50개', value: 50
            }, {
              text: '100개', value: 100
            }, {
              text: '150개', value: 150
            }, {
              text: '200개', value: 200
            }
              // , {
              //   text: 'All', value: totalSize
              // }
            ],
            alwaysShowAllBtns: true,
          })
        }
      >
        {
          ({
            paginationProps,
            paginationTableProps
          }) => (
            <div>
              <BootstrapTable
                {...paginationTableProps}
                remote
                keyField={id}
                data={data}
                columns={columns}
                onTableChange={() => onTableChange(page, sizePerPage)}
                rowEvents={tableRowEvents}
                selectRow={selectRow}
                expandRow={expandRow}
              />
              <div className="paginationcustom event-delete">
                <PaginationListStandalone
                  {...paginationProps}
                  onPageChange={(p) => onPageChange(p)}
                />
                {totalSize > 0 && pagesizedropdownflag &&
                  <SizePerPageDropdownStandalone
                    {...paginationProps}
                    onSizePerPageChange={(e) => onSizePerPageChange(e)}
                  />
                }

              </div>
            </div>
          )
        }
      </PaginationProvider>
    </div>
  )
};

export default RemotePagination;