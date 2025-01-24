import React, { useState } from 'react'
import { PartySearch } from './party-search/PartySearch'
// import { PartySearch } from 'sysone-endpoints-demo';
import { useTranslation } from '../contexts/translationContext';
// import { CommercialStructureSearch } from './commercial-structure/CommercialStructureSearch';
import { Button } from 'antd';
import { CommercialStructureSearch } from "sysone-endpoints-demo"

function PruebaUsoComponente() {
    const [visible, setVisible] = useState(true)
    const { t } = useTranslation()
    return (
        <div>
            {/* <CommercialStructureSearch
                visible={visible}
                setVisible={setVisible}
                onCommercialStructureSelected={(data) => {
                    console.log("DATA", data);
                }} /> */}

            {visible &&
                <PartySearch
                    onPartySelected={(data) => {
                        console.log("DATA", data);
                        setVisible(false)
                    }}
                    title={t("party-search-title")}
                    onCancel={() => setVisible(false)}
                />
            }
            <Button onClick={() => setVisible(true)}>Abrir modal</Button>
        </div>
    )
}

export default PruebaUsoComponente