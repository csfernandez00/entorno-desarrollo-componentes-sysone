import React from 'react'
import Address from "./Address"

export const AddressWithVerifier = ({
	form,
	name,
	title,
	residenceCountryCode,
	onAddressConfirmation,
	coordinates,
	addressesListName,
	t }) => {

	return (
		<Address
			form={form}
			name={name}
			title={title}
			residenceCountryCode={residenceCountryCode}
			onAddressConfirmation={onAddressConfirmation}
			coordinates={coordinates}
			addressesListName={addressesListName}
			t={t}
		/>
	)
}

