import React, { useState } from 'react'
import CommercialStructure from './CommercialStructure'
import { TranslationProvider } from '../../contexts/translationContext';

export const CommercialStructureSearch = ({ visible, setVisible, onCommercialStructureSelected }) => {
    const [intermediarySelected, setIntermediarySelected] = useState(null);
    const [results, setResults] = useState(null);

    const onSelected = (data) => {
        onCommercialStructureSelected({ intermediary: intermediarySelected, commercialStructure: data })
        setIntermediarySelected(null);
        setResults(null)
    }

    const handleCancelCommercialStructure = () => {
        setIntermediarySelected(null);
        setVisible(false);
        setResults(null)
    };

    return (
        <TranslationProvider>

            <CommercialStructure
                onSelected={onSelected}
                intermediarySelected={intermediarySelected}
                setIntermediarySelected={setIntermediarySelected}
                setModalCommercialStructureVisible={
                    setVisible
                }
                visible={visible}
                handleCancelCommercialStructure={handleCancelCommercialStructure}
                results={results}
                setResults={setResults}
            />

        </TranslationProvider >
    )
}

