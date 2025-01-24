import React, { useState, useEffect } from "react";
import { Inner } from "./styles";
import { Form, Input, Button, Select, Tooltip, Divider } from "antd";

import { Footer } from "../../../../styles";
import FloatingLabel from "../../../../../../floatingLabel/FloatingLabel";
import { useTranslation } from "../../../../../../contexts/translationContext";
import { apiCall, endpoints } from "sysone-endpoints-demo";
import { ButtonsFixedFooter, Buttons } from "../../styles";
const { Option } = Select;

export default function CreatePaymentDebit({
	onCreate,
	setAddPaymentMethodMode,
	fixedFooter,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [banks, setBanks] = useState([]);
	const [bankAccountTypes, setBankAccountTypes] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [bankBranches, setBankBranches] = useState([]);

	const formValues = Form.useWatch([], form);
	const bank = Form.useWatch("bank", form);

	useEffect(() => {
		const fetch_banks = async () => {
			const data = await apiCall(endpoints.GET_BANKS, []);
			setBanks(data.values || []);
		};

		const fetch_currencies = async () => {
			const data = await apiCall(endpoints.GET_CURRENCIES, []);
			setCurrencies(data.values || []);
		};

		const fetch_bank_account_types = async () => {
			const data = await apiCall(endpoints.GET_BANK_ACCOUNT_TYPES, []);
			setBankAccountTypes(data.values || []);
		};

		fetch_banks();
		fetch_currencies();
		fetch_bank_account_types();
	}, []);

	const onBankChange = async (value) => {
		form.setFieldsValue({ debit_subsidiary: null });
		if (!value) {
			setBankBranches([]);
			return;
		}
		const data = await apiCall(endpoints.GET_BANK_BRANCHES, [value]);
		setBankBranches(data.values || []);
		form.setFieldsValue({ debit_subsidiary: data.values[0]?.code });
	};

	const resetForm = () => {
		form.resetFields();
	};

	const onFinish = async (values) => {
		try {
			const post_data = {
				bankAccountType: {
					code: values.debit_accountType,
					name: bankAccountTypes.find(
						(i) => i.code === values.debit_accountType
					).name,
				},
				bankBranch: {
					bank: {
						name: bankBranches[0]?.bank.name,
						code: values.bank,
					},
					code: bankBranches[0]?.code,
					name: bankBranches[0]?.name,
				},
				currency: {
					code: values.debit_currency,
				},
				number: "2222222222",
				cbu: values.debit_cbu,
				type: "bankAccountData",
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
					label={t("bank-lbl")}
					hint={t("bank-hint")}
					value={formValues?.bank}
				>
					<Form.Item
						name="bank"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							onChange={onBankChange}
							showSearch
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.children.toLowerCase().includes(input.toLowerCase())
							}
						>
							{banks.map((bank) => (
								<Option key={bank.code} value={bank.code}>
									{bank.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("account-type-lbl")}
					value={formValues?.debit_accountType}
					hint={t("account-type-hint")}
				>
					<Form.Item
						name="debit_accountType"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true} disabled={!formValues?.bank}>
							{bankAccountTypes.map((accountType) => (
								<Option key={accountType.code} value={accountType.code}>
									{accountType.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				{/* <FloatingLabel
					label={t("branch-office-lbl")}
					value={formValues?.debit_subsidiary}
					hint={t("branch-office-hint")}
				>
					<Form.Item
						name="debit_subsidiary"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={
								!formValues?.bank || !bankBranches || bankBranches?.length === 0
							}
						>
							{bankBranches.map((branch) => (
								<Option key={branch.code} value={branch.code}>
									{branch.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel> */}

				{/* <FloatingLabel
					label={t("account-number-lbl")}
					value={formValues?.debit_accountNumber}
					hint={t("account-number-hint")}
				>
					<Form.Item
						name="debit_accountNumber"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Input type="number" disabled={!formValues?.bank} />
					</Form.Item>
				</FloatingLabel> */}

				<FloatingLabel
					label={t("cbu-lbl")}
					value={formValues?.debit_cbu}
					hint={t("cbu-hint")}
				>
					<Form.Item
						name="debit_cbu"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
							{
								min: 22,
								max: 22,
								message: t("cbu-characters-quantity-lbl", 22),
							},
						]}
					>
						<Input type="number" disabled={!formValues?.bank} />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("currency-lbl")}
					value={formValues?.debit_currency}
					hint={t("currency-hint")}
				>
					<Form.Item
						name="debit_currency"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={
								!formValues?.bank || !currencies || currencies?.length === 0
							}
						>
							{currencies.map((currency) => (
								<Option key={currency.code} value={currency.code}>
									{currency.name}
								</Option>
							))}
						</Select>
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
