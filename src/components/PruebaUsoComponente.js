import React, { useEffect, useState } from "react";
//import { PartySearch } from "./party-search/PartySearch";
import { PartySearch } from 'sysone-endpoints-demo';
import { useTranslation } from "../contexts/translationContext";
// import { CommercialStructureSearch } from './commercial-structure/CommercialStructureSearch';
import { Button, Col, DatePicker, Form, message, Row, Table, Upload } from "antd";
import { CommercialStructureSearch } from "sysone-endpoints-demo";
import { PaymentMethods } from "./payment-methods/PaymentMethods";
// import { FinishedProcess } from './finished-process/FinishedProcess';
import { FinishedProcess } from "sysone-endpoints-demo";
import { DataSelectedCard } from "./data-selected-card/DataSelectedCard";
// import { DataSelectedCard } from "sysone-endpoints-demo"
import { CloseCircleOutlined, InboxOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { downloadTemplate, handleFileMassiveImport } from "./massive-import/MassiveImport";
import moment from "moment";
import { AddressWithVerifier } from "./address/AddressWithVerifier";
import COLORS from "../common/theme/colors";
import FloatingLabel from "../floatingLabel/FloatingLabel";
// import { downloadTemplate, handleFileMassiveImport } from "sysone-endpoints-demo";

function PruebaUsoComponente() {
    const [visible, setVisible] = useState(true);
    const { t } = useTranslation();
    const [excelFile, setExcelFile] = useState(null);
    const [form] = Form.useForm();
    const [importedData, setImportedData] = useState(null)
    const [coordinates, setCoordinates] = useState({ latitude: "3", longitude: "3" })
    // const [excelData, setExcelData] = useState([
    //     {
    //         key: '1',
    //         practica: 'Abogado',
    //         nombre: '',
    //         apellido: '',
    //         sexo: '',
    //         tipoDocumento: '',
    //         nroDocumento: '',
    //         birthdate: null
    //     },
    //     {
    //         key: '2',
    //         practica: 'Abogado',
    //         nombre: '',
    //         apellido: '',
    //         sexo: '',
    //         tipoDocumento: '',
    //         nroDocumento: '',
    //         birthdate: null
    //     },
    //     {
    //         key: '3',
    //         practica: 'Abogado',
    //         nombre: '',
    //         apellido: '',
    //         sexo: '',
    //         tipoDocumento: '',
    //         nroDocumento: '',
    //         birthdate: null
    //     },
    //     {
    //         key: '4',
    //         practica: 'Abogado',
    //         nombre: '',
    //         apellido: '',
    //         sexo: '',
    //         tipoDocumento: '',
    //         nroDocumento: '',
    //         birthdate: null
    //     },
    //     {
    //         key: '5',
    //         practica: 'Desarrollador',
    //         nombre: '',
    //         apellido: '',
    //         sexo: '',
    //         tipoDocumento: '',
    //         nroDocumento: '',
    //         birthdate: moment().format("DD/MM/YYYY")
    //     },
    //     {
    //         key: '6',
    //         practica: 'Desarrollador',
    //         nombre: '',
    //         apellido: '',
    //         sexo: '',
    //         tipoDocumento: '',
    //         nroDocumento: '',
    //         birthdate: moment().format("DD/MM/YYYY")
    //     },
    // ])

    // const { Dragger } = Upload;
    // const props = {
    //     name: "file",
    //     multiple: false,
    //     beforeUpload: (file) => handleFileMassiveImport(file, setImportedData, columns),
    //     onChange(info) {
    //         const { status } = info.file;
    //         if (status === "done") {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === "error") {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    //     onDrop(e) {
    //         console.log("Dropped files", e.dataTransfer.files);
    //     },
    // };



    // const editableColumns = [
    //     { code: 'pais', label: 'country', options: ["ARG"] },
    //     { code: 'gender', label: "gender", options: ["MALE", "FEMALE"] },
    //     { code: 'identificationType', label: "identification-type", options: ["DNI", "PASAPORTE", "LIBRETA_CIVICA"] },
    //     { code: 'identificationValue', label: "identification-value" },
    //     { code: 'firstName', label: "first-name" },
    //     { code: 'lastName', label: "last-name" },
    // ];

    // const columns = [
    //     {
    //         title: '#',
    //         dataIndex: 'key',
    //         key: 'key',
    //         width: "4%",
    //         onCell: (_, index) => ({ style: { padding: ".35rem 0 0 .5rem" } }),

    //     },
    //     {
    //         title: 'Practica',
    //         dataIndex: 'practica',
    //         key: 'practica',
    //         ellipsis: {
    //             showTitle: false,
    //         },
    //         width: "12%",
    //         onCell: (_, index) => ({ style: { padding: ".35rem 0 0 .5rem" } }),
    //     },
    //     ...editableColumns?.map((col) => ({
    //         title: `${col.label}-lbl`,
    //         dataIndex: col.code,
    //         width: "12%",
    //         ellipsis: {
    //             showTitle: false,
    //         },
    //         key: col.code,
    //         onCell: (_, index) => ({ style: { padding: 0 } }),
    //         options: col.options

    //     })),
    //     {
    //         title: t('birth-date-lbl'),
    //         key: 'birthdate',
    //         dataIndex: 'birthdate',
    //         type: "date",
    //         ellipsis: {
    //             showTitle: false,
    //         },
    //         width: "10%",
    //         render: (_value, record) =>
    //             <Form.Item
    //                 name={[record?.key, "birthdate"]}
    //                 rules={[
    //                     {
    //                         required: true,
    //                         message: "",
    //                     },
    //                 ]}
    //                 style={{ borderColor: "transparent", marginBottom: 0 }}
    //             >
    //                 <DatePicker
    //                     format="DD/MM/YYYY"
    //                     placeholder=""
    //                     style={{ width: "100%", marginBottom: 0 }}
    //                     onChange={(date) => {
    //                         const newData = [...excelData];
    //                         const rowIndex = newData.findIndex((row) => row.key === record.key);
    //                         newData[rowIndex].birthdate = date;
    //                         setExcelData(newData);
    //                     }}
    //                 />
    //             </Form.Item>,
    //         onCell: (_, index) => ({ style: { padding: 0 } }),
    //     },
    //     {
    //         title: 'Acciones',
    //         dataIndex: 'actions',
    //         key: 'actions',
    //         width: "12%",
    //         render: (record) => <Button type="link">Detalle</Button>,
    //         onCell: (_, index) => ({ style: { padding: ".35rem 0 0 .5rem" } }),

    //     },
    // ];

    // const updateFromImport = (data) => {
    //     if (!data?.length) return;

    //     const valuesToSet = {};
    //     data.forEach(row => {

    //         valuesToSet[row.key] = columns.reduce((acc, col) => {
    //             console.log("acc", acc)
    //             acc[col.dataIndex] = col.key === "birthdate" ? moment(row[col.key]) : row[col.key];
    //             return acc;
    //         }, {});
    //     });

    //     form.setFieldsValue(valuesToSet);
    // };

    const onAddressConfirmation = (addressConfirmed) => {
        console.log(addressConfirmed)
    }

    useEffect(() => {
        form.setFieldsValue({ addresses: [{ "street": "Andes", "addressNumber": "1530", "floor": null, "observations": null, "city": "1982", "province": "BS_AS", "postalCode": "1832", "addressType": "HOME" }] })
    }, [])



    return (
        <div style={{ padding: "5rem" }}>
            <Form form={form}>
                <AddressWithVerifier
                    form={form}
                    name={"prueba"}  // 👈 usar el que da Form.List
                    title={""}
                    onAddressConfirmation={onAddressConfirmation}
                    coordinates={coordinates}
                    t={t}
                />

                <Form.List name={"addresses"}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row>
                                    <Col span={22}>
                                        <AddressWithVerifier
                                            key={key}
                                            form={form}
                                            addressesListName={"addresses"}
                                            name={name}  // 👈 usar el que da Form.List
                                            title={""}
                                            onAddressConfirmation={onAddressConfirmation}
                                            coordinates={coordinates}
                                            t={t}
                                            {...restField}
                                        /></Col>
                                    <Col span={2}> <FloatingLabel hint={t("remove-hint")}>
                                        <CloseCircleOutlined
                                            style={{
                                                marginLeft: "10px",
                                                paddingTop: "10px",
                                                color: COLORS.RED,
                                            }}
                                            onClick={() => remove(name)}
                                        />
                                    </FloatingLabel></Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    {t("add-btn")}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>

            {/*visible &&
                <PartySearch
                    onPartySelected={(data) => {
                        console.log("DATA", data);
                        setVisible(false)
                    }}
                    title={t("party-search-title")}
                    onCancel={() => setVisible(false)}
                    t={t}
                />
            }
            {/* <CommercialStructureSearch
                visible={visible}
                setVisible={setVisible}
                onCommercialStructureSelected={(data) => {
                    console.log("DATA", data);
                }} /> 

         

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

            {/* <div style={{ flex: ".8 1" }}>
                <Form form={form}>
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


                    <Table
                        columns={columns}
                        dataSource={excelData || null}
                        bordered
                        size="small"
                    />
                </Form>
            </div>


            <Button onClick={() => downloadTemplate(columns.filter((c) => c.key !== "key"
                && c.key !== "acciones"), excelData)}>Descargar plantilla</Button>
            <Button onClick={() => updateFromImport(importedData)}>a</Button> */}

        </div >
    );
}

export default PruebaUsoComponente;
