import React, { useState } from "react";
import { PartySearch } from "./party-search/PartySearch";
// import { PartySearch } from 'sysone-endpoints-demo';
import { useTranslation } from "../contexts/translationContext";
// import { CommercialStructureSearch } from './commercial-structure/CommercialStructureSearch';
import { Button, Col, message, Row, Table, Upload } from "antd";
import { CommercialStructureSearch } from "sysone-endpoints-demo";
import { PaymentMethods } from "./payment-methods/PaymentMethods";
// import { FinishedProcess } from './finished-process/FinishedProcess';
import { FinishedProcess } from "sysone-endpoints-demo";
import { DataSelectedCard } from "./data-selected-card/DataSelectedCard";
// import { DataSelectedCard } from "sysone-endpoints-demo"
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { downloadTemplate, handleFileMassiveImport } from "sysone-endpoints-demo"


function PruebaUsoComponente() {
    const [visible, setVisible] = useState(true);
    const { t } = useTranslation();
    const [excelFile, setExcelFile] = useState(null);
    const [excelData, setExcelData] = useState(null);

    const { Dragger } = Upload;
    const props = {
        name: "file",
        multiple: false,
        beforeUpload: (file) => handleFileMassiveImport(file, setExcelData),
        onChange(info) {
            const { status } = info.file;
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };



    const editableColumns = [
        { code: 'pais', label: 'country', options: ["ARG"] },
        { code: 'gender', label: "gender", options: ["MALE", "FEMALE"] },
        { code: 'identificationType', label: "identification-type", options: ["DNI", "PASAPORTE", "LIBRETA_CIVICA"] },
        { code: 'identificationValue', label: "identification-value" },
        { code: 'firstName', label: "first-name" },
        { code: 'lastName', label: "last-name" },
    ];
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: "4%",
            onCell: (_, index) => ({ style: { padding: ".35rem 0 0 .5rem" } }),

        },
        {
            title: 'Practica',
            dataIndex: 'practica',
            key: 'practica',
            ellipsis: {
                showTitle: false,
            },
            width: "12%",
            onCell: (_, index) => ({ style: { padding: ".35rem 0 0 .5rem" } }),
        },
        ...editableColumns?.map((col) => ({
            title: `${col.label}-lbl`,
            dataIndex: col.code,
            width: "12%",
            ellipsis: {
                showTitle: false,
            },
            key: col.code,
            onCell: (_, index) => ({ style: { padding: 0 } }),
            options: col.options

        })),
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            width: "12%",
            render: (record) => <Button type="link">Detalle</Button>,
            onCell: (_, index) => ({ style: { padding: ".35rem 0 0 .5rem" } }),

        },
    ];


    return (
        <div style={{ padding: "5rem" }}>
            {/* <CommercialStructureSearch
                visible={visible}
                setVisible={setVisible}
                onCommercialStructureSelected={(data) => {
                    console.log("DATA", data);
                }} /> 

            {/* {visible &&
                <PartySearch
                    onPartySelected={(data) => {
                        console.log("DATA", data);
                        setVisible(false)
                    }}
                    title={t("party-search-title")}
                    onCancel={() => setVisible(false)}
                    t={t}
                />
            } */}

            {/* {visible && <PaymentMethods
                onAddPaymentMethod={(data) => console.log("AGREGANDO", data)}
                fixedFooter={false}
                dataFormattedForEndpoint={true}
                setAddPaymentMethodMode={setVisible}
                t={t}
            />} */}

            {/* 
            {visible &&
                <FinishedProcess
                    title={"Proceso finalizado!"}
                    values={[
                        { name: "Holder", value: "Juan Perez" },
                        { name: "Nro cotizacion", value: 124 },
                        { name: "Code", value: "3859bd1b-d4f7-471c-ba62-82c1ee48f189" },
                    ]}
                    contentWidth={"400px"}
                    actionButtons={[<Button style={{ marginBottom: "1rem" }}
                        block
                        type="primary"
                        size="large"
                        onClick={() => { }}>
                        Aceptar
                    </Button>,
                    <Button style={{ marginBottom: "1rem" }}
                        block
                        type="secondary"
                        size="large"
                        onClick={() => { }}>
                        vovler
                    </Button>]}
                >
                    <h3 style={{ textAlign: "center" }}>children text </h3>
                </FinishedProcess>
            } */}

            {/* {visible && (
                <DataSelectedCard
                    values={[
                        {
                            icon: <UserOutlined />,
                            name: "Holder",
                            value: "Juan Perez",
                        },
                        { icon: null, name: "Nro cotizacion", value: "124" },
                        {
                            icon: null,
                            name: "Code",
                            value: "3859bd1b-d4f7-471c-ba62-82c1ee48f189",
                        },
                    ]}
                    cardTitle={"Juan Perez"}
                    onClose={() => console.log("Closing")}
                    cardWidth={400}
                    disabled={true}
                />
            )} */}

            <div style={{ flex: ".8 1" }}>
                {
                    !excelData ? (
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Clickear en esta area o arrastrar un archivo para subirlo!
                            </p>
                            <p className="ant-upload-hint">
                                Soporta un unico archivo a la vez.
                            </p>
                        </Dragger>
                    ) : null
                }

                <Table
                    columns={columns}
                    dataSource={excelData?.data || null}
                    bordered
                    size="small"
                />

            </div>


            <Button onClick={() => downloadTemplate(columns.filter((c) => c.key !== "key"
                && c.key !== "acciones"))}>Descargar plantilla</Button>
        </div>
    );
}

export default PruebaUsoComponente;
