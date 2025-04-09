import { CloseCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { InfoText } from "./styles"

export const DataSelectedCard = ({
    cardTitle,
    onClose,
    values,
    cardWidth,
    disabled
}) => {
    return (
        <Card
            title={cardTitle}
            extra={
                <CloseCircleOutlined style={{ color: disabled ? "grey" : "red", cursor: disabled ? "not-allowed" : "pointer" }} onClick={disabled ? null : onClose} />
            }
            style={{ width: cardWidth ?? 400, boxShadow: "2px 2px 5px #00000020" }}
        >
            <div style={{ overflow: "hidden", textWrap: "nowrap" }}>
                {values?.map((v) => <InfoText>
                    {v.icon ? <span style={{ marginRight: ".4rem" }}>{v?.icon}</span> : null}
                    <strong>{v?.name}:</strong> {v?.value}
                </InfoText>)}
            </div>
        </Card>
    )
};
