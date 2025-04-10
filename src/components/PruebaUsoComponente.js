import React, { useState } from "react";
import { PartySearch } from "./party-search/PartySearch";
// import { PartySearch } from 'sysone-endpoints-demo';
import { useTranslation } from "../contexts/translationContext";
// import { CommercialStructureSearch } from './commercial-structure/CommercialStructureSearch';
import { Button, Col, Row } from "antd";
import { CommercialStructureSearch } from "sysone-endpoints-demo";
import { PaymentMethods } from "./payment-methods/PaymentMethods";
// import { FinishedProcess } from './finished-process/FinishedProcess';
import { FinishedProcess } from "sysone-endpoints-demo";
import { DataSelectedCard } from "./data-selected-card/DataSelectedCard";
// import { DataSelectedCard } from "sysone-endpoints-demo"
import { UserOutlined } from "@ant-design/icons";

function PruebaUsoComponente() {
    const [visible, setVisible] = useState(true);
    const { t } = useTranslation();
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

            {visible && (
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
            )}


            {/* <Button onClick={() => setVisible(true)}>Abrir modal</Button> */}
        </div>
    );
}

export default PruebaUsoComponente;
