import React, { useState } from "react";
import { CloseCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { InfoText } from "./styles";

export const DataSelectedCard = ({
    cardTitle,
    onClose,
    values,
    cardWidth,
    disabled,
    expanded = false,
}) => {
    const [expand, setExpand] = useState(expanded);
    return (
        <Card
            title={
                <div
                    style={{ cursor: values?.length > 0 ? "pointer" : "auto" }}
                    onClick={() => setExpand(!expand)}
                >
                    {values?.length > 0 && (
                        <CaretRightOutlined
                            style={{
                                marginRight: 4,
                                transform: "translateX(1px)",
                                rotate: expand ? "90deg" : "0deg",
                                transition: "rotate 300ms ease",
                            }}
                        />
                    )}
                    {cardTitle}
                </div>
            }
            extra={
                <CloseCircleOutlined
                    style={{
                        color: disabled ? "grey" : "red",
                        cursor: disabled ? "not-allowed" : "pointer",
                    }}
                    onClick={disabled ? null : onClose}
                />
            }
            style={{
                width: cardWidth ?? 400,
                boxShadow: "2px 2px 5px #00000020",
            }}
            bodyStyle={{
                ...(expand && values?.length > 0
                    ? expandedStyles
                    : collapsedStyles),
            }}
        >
            <div
                style={{
                    overflow: "hidden",
                    textWrap: "nowrap",
                    ...(expand && values?.length > 0
                        ? expandedStyles
                        : collapsedStyles),
                }}
            >
                {values?.map((v, i) => (
                    <InfoText key={`${v?.name} - ${v?.value} - ${i}`}>
                        {v.icon ? (
                            <span style={{ marginRight: ".4rem" }}>
                                {v?.icon}
                            </span>
                        ) : null}
                        <strong>{v?.name}:</strong> {v?.value}
                    </InfoText>
                ))}
            </div>
        </Card>
    );
};

const expandedStyles = {
    maxHeight: 2000,
    paddingBlock: 6,
    transition: "all 300ms ease",
};

const collapsedStyles = {
    maxHeight: 0,
    paddingBlock: 0,
    transition: "all 300ms ease",
};
