import React, { useState, useEffect } from "react";
import { Select } from "antd";
import FloatingLabel from "../../../../../../floatingLabel/FloatingLabel";
import { Inner } from "./styles";

const { Option } = Select;

export default function PaymentTypeSelector({ onSelect, t }) {

	const [paymentType, setPaymentType] = useState(null);

	const paymentTypes = [
		{
			code: "CREDIT",
			name: t("card-btn"),
		},
		{
			code: "DEBIT",
			name: t("account-debit-btn"),
		},
		{
			code: "CASH",
			name: t("cash-btn"),
		},
	];

	const handlePaymentTypeChange = (type) => {
		setPaymentType(type);
	};

	useEffect(() => {
		onSelect(paymentType);
	}, [paymentType]);

	return (
		<Inner>
			<FloatingLabel
				label={t("data-of-the-payment-method-subtitle")}
				hint={t("type-payment-methods-hint")}
				value={paymentType}
			>
				<Select
					allowClear={true}
					style={{ width: "100%" }}
					onChange={handlePaymentTypeChange}
				>
					{paymentTypes.map((type) => (
						<Option key={type.code} value={type.code}>
							{type.name}
						</Option>
					))}
				</Select>
			</FloatingLabel>
		</Inner>
	);
}
