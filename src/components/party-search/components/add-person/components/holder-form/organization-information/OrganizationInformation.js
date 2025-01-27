import React, { useState, useEffect } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import DataContainer from "../../../../../../../common/data-container/DataContainer";

import { Row, Col } from "antd";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;
const GUTTER = 7;

export default function OrganizationInformation({ form, t }) {
	const [countries, setCountries] = useState(null);
	const [organizationTypes, setOrganizationTypes] = useState(null);
	const [identificationTypes, setIdentificationTypes] = useState(null);

	const formValues = Form.useWatch([], form);

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
	}, []);

	useEffect(() => {
		const fetch_identification_types = async () => {
			const data = await apiCall(endpoints.GET_IDENTIFICATION_TYPES, [
				"ORGANISATION",
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
					{t("organization-data-subtitle")}
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
									<Select allowClear={true} disabled>
										{countries?.map((item) => (
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
										{identificationTypes?.map((item) => (
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
								label={t("foundation-date-lbl")}
								value={formValues?.foundationDate}
								hint={t("foundation-date-hint")}
							>
								<Form.Item name="foundationDate">
									<DatePicker
										format="DD/MM/YYYY"
										allowClear={true}
										placeholder=""
										style={{ width: "100%" }}
										disabled
									/>
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("organization-type-lbl")}
								value={formValues?.type}
								hint={t("organization-type-hint")}
							>
								<Form.Item
									name="type"
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select allowClear={true} disabled>
										{organizationTypes?.map((organizationType) => (
											<Option
												key={organizationType.code}
												value={organizationType.code}
											>
												{organizationType.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("social-reason-lbl")}
								value={formValues?.name}
								hint={t("social-reason-hint")}
							>
								<Form.Item
									name="name"
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
										{
											max: 100,
											message: t("maximum-character-lbl", 100),
										},
									]}
								>
									<Input disabled />
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
		</>
	);
}
