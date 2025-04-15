import * as excelJs from 'exceljs';
import * as XLSX from "xlsx";
import { openNotificationWithIcon, TYPE } from '../../utils/notificationToast';

export const downloadTemplate = async (columns) => {
    const workbook = new excelJs.Workbook();
    const ws = workbook.addWorksheet('Test Worksheet');

    const columnHeaders = columns.map((col) => col.dataIndex);
    ws.addRow(columnHeaders);


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


export const handleFileMassiveImport = (file, setterFunction) => {
    try {
        let fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];
        if (file && fileTypes.includes(file.type)) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e) => {
                const excelFile = e.target.result;
                const workbook = XLSX.read(excelFile, { type: "buffer" });
                const selectedSheet = workbook.SheetNames[0];
                if (excelFile !== null && selectedSheet !== "") {
                    const worksheet = workbook.Sheets[selectedSheet];
                    const data = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        range: 0,
                        defval: "",
                    });

                    const [columns, ...rows] = data;

                    const filteredRows = rows.filter(row =>
                        row.some(cell =>
                            (typeof cell === "string" ? cell.trim() : cell) !== ""
                        )
                    );

                    const tableColumns = columns.map((col, index) => ({
                        title: col,
                        dataIndex: col,
                        key: col,
                        ellipsis: true,
                        width: col === "Título" ? "30%" : col === "" ? "2%" : undefined,
                    }));

                    const tableData = filteredRows.map((row, rowIndex) => {
                        let rowData = { key: rowIndex };
                        columns.forEach((colName, colIndex) => {
                            rowData[colName] = row[colIndex] || "";
                        });
                        return rowData;
                    });

                    setterFunction({ columns: tableColumns, data: tableData });
                    console.log("Data ", tableData)
                }
            };
        }
    } catch (error) {
        openNotificationWithIcon(TYPE.ERROR, error);
    }
};







