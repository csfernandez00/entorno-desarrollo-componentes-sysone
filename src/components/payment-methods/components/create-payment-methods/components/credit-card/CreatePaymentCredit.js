import React, { useState, useEffect } from "react";
import { Inner } from "./styles";
import { Form, Input, Button, Select, DatePicker, Row, Divider } from "antd";
import moment from "moment";

import { Footer } from "../../../../styles";
import FloatingLabel from "../../../../../../floatingLabel/FloatingLabel";
import { apiCall, endpoints } from "sysone-endpoints-demo";
import { ButtonsFixedFooter, Buttons } from "../../styles";

const { Option } = Select;

export default function CreatePaymentCredit({
	onCreate,
	setAddPaymentMethodMode,
	handleInputChange,
	handleInputFocus,
	fixedFooter, t
}) {

	const [form] = Form.useForm();
	const [creditCardTypes, setCreditCardTypes] = useState([]);
	const [creditCardProviders, setCreditCardProviders] = useState([]);
	const [focused, setFocused] = useState("");

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		fetch_credit_card_types();
		fetch_credit_card_providers();
	}, []);

	const fetch_credit_card_types = async () => {
		const data = await apiCall(endpoints.GET_CREDIT_CARD_TYPES, []);
		setCreditCardTypes(data.values || []);
	};

	const fetch_credit_card_providers = async () => {
		const data = await apiCall(endpoints.GET_CARD_PROVIDERS, []);
		setCreditCardProviders(data.values || []);
	};

	const resetForm = () => {
		form.resetFields();
	};

	const onFinish = async (values) => {
		try {
			const post_data = {
				cardType: {
					code: values.card_type,
					name: creditCardTypes.find((i) => i.code === values.card_type).name,
				},
				cardProvider: {
					code: values.card_provider,
					name: creditCardProviders.find((i) => i.code === values.card_provider)
						.name,
				},
				ownerName: values.name,
				number: values.number,
				securityCode: 999,
				dateFrom: null,
				dateTo: moment(values.expiry).format("yyyy-MM-DD"),
				type: "creditCardData",
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
				name="create-credit-card-form"
				layout="vertical"
				onFinish={onFinish}
			>
				<FloatingLabel
					label={t("card-type-lbl")}
					value={formValues?.card_type}
					hint={t("card-type-hint")}
				>
					<Form.Item
						name="card_type"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true}>
							{creditCardTypes.map((cardType) => (
								<Option key={cardType.code} value={cardType.code}>
									{cardType.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>
				<FloatingLabel
					label={t("supplier-lbl")}
					value={formValues?.card_provider}
					hint={t("supplier-hint")}
				>
					<Form.Item
						name="card_provider"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							onChange={(v) => handleInputChange(v, "provider")}
						>
							{creditCardProviders.map((cardProvider) => (
								<Option key={cardProvider.code} value={cardProvider.code}>
									{cardProvider.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("name-lbl")}
					value={formValues?.name}
					hint={t("name-hint")}
				>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
							{
								max: 50,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Input
							type="text"
							disabled={!formValues?.card_provider}
							onFocus={handleInputFocus}
							onChange={(e) => handleInputChange(e.target.value, e)}
							name="name"
						/>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("card-number-lbl")}
					value={formValues?.number}
					hint={t("card-number-hint")}
				>
					<Form.Item
						name="number"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
							{
								max: 50,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Input
							type="text"
							disabled={!formValues?.card_provider}
							name="number"
							onFocus={handleInputFocus}
							onChange={(e) => handleInputChange(e.target.value, e)}
							onKeyDown={(e) =>
								/[A-Za-z]$/.test(e.key) &&
								e.key !== "Backspace" &&
								e.key !== "Control" &&
								e.key !== "v" &&
								e.preventDefault()
							}
						/>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("due-date-lbl")}
					value={formValues?.expiry}
					hint={t("due-date-hint")}
					style={{ flex: "1 1" }}
				>
					<Form.Item
						name="expiry"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<DatePicker
							format="MM/YY"
							allowClear={true}
							style={{ width: "100%" }}
							placeholder=""
							picker="month"
							disabled={!formValues?.card_provider}
							name="expiry"
							onFocus={handleInputFocus}
							onChange={(date) => handleInputChange(date, null)}
						/>
					</Form.Item>
				</FloatingLabel>

				<Form.Item>
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
				</Form.Item>
			</Form>
		</Inner>
	);
}
