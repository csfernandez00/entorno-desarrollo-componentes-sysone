import React from "react";
import PartySearchMain from "./PartySearchMain";

export const PartySearch = ({
    onPartySelected, title, onCancel, t
}) => {
    return (
        <PartySearchMain
            onPartySelected={onPartySelected}
            title={title}
            onCancel={onCancel}
            t={t}
        />
    );
};
