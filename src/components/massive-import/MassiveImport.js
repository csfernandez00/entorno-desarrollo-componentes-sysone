import * as excelJs from 'exceljs';
import * as XLSX from "xlsx";
import { openNotificationWithIcon, TYPE } from '../../utils/notificationToast';
import moment from 'moment';


export const downloadTemplate = async (columns, data = []) => {
    const workbook = new excelJs.Workbook();
    const ws = workbook.addWorksheet('Test Worksheet');


    const columnHeaders = columns.map((col) => col.dataIndex);
    ws.addRow(columnHeaders);


    data.forEach((item) => {
        const rowData = columns.map((col) => item[col.dataIndex] ?? '');
        const row = ws.addRow(rowData);

        row.eachCell((cell, colNumber) => {
            const col = columns[colNumber - 1];
            if (col.type === 'date' && cell.value) {
                const rawValue = typeof cell.value === 'string' ? cell.value.replace(/^"(.*)"$/, '$1') : cell.value;
                const date = moment(rawValue, ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"], true);
                if (date.isValid()) {
                    cell.value = date.toDate();
                    cell.numFmt = 'dd/mm/yyyy';
                } else {
                    cell.value = '';
                }
            }
        });
    });


    ws.columns.forEach((_, index) => {
        ws.getColumn(index + 1).width = 18;
    });

    columns.forEach((col, index) => {
        if (col.options && col.options.length > 0) {
            const columnLetter = String.fromCharCode(65 + index);
            const formula = `"${col.options.join(',')}"`;
            ws.dataValidations.add(`${columnLetter}2:${columnLetter}99999`, {
                type: 'list',
                allowBlank: false,
                formulae: [formula],
            });
        }
    });

    ws.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFADD8E6' },
    };

    ws.eachRow((row) => {
        row.eachCell((cell) => {
            cell.font = {
                name: 'Inter',
                size: 8,
            };
            cell.alignment = {
                horizontal: 'center',
            };
        });
    });

    const excelBlob = await workbook.xlsx.writeBuffer();
    const excelUrl = URL.createObjectURL(
        new Blob([excelBlob], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
    );

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'template.xlsx';
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(excelUrl);
    document.body.removeChild(link);
};

function excelDateToJSDate(excelDate) {
    // Excel date 1 = 1900-01-01, pero en JS date 0 = 1970-01-01, por eso sumamos días desde 1899-12-30
    const daysSinceExcelEpoch = Math.floor(excelDate);
    const fractionalDay = excelDate - daysSinceExcelEpoch;

    // Fecha base para Excel en JS (30 Dic 1899)
    const excelEpoch = new Date(1899, 11, 30);

    // Sumar días enteros
    const date = new Date(excelEpoch.getTime() + daysSinceExcelEpoch * 24 * 60 * 60 * 1000);

    // Sumar la parte fraccional del día (horas, minutos, segundos)
    const totalSeconds = Math.round(fractionalDay * 24 * 60 * 60);
    date.setSeconds(date.getSeconds() + totalSeconds);

    return date;
}



export const handleFileMassiveImport = (file, setterFunction, editableColumns = []) => {
    try {
        const fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];

        if (file && fileTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = (e) => {
                const excelFile = e.target.result;
                const workbook = XLSX.read(excelFile, { type: "buffer" });
                const selectedSheet = workbook.SheetNames[0];

                if (excelFile && selectedSheet) {
                    const worksheet = workbook.Sheets[selectedSheet];
                    const data = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        range: 0,
                        defval: "",
                    });

                    const [columns, ...rows] = data;

                    const filteredRows = rows.filter(row =>
                        row.some(cell => (typeof cell === "string" ? cell.trim() : cell) !== "")
                    );

                    const tableData = filteredRows.map((row, rowIndex) => {
                        const rowData = { key: rowIndex };

                        columns.forEach((colName, colIndex) => {
                            let value = row[colIndex] ?? "";
                            const colMeta = editableColumns.find(col => col.dataIndex === colName);

                            if (colMeta?.type === "date") {

                                if (typeof value === "number") {
                                    // Es un número Excel: convertir
                                    const jsDate = excelDateToJSDate(value);
                                    value = moment(jsDate).toISOString(); // o format que quieras
                                } else if (typeof value === "string" && value.trim() !== "") {
                                    // Ya tienes fecha como string, parsear con moment
                                    const parsed = moment(value, ["DD/MM/YYYY", "YYYY-MM-DD"], true);
                                    if (parsed.isValid()) {
                                        value = parsed.toISOString();
                                    }
                                }
                            }

                            rowData[colName] = value;
                        });

                        return rowData;
                    });

                    setterFunction(tableData);
                    console.log("Data importada:", tableData);
                }
            };
        }
    } catch (error) {
        openNotificationWithIcon(TYPE.ERROR, error.message || error);
    } finally {
        return false;
    }
};














