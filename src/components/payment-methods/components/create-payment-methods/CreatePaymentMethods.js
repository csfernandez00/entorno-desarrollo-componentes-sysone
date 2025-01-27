import React, { useEffect, useState } from "react";
import { Button, Divider } from "antd";
import CreatePaymentDebit from "./components/bank-debit/CreatePaymentDebit";
import CreatePaymentCash from "./components/cash/CreatePaymentCash";
import CreatePaymentCredit from "./components/credit-card/CreatePaymentCredit";
import PaymentTypeSelector from "./components/payment-type-selector/PaymentTypeSelector";
import { Buttons, Inner } from "./styles";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import moment from "moment";
import { Footer } from "../../styles";

const CreatePaymentMethods = ({
	onAddPaymentMethod,
	setAddPaymentMethodMode,
	availablePaymentMethods,
	fixedFooter, t
}) => {
	const [payments, setPayments] = useState(null);
	const [selectedPaymentType, setSelectedPaymentType] = useState(null);
	const [state, setState] = useState({
		number: "",
		expiry: "",
		cvc: "",
		name: "",
		focus: "",
		provider: "",
	});

	const handleInputChange = (value, evt) => {
		if (evt === "provider") {
			setState((prev) => ({ ...prev, provider: value }));
		} else {
			if (evt && evt.target) {
				const { name, value } = evt.target;
				setState((prev) => ({ ...prev, [name]: value }));
			} else {
				setState((prev) => ({
					...prev,
					expiry: value ? moment(value).format("MM/YY") : "",
				}));
			}
		}
	};

	const handleInputFocus = (evt) => {
		setState((prev) => ({ ...prev, focus: evt.target.name }));
	};

	useEffect(() => {
		setPayments({
			bankAccountData: {
				values: [],
			},
			creditCardData: {
				values: [],
			},
			cashData: {
				values: [],
			},
		});

		return () => {
			setSelectedPaymentType(null);
			setPayments(null);
		};
	}, []);

	const handlePaymentTypeSelect = (type) => {
		setSelectedPaymentType(type);
	};

	const onCreate = (paymentMethods) => {
		onAddPaymentMethod(paymentMethods);
	};

	return (
		<Inner>
			{selectedPaymentType === "CREDIT" ? (
				<div style={{ marginBottom: "1.5rem" }}>
					<Cards
						number={state?.number || ""}
						expiry={state?.expiry || ""}
						cvc={state?.cvc || ""}
						name={state?.name || ""}
						focused={state?.focus || ""}
						acceptedCards={[state?.provider === "VISA" ? "visa" : "mastercard"]}
					/>
				</div>
			) : null}
			<PaymentTypeSelector onSelect={handlePaymentTypeSelect} t={t} />
			{selectedPaymentType === "CREDIT" && (
				<CreatePaymentCredit
					payments={payments}
					onCreate={onCreate}
					availablePaymentMethods={availablePaymentMethods}
					setAddPaymentMethodMode={setAddPaymentMethodMode}
					handleInputChange={handleInputChange}
					handleInputFocus={handleInputFocus}
					fixedFooter={fixedFooter}
					t={t}
				/>
			)}
			{selectedPaymentType === "DEBIT" && (
				<CreatePaymentDebit
					payments={payments}
					onCreate={onCreate}
					availablePaymentMethods={availablePaymentMethods}
					setAddPaymentMethodMode={setAddPaymentMethodMode}
					fixedFooter={fixedFooter}
					t={t}
				/>
			)}
			{selectedPaymentType === "CASH" && (
				<CreatePaymentCash
					payments={payments}
					onCreate={onCreate}
					availablePaymentMethods={availablePaymentMethods}
					setAddPaymentMethodMode={setAddPaymentMethodMode}
					fixedFooter={fixedFooter}
					t={t}
				/>
			)}
		</Inner>
	);
};

export default CreatePaymentMethods;
