import _, { isArray } from "lodash";
import excel from 'exceljs';
import { saveAs } from 'file-saver'
import moment from "moment";

const items = {
    MALE: "남성",
    FEMALE: "여성",
    Travel: "여행객 호스트",
    Local: "현지인 호스트",
    UPCOMING: "진행중",
    COMPLETED: "종료",
    CANCELED: '취소',
    OPEN: "공개",
    PRIVATE: "비공개",
    STAND_BY: "승인 대기",
    ACCEPTED: "승인 완료",
    DECLINED: "승인 불가",


};

export const isEmpty = (value: any) => {
    if (value == null) {
        return true;
    }
    if (typeof value == "object") {
        return Object.keys(value).length == 0;
    }
    return (
        (isArray(value) && value.length == 0)
        || ((value == undefined || value == null || value == ''))
    )
}


export const EngToKor = (kewword: string) => {
    // @ts-ignore
    return Object.keys(items).includes(kewword) ? items[kewword] : kewword
}

export const checkImageURL = (nationality: string) => {
    const pngImages = ["Antarctica"];
    let url_image = `../img/flags/${nationality}.svg`;
    if (pngImages.includes(nationality)) {
        url_image = `../img/flags/${nationality}.png`;
    }
    return url_image
}

export const arrayTableData = (items: any) => {
    const mainTableItem = items.map((option: any) => {
        return option
    })
    let flatList = _.flatten(mainTableItem);
    let filterList = _.filter(flatList, function (o: any) { return o.is_defination_by });
    return _.uniqBy(filterList, 'keyId')
    // return _.uniqBy(filterList, 'user_id')
}


// export const arrayTableSubData = (items: any, user_id: any) => {
export const arrayTableSubData = (items: any, keyId: any) => {
    const mainTableItem = items.map((option: any) => {
        return option
    })
    let flatList = _.flatten(mainTableItem);
    let filterList = _.filter(flatList, function (o: any) { return (o.keyId == keyId && !o.is_defination_by) });
    return filterList
}

export const exportExcel = async (column: any, body: any, sheetName = "List") => {
    let workbook = new excel.Workbook();
    await workbook.addWorksheet(sheetName);
    let currentSheet = await workbook.getWorksheet(sheetName);
    currentSheet.columns = column;
    await currentSheet.addRows(body);

    const buf = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buf]), `${sheetName}_${moment().format('YYYY_MM_DD_h_m')}.xlsx`)
}

export function numberWithCommas(x: any, type: string) {
    if (x == undefined) {
        return
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, type);
}


export function phoneNumberMasking(phone: any, masking: string) {
    if (phone.toString().length == 11) {
        var x: any = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
        return !x[2] ? x[1] : '' + x[1] + masking + x[2] + (x[3] ? masking + x[3] : '');
    } else {
        return phone
    }
}
// export const arrayTableData = (items: any) => {

//     const mainTableItem = items.map((option: any) => {

//         return option

//     })

//     let flatList = _.flatten(mainTableItem);

//     let filterList = _.filter(flatList, function (o: any) { return o.is_defination_by });

//     return _.map(_.uniqBy(filterList, 'keyId'), function (o: any, index: number) { return { ...o, no_id: index } })
//     // return _.uniqBy(filterList, 'user_id')
// }
