import React from "react";
import ReactExport from "react-data-export";

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport;

const multiDataSet = [
  {
    columns: [
      { title: "Name" }, // width in pixels
      { title: "Salary" }, // width in charachters
      { title: "Sex" }, // will check for width in pixels first
    ],
    // data: [[{ value: "Johnson" }, { value: 30000 }, { value: "Male" }]],
    data: [],
  },
  // {
  //   xSteps: 1, // Will start putting cell with 1 empty cell on left most
  //   ySteps: 5, //will put space of 5 rows,
  //   columns: ["Name", "Department"],
  //   data: [
  //     ["Johnson", "Finance"],
  //     ["Monika", "IT"],
  //     ["Konstantina", "IT Billing"],
  //     ["John", "HR"],
  //     ["Josef", "Testing"],
  //   ],
  // },
];

export default function App() {
  return (
    <div>
      <ExcelFile>
        <ExcelSheet dataSet={multiDataSet} name="Organization" />
      </ExcelFile>
    </div>
  );
}
