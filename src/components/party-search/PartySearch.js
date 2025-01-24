import React from "react";
import { TranslationProvider } from "../../contexts/translationContext";
import PartySearchMain from "./PartySearchMain";

export const PartySearch = ({
    onPartySelected, title, onCancel
}) => {
    return (
        <TranslationProvider>
            <PartySearchMain
                onPartySelected={onPartySelected}
                title={title}
                onCancel={onCancel}
            />
        </TranslationProvider>
    );
};
