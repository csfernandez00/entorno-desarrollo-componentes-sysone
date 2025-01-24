import React, { useState, useEffect } from "react";
import { Inner } from "./styles";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import moment from "moment";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../utils/notificationToast";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;

export default function CreatePerson({
	onResult,
	createData,
	setCreatingParty,
	setModalVisible,
	onSelect
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [formValues, setFormValues] = useState(null);
	const [genders, setGenders] = useState([]);
	const [countries, setCountries] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);
	const [initialValues, setInitialValues] = useState(null);

	const residenceCountryCode = Form.useWatch("residenceCountryCode", form);
	const identificationType = Form.useWatch("identificationType", form);
	const identificationValue = Form.useWatch("identificationValue", form);

	useEffect(() => {
		const fetch_genders = async () => {
			const data = await apiCall(endpoints.GET_GENDERS, []);
			setGenders(data.values || []);
		};

		const fetch_countries = async () => {
			const data = await apiCall(endpoints.GET_COUNTRIES, []);
			setCountries(data.countries || []);
		};

		fetch_genders();
		fetch_countries();

		var initial = {
			residenceCountryCode: createData.residenceCountryCode,
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
			"INDIVIDUAL",
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

			const person = {
				...values,
				birthdate: moment(values.birthdate).format("yyyy-MM-DD"),
			};

			const response = await apiCall(endpoints.CREATE_INDIVIDUAL, [], {
				data: {
					firstName: person.firstName,
					lastName: person.lastName,
					genderCode: person.genderCode,
					residenceCountryCode: person.residenceCountryCode,
				},
				identifications: {
					values: [
						{
							value: person.identificationValue,
							typeCode: person.identificationType,
							default: true,
						},
					],
				},
			});

			const resultPerson = await apiCall(endpoints.GET_PERSON_BY_CODE, [
				response.code,
			]);
			if (!resultPerson) {
				onResult([]);
			}
			console.log("resultPerson", resultPerson)
			const resultIdentifications = resultPerson?.identifications?.values?.map((i) => ({
				identificationValue: i.value,
				identificationType: i.type,
				default: i.default
			}))
			const defaultIdentification = resultIdentifications?.find((i) => i.default === true)


			let partyCreatedData = {
				key: response.code,
				firstName: resultPerson.data.firstName,
				lastName: resultPerson.data.lastName,
				identificationValue: defaultIdentification?.identificationValue,
				identificationType: defaultIdentification?.identificationType,
				identifications: resultIdentifications
			}
			console.log("partyCreatedData", partyCreatedData)

			onResult([
				partyCreatedData
			]);

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-created-physical-person-title-ok"),
				t(
					"notification-created-physical-person-long-ok",
					values.firstName,
					values.lastName
				)
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
				name="create-person-form"
				layout="vertical"
				onFinish={onFinish}
				onValuesChange={onValuesChange}
				initialValues={initialValues}
			>
				<FloatingLabel
					label={t("name-lbl")}
					value={formValues?.firstName}
					hint={t("name-hint")}
				>
					<Form.Item
						name="firstName"
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
					label={t("last-name-subtitle")}
					value={formValues?.lastName}
					hint={t("last-name-hint")}
				>
					<Form.Item
						name="lastName"
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
						<Input />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("gender-lbl")}
					value={formValues?.genderCode}
					hint={t("gender-hint")}
				>
					<Form.Item
						name="genderCode"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true}>
							{genders.map((gender) => (
								<Option key={gender.code} value={gender.code}>
									{gender.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("country-of-residence-lbl")}
					value={residenceCountryCode}
					hint={t("country-of-residence-hint")}
				>
					<Form.Item
						name="residenceCountryCode"
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
