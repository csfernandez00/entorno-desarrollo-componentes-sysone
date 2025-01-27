import React from "react";
import CreatePaymentMethods from "./components/create-payment-methods/CreatePaymentMethods";


export const PaymentMethods = ({
	onAddPaymentMethod,
	addPaymentMethodMode,
	setAddPaymentMethodMode,
	fixedFooter,
	t
}) => {
	return (
		<CreatePaymentMethods
			onAddPaymentMethod={onAddPaymentMethod}
			addPaymentMethodMode={addPaymentMethodMode}
			setAddPaymentMethodMode={setAddPaymentMethodMode}
			fixedFooter={fixedFooter}
			t={t}
		/>
	);
};
