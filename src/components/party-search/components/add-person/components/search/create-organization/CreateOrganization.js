import React, { useState, useEffect } from "react";
import { Error, Errors, Inner } from "./styles";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import moment from "moment";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../utils/notificationToast";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;

export default function CreateOrganization({
	onSelect,
	onResult,
	createData,
	setCreatingParty,
	setModalVisible,
	t
}) {

	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [formValues, setFormValues] = useState(null);
	const [countries, setCountries] = useState([]);
	const [organizationTypes, setOrganizationTypes] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);
	const [initialValues, setInitialValues] = useState(null);
	const hostCountryCode = Form.useWatch("hostCountryCode", form);
	const identificationType = Form.useWatch("identificationType", form);
	const identificationValue = Form.useWatch("identificationValue", form);

	useEffect(() => {
		const fetch_countries = async () => {
			const data = await apiCall(endpoints.GET_COUNTRIES, []);
			setCountries(data.countries || []);
		};

		const fetch_organization_types = async () => {
			const data = await apiCall(endpoints.GET_ORGANIZATION_TYPES, []);
			setOrganizationTypes(data.values || []);
		};

		fetch_countries();
		fetch_organization_types();

		var initial = {
			hostCountryCode: createData.hostCountryCode,
			identificationType: createData.identificationTypeCode,
			identificationValue: createData.identificationValue,
		};
		setInitialValues(initial);
	}, []);

	useEffect(() => {
		return () => {
			setSubmitting(false);
		};
	}, []);



	const getIdentificationTypes = async (value) => {
		const data = await apiCall(endpoints.GET_IDENTIFICATION_TYPES, [
			"ORGANISATION",
			value,
		]);
		setIdentificationTypes(data.values || []);
	};

	const resetForm = () => {
		form.resetFields();
		setFormValues(null);
		setIdentificationTypes([]);
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const organization = {
				...values,
				foundationDate: moment(values.foundationDate).format("yyyy-MM-DD"),
			};

			const response = await apiCall(endpoints.CREATE_ORGANIZATION, [], {
				data: {
					name: organization.name,
					hostCountryCode: organization.hostCountryCode,
					typeCode: organization.typeCode,
				},
				identifications: {
					values: [
						{
							value: organization.identificationValue,
							typeCode: organization.identificationType,
							default: true,
						},
					],
				},
			});

			const resultOrganization = await apiCall(
				endpoints.GET_ORGANIZATION_BY_CODE,
				[response.code]
			);

			if (!resultOrganization) {
				onResult([]);
			}
			const resultIdentifications = resultOrganization?.identifications?.values?.map((i) => ({
				identificationValue: i.value,
				identificationType: i.type,
				default: i.default
			}))
			const defaultIdentification = resultIdentifications?.find((i) => i.default === true)

			const partyCreatedData = {
				key: response.code,
				name: resultOrganization.data.name,
				identificationValue: defaultIdentification?.identificationValue,
				identificationType: defaultIdentification?.identificationType,
				identifications: resultIdentifications
			}

			onResult([partyCreatedData]);

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-created-legal-person-title-ok"),
				t("notification-created-legal-person-long-ok", values.name)
			);
			onSelect(partyCreatedData)
			resetForm();
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	const onValuesChange = () => {
		setFormValues(form.getFieldsValue());
	};

	const onCountryChange = async (value) => {
		form.setFieldsValue({ identificationType: null });
		form.setFieldsValue({ identificationValue: null });
		if (!value) {
			setIdentificationTypes([]);
			return;
		}
		const data = getIdentificationTypes(value);
		setIdentificationTypes(data.values || []);
	};

	if (!initialValues) return <div>cargando</div>;

	return (
		<Inner>
			<Form
				form={form}
				name="create-organization-form"
				layout="vertical"
				onFinish={onFinish}
				onValuesChange={onValuesChange}
				initialValues={initialValues}
			>
				<FloatingLabel
					label={t("business-name-lbl")}
					value={formValues?.name}
					hint={t("business-name-hint")}
				>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
							{
								max: 200,
								message: t("maximum-character-lbl", 200),
							},
						]}
					>
						<Input />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("organization-type-lbl")}
					value={formValues?.typeCode}
					hint={t("organization-type-hint")}
				>
					<Form.Item
						name="typeCode"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true}>
							{organizationTypes.map((type) => (
								<Option key={type.code} value={type.code}>
									{type.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("country-code-lbl")}
					value={hostCountryCode}
					hint={t("country-code-hint")}
				>
					<Form.Item
						name="hostCountryCode"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							onChange={onCountryChange}
							showSearch
							placeholder=""
							optionFilterProp="children"
							filterOption={true}
						>
							{countries.map((country) => (
								<Option key={country.code} value={country.code}>
									{country.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("id-type-lbl")}
					value={identificationType}
					hint={t("id-type-hint")}
				>
					<Form.Item
						name="identificationType"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={identificationTypes.length <= 0}
						>
							{identificationTypes.map((identificationType) => (
								<Option
									key={identificationType.code}
									value={identificationType.code}
								>
									{identificationType.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("identification-number-lbl")}
					value={identificationValue}
					hint={t("identification-number-hint")}
				>
					<Form.Item
						name="identificationValue"
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
						<Input disabled={!identificationType} />
					</Form.Item>
				</FloatingLabel>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={submitting}>
						{t("create-new-person-btn")}
					</Button>
					<Button
						style={{ marginLeft: "1rem" }}
						onClick={() => {
							setCreatingParty(false);
							setModalVisible(false);
						}}
					>
						{t("cancel-btn")}
					</Button>
				</Form.Item>
			</Form>
		</Inner>
	);
}
