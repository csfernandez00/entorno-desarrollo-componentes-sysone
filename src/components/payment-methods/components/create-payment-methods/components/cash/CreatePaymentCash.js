import React, { useState, useEffect } from "react";
import { Inner } from "./styles";
import { Form, Button, Select, Divider } from "antd";

import { Footer } from "../../../../styles";
import FloatingLabel from "../../../../../../floatingLabel/FloatingLabel";
import { apiCall, endpoints } from "sysone-endpoints-demo";
import { ButtonsFixedFooter, Buttons } from "../../styles";

const { Option } = Select;

export default function CreatePaymentCash({
	onCreate,
	setAddPaymentMethodMode,
	fixedFooter, t
}) {

	const [form] = Form.useForm();
	const [currencies, setCurrencies] = useState([]);

	const cash_currency = Form.useWatch("cash_currency", form);

	useEffect(() => {
		const fetch_currencies = async () => {
			const data = await apiCall(endpoints.GET_CURRENCIES, []);
			setCurrencies(data.values || []);
		};

		fetch_currencies();
	}, []);

	const resetForm = () => {
		form.resetFields();
	};

	const onFinish = async (values) => {
		try {
			const post_data = {
				currencyCode: values.cash_currency,
				currencyName: currencies.find((i) => i.code === values.cash_currency)
					.name,
				type: "cashMethodData",
			};

			resetForm();
			onCreate(post_data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Inner>
			<Form
				form={form}
				name="create-debit-form"
				layout="vertical"
				onFinish={onFinish}
			>
				<FloatingLabel
					label={t("currency-lbl")}
					value={cash_currency}
					hint={t("currency-hint")}
				>
					<Form.Item
						name="cash_currency"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={!currencies || currencies?.length === 0}
						>
							{currencies.map((currency) => (
								<Option key={currency.code} value={currency.code}>
									{currency.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				{fixedFooter ? (
					<Footer>
						<Divider />
						<ButtonsFixedFooter>
							<Button
								type="secondary"
								onClick={() => setAddPaymentMethodMode(false)}
								htmlType="button"
							>
								{t("cancel-btn")}
							</Button>
							<Button type="primary" htmlType="submit">
								{t("add-btn")}
							</Button>
						</ButtonsFixedFooter>
					</Footer>
				) : (
					<Buttons>
						<Button
							type="secondary"
							onClick={() => setAddPaymentMethodMode(false)}
							htmlType="button"
						>
							{t("cancel-btn")}
						</Button>
						<Button type="primary" htmlType="submit">
							{t("add-btn")}
						</Button>
					</Buttons>
				)}
			</Form>
		</Inner>
	);
}
