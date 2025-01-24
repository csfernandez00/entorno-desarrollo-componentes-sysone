import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import DataContainer from "../../../../../../../common/data-container/DataContainer";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import { Row, Col } from "antd";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;

const GUTTER = 7;

export default function PersonalInformation({ form }) {
	const { t } = useTranslation();
	const [genders, setGenders] = useState([]);
	const [countries, setCountries] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);

	const formValues = Form.useWatch([], form);

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
	}, []);

	useEffect(() => {
		const fetch_identification_types = async () => {
			const data = await apiCall(endpoints.GET_IDENTIFICATION_TYPES, [
				"INDIVIDUAL",
				formValues?.residenceCountryCode,
			]);
			setIdentificationTypes(data.values || []);
		};

		if (formValues?.residenceCountryCode) {
			fetch_identification_types();
		}
	}, [formValues?.residenceCountryCode]);

	return (
		<>
			<DataContainer>
				<DataContainer.Section>
					{t("personal-information-subtitle")}
				</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("country-of-residence-lbl")}
								value={formValues?.residenceCountryCode}
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
										disabled
										showSearch
										placeholder=""
										optionFilterProp="children"
										filterOption={true}
									>
										{countries.map((item) => (
											<Option key={item.code} value={item.code}>
												{item.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("identification-type-lbl")}
								value={formValues?.identificationType}
								hint={t("identification-type-hint")}
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
									<Select allowClear={true} disabled>
										{identificationTypes.map((item) => (
											<Option key={item.code} value={item.code}>
												{item.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("identification-number-lbl")}
								value={formValues?.identificationValue}
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
									<Input disabled />
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
					<Row gutter={GUTTER}>
						<Col span={8}>
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
									<Input disabled />
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={8}>
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
											max: 50,
											message: t("maximum-character-lbl", 50),
										},
									]}
								>
									<Input disabled />
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
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
									<Select allowClear={true} disabled>
										{genders.map((item) => (
											<Option key={item.code} value={item.code}>
												{item.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
		</>
	);
}
