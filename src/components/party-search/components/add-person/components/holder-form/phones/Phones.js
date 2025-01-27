import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DataContainer from "../../../../../../../common/data-container/DataContainer";

import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { apiCall, endpoints } from "sysone-endpoints-demo";
const { Option } = Select;

const GUTTER = 7;
const SECTION_NAME = "phones";

export default function Phones({ form, t }) {

	const [phoneTypes, setPhoneTypes] = useState([]);
	const formValues = Form.useWatch([], form);
	useEffect(() => {
		const fetch_phone_types = async () => {
			const data = await apiCall(endpoints.GET_PHONE_TYPES, []);
			setPhoneTypes(data.values || []);
		};

		fetch_phone_types();
	}, []);

	return (
		<DataContainer>
			<DataContainer.Section>{t("phones-lbl")}</DataContainer.Section>
			<DataContainer.Content>
				<Col className="relative">
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("phone-type-lbl")}
								value={formValues?.phoneType}
								hint={t("phone-type-hint")}
							>
								<Form.Item
									name={"phoneType"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select allowClear={true}>
										{phoneTypes.map((type) => (
											<Option key={type.code} value={type.code}>
												{type.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={3}>
							<FloatingLabel
								label={t("country-code-lbl")}
								value={true}
								hint={t("country-code-hint")}
							>
								<Form.Item
									name={"areaCode"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
										{
											max: 3,
											message: t("maximum-character-lbl", 3),
										},
									]}
								>
									<Input type="number" addonBefore="+" />
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={3}>
							<FloatingLabel
								label={t("area-code-lbl")}
								value={formValues?.locationCode}
								hint={t("area-code-hint")}
							>
								<Form.Item
									name={"locationCode"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
										{
											max: 10,
											message: t("maximum-character-lbl", 10),
										},
									]}
								>
									<Input type="number" />
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={4}>
							<FloatingLabel
								label={t("telephone-lbl")}
								value={formValues?.phone}
								hint={t("telephone-hint")}
							>
								<Form.Item
									name={"phone"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
										{
											max: 50,
											message: t("maximum-character-lbl", 50),
										},
										{
											min: 4,
											message: t("minimum-character-lbl", 4),
										},
									]}
								>
									<Input type="number" />
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={3}>
							<FloatingLabel
								label={t("internal-lbl")}
								value={formValues?.intern}
								hint={t("internal-hint")}
							>
								<Form.Item
									name={"intern"}
									rules={[
										{
											max: 10,
											message: t("maximum-character-lbl", 10),
										},
									]}
								>
									<Input type="number" />
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
				</Col>
			</DataContainer.Content>
		</DataContainer>
	);
}
