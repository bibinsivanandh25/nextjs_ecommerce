/* eslint-disable no-plusplus */
import * as xlsx from "xlsx";
import * as FileSaver from "file-saver";
import toastify from "./toastUtils";

const exceldownload = (copyRowData, filename) => {
  const columnlength = Object.entries(copyRowData[0]).length;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = xlsx.utils.json_to_sheet(copyRowData);
  const wscols = [];
  for (let i = 0; i < columnlength; i++) {
    wscols.push(i == 0 ? { wch: 15 } : { wch: 25 });
  }
  ws["!cols"] = wscols;
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "array" });
  const datas = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(datas, `${filename}${fileExtension}`);
  toastify("Downloaded Successfully", "success");
};
export default exceldownload;
// copyRowData=[{SI.NO:1,PaymetId:12,.....},{SI.NO:2,PaymetId:142}]
// filename= "string"
