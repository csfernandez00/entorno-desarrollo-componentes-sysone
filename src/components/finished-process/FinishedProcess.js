import { Button, Col, Modal, Row } from "antd";
import React from "react";
import { SectionTitle } from "./styles";



export const FinishedProcess = ({
    title,
    children,
    values,
    contentWidth,
    actionButtons
}) => {
    return (
        <div style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backdropFilter: "blur(10px)",
            backgroundColor: "#00000020",
            left: 0,
            top: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
        }}
        >
            <Col style={{ width: contentWidth }}>
                <SectionTitle style={{ textAlign: "center" }}>{title}</SectionTitle>
                {values.map((v) => <Row style={{ gap: ".5rem", justifyContent: "center" }}>
                    <h3><b>{v?.name}:</b></h3>
                    <h3>{v?.value}</h3>
                </Row>)}

                {children}
                <Row style={{ justifyContent: "center" }}>
                    <Col style={{ padding: "1rem 0" }}>
                        {actionButtons?.length > 0 ? actionButtons?.map((b) => b) : null}
                    </Col>
                </Row>
            </Col>


        </div>
    )
};
