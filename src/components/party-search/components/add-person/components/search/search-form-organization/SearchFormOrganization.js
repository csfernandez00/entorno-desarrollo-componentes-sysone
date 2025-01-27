import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Col, Row } from "antd";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { Buttons } from "./styles";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;

export default function SearchFormOrganization({
	onCancelSearch,
	onFound,
	setLoading, t
}) {

	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [noResults, setNoResults] = useState(false);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
	}, []);

	const onFinish = async (values) => {
		try {
			setSubmitting(true);
			setLoading(true);
			setNoResults(false);

			const searchParams = {
				name: values?.name || null,
				identificationValue: values?.identificationValue || null,
				identificationTypeCode: values?.identificationType || null,
				hostCountryCode: values?.residenceCountryCode || null,
			};

			const searchParamsWithoutValues = {
				name: null,
				identificationValue: null,
				pageSize: 10,
				page: 1,
			};

			const response = await apiCall(
				endpoints.SEARCH_ORGANIZATION,
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
			name="search-organization"
			layout="inline"
			onFinish={onFinish}
			style={{ width: "100%" }}
		>
			<Row gutter={10} >
				<Col span={8}>
					<FloatingLabel
						label={t("business-name-lbl")}
						value={formValues?.name}
						hint={t("business-name-hint")}
						style={{
							width: "100%",
						}}
					>
						<Form.Item
							style={{ width: "100%" }}
							name="name"
							rules={[
								{
									required: formValues?.residenceCountryCode ? false : true,
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

				<Col span={8}>
					<FloatingLabel
						label={t("identification-number-lbl")}
						value={formValues?.identificationValue}
						hint={t("identification-number-hint")}
						style={{
							width: "100%",
						}}
					>
						<Form.Item
							style={{ width: "100%" }}
							name="identificationValue"
							rules={[
								{
									required: formValues?.name ? false : true,
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

				<Col span={8}>
					<Buttons style={{
						width: "100%",
					}}>
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
