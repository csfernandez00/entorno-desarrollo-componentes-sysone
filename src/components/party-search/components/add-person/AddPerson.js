import React, { useEffect, useState } from "react";
import SearchForm from "./components/search/Search";

export default function AddPerson({
	title,
	onCancel,
	onPartySelected,
	t,
}) {


	const handlePersonFound = (person) => {
		onPartySelected({
			...person,
			phoneType: person?.phones ? person?.phones[0]?.phoneType : null,
			areaCode: person?.phones ? person?.phones[0]?.areaCode : null,
			locationCode: person?.phones ? person?.phones[0]?.locationCode : null,
			phone: person?.phones ? person?.phones[0]?.phone : null,
			extension: person?.phones ? person?.phones[0]?.intern : null,
			street: person?.addresses[0]?.street,
			addressNumber: String(person?.addresses[0]?.addressNumber),
			floor: person?.addresses[0]?.floor,
			dpto: person?.addresses[0]?.dpto,
			observations: person?.addresses[0]?.observations,
			city: person?.addresses[0]?.city,
			province: person?.addresses[0]?.province,
			postalCode: person?.addresses[0]?.postalCode,
			addressType: person?.addresses[0]?.addressType,
			isDpt:
				person?.addresses[0]?.floor || person?.addresses[0]?.dpto
					? true
					: false,
		});
	};



	return <SearchForm
		t={t}
		onCancelSearch={onCancel}
		onSelect={handlePersonFound}
		title={title}
	/>

}
