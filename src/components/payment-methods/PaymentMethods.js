import React from "react";
import CreatePaymentMethods from "./components/create-payment-methods/CreatePaymentMethods";
import { TranslationProvider } from "../../contexts/translationContext";

export const PaymentMethods = ({
	onAddPaymentMethod,
	addPaymentMethodMode,
	setAddPaymentMethodMode,
	fixedFooter,
}) => {
	return (
		<TranslationProvider>
			<CreatePaymentMethods
				onAddPaymentMethod={onAddPaymentMethod}
				addPaymentMethodMode={addPaymentMethodMode}
				setAddPaymentMethodMode={setAddPaymentMethodMode}
				fixedFooter={fixedFooter}
			/>
		</TranslationProvider>
	);
};
