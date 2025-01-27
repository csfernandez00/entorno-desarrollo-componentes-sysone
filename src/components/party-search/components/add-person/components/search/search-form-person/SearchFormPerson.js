import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { Buttons } from "./styles";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;

export default function SearchFormPerson({
	onCancelSearch,
	onFound,
	setLoading,
	t
}) {

	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [countries, setCountries] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);
	const [noResults, setNoResults] = useState(false);

	const formValues = Form.useWatch([], form);



	const onFinish = async (values) => {
		try {
			setSubmitting(true);
			setLoading(true);
			setNoResults(false);

			const searchParams = {
				firstName: values?.firstName || null,
				lastName: values?.lastName || null,
				identificationValue: values?.identificationValue || null,
			};

			const searchParamsWithoutValues = {
				firstName: null,
				lastName: null,
				identificationValue: null,
				pageSize: 10,
				page: 1,
			};

			const response = await apiCall(
				endpoints.SEARCH_PERSON,
				[],
				values ? searchParams : searchParamsWithoutValues
			);

			const result = response?.values?.map((r) => {
				let identification = r.identifications.values.filter(
					(i) => i.default === true
				)[0];
				return {
					...r,
					key: r.code,
					identificationType: identification.type,
					identificationValue: identification.value,
				};
			});

			onFound(result, searchParams);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
			setLoading(false);
		}
	};


	return (
		<Form
			form={form}
			name="search-person"
			layout="inline"
			onFinish={onFinish}
			style={{ width: "100%" }}
		>
			<Row gutter={10}>
				<Col span={6}>
					<FloatingLabel
						label={t("name-lbl")}
						value={formValues?.firstName}
						hint={t("name-hint")}
						style={{
							flex: "1 1",
							width: "100%",
						}}
					>
						<Form.Item
							style={{ width: "100%" }}
							name="firstName"
							rules={[
								{
									required:
										formValues?.lastName || formValues?.identificationValue
											? false
											: true,
									message: t("field-required-lbl"),
								},
								{
									max: 200,
									message: t("maximum-character-lbl", 200),
								},
							]}
						>
							<Input style={{ width: "100%" }} />
						</Form.Item>
					</FloatingLabel>
				</Col>

				<Col span={6}>
					<FloatingLabel
						label={t("last-name-lbl")}
						value={formValues?.lastName}
						hint={t("name-hint")} style={{
							flex: "1 1",
							width: "100%"
						}}

					>
						<Form.Item
							style={{ width: "100%" }}
							name="lastName"
							rules={[
								{
									required:
										formValues?.firstName || formValues?.identificationValue
											? false
											: true,
									message: t("field-required-lbl"),
								},
								{
									max: 200,
									message: t("maximum-character-lbl", 200),
								},
							]}
						>
							<Input style={{ width: "100%" }} />
						</Form.Item>
					</FloatingLabel>
				</Col>
				<Col span={6}>
					<FloatingLabel
						label={t("identification-number-lbl")}
						value={formValues?.identificationValue}
						hint={t("identification-number-hint")} style={{
							flex: "1 1",
							width: "100%"
						}}

					>
						<Form.Item
							style={{ width: "100%" }}
							name="identificationValue"
							rules={[
								{
									required:
										formValues?.firstName || formValues?.lastName ? false : true,
									message: t("field-required-lbl"),
								},
								{
									max: 50,
									message: t("maximum-character-lbl", 50),
								},
							]}
						>
							<Input style={{ width: "100%" }} />
						</Form.Item>
					</FloatingLabel>
				</Col>

				<Col span={6}>
					<Buttons style={{
						flex: "1 1",
						width: "100%"
					}}
					>
						<Form.Item>
							<Button type="primary" htmlType="submit" loading={submitting}>
								{t("search-btn")}
							</Button>
						</Form.Item>
					</Buttons>
				</Col>
			</Row>
		</Form>
	);
}
