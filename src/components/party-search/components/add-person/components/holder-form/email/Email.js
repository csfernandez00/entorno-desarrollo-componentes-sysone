import React, { useState, useEffect } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import DataContainer from "../../../../../../../common/data-container/DataContainer";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;
const GUTTER = 7;

export default function Email({ form }) {
	const { t } = useTranslation();
	const [emailTypes, setEmailTypes] = useState([]);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		const fetch_mail_types = async () => {
			const data = await apiCall(endpoints.GET_MAIL_TYPES, []);
			setEmailTypes(data.values || []);
		};

		fetch_mail_types();
	}, []);

	if (!emailTypes) return <div>Loading...</div>;

	return (
		<DataContainer>
			<DataContainer.Section>Email</DataContainer.Section>
			<DataContainer.Content>
				<Row gutter={GUTTER}>
					<Col span={8}>
						<FloatingLabel
							label={t("email-type-lbl")}
							value={formValues?.workMail?.type.code}
							hint={t("email-type-hint")}
						>
							<Form.Item
								name={["workMail", "type", "code"]}
								rules={[
									{
										required: true,
										message: t("field-required-lbl"),
									},
								]}
							>
								<Select allowClear={true} disabled>
									{emailTypes.map((type) => (
										<Option key={type.code} value={type.code}>
											{type.name}
										</Option>
									))}
								</Select>
							</Form.Item>
						</FloatingLabel>
					</Col>

					<Col span={8}>
						<FloatingLabel
							label={t("email-lbl")}
							value={formValues?.workMail?.value}
							hint={t("email-hint")}
						>
							<Form.Item
								name={["workMail", "value"]}
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
								<Input type="email" />
							</Form.Item>
						</FloatingLabel>
					</Col>
				</Row>
			</DataContainer.Content>
		</DataContainer>
	);
}
