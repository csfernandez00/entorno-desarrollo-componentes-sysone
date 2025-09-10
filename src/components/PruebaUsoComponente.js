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
import { CloseCircleOutlined, InboxOutlined, PlusOutlined, UserOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { downloadTemplate, handleFileMassiveImport } from "./massive-import/MassiveImport";
import moment from "moment";
import { AddressWithVerifier } from "./address/AddressWithVerifier";
import COLORS from "../common/theme/colors";
import FloatingLabel from "../floatingLabel/FloatingLabel";
import styled from "styled-components";
// import { downloadTemplate, handleFileMassiveImport } from "sysone-endpoints-demo";

function PruebaUsoComponente() {
    const [visible, setVisible] = useState(true);
    const { t } = useTranslation();
    const [excelFile, setExcelFile] = useState(null);
    const [form] = Form.useForm();
    const [init, setInit] = useState(null)
    const [importedData, setImportedData] = useState(null)
    const [coordinates, setCoordinates] = useState()

    const onAddressConfirmation = (addressConfirmed) => {
        console.log(addressConfirmed)
    }

    useEffect(() => {

        setTimeout(() => {
            setCoordinates({
                "1": {
                    "latitude": "-37.5482237",
                    "longitude": "-60.8007914"
                }
            })
            console.log("Agregando coords")
        }, 1500);
    }, [])



    return (
        <div style={{ padding: "5rem" }}>
            <Form form={form} initialValues={{
                addresses: [
                    { "street": "Andes", "addressNumber": "1530", "floor": null, "observations": null, "city": "1982", "province": "BS_AS", "postalCode": "1832", "addressType": "HOME" }, { "street": "Andes", "addressNumber": "1530", "floor": null, "observations": null, "city": "1982", "province": "BS_AS", "postalCode": "1832", "addressType": "HOME" }
                ]
            }}>
                {/* <AddressWithVerifier
                    form={form}
                    name={"prueba"}  // 👈 usar el que da Form.List
                    title={""}
                    onAddressConfirmation={onAddressConfirmation}
                    coordinates={coordinates}
                    t={t}
                /> */}

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
                                            coordinates={coordinates?.[name]}
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
        </div >
    );
}

export default PruebaUsoComponente;
