import React, { useEffect, useState } from "react";
import {
	Input,
	Col,
	InputNumber,
	Form,
	Row,
	AutoComplete,
	message,
} from "antd";
import FloatingLabel from "../../../../floatingLabel/FloatingLabel";

import { LargeButton, LabelStructureCode } from "./styles";
import { apiCall, endpoints } from "sysone-endpoints-demo";
import PersonTypeSelector from "../../../../common/person-type-selector/PersonTypeSelector";

const SearchForm = ({
	onSearch,
	setSearchingIntermediary,
	setIntermediarySelected,
	t
}) => {

	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [personType, setPersonType] = useState("INDIVIDUAL");

	const formValues = Form.useWatch([], form);

	const checkPattern = (event) => {
		const tecla = event.key;
		if (
			tecla === "+" ||
			tecla === "-" ||
			tecla === "," ||
			tecla === "." ||
			tecla === "e" ||
			tecla === "E"
		) {
			event.preventDefault();
		}
	};

	const onPersonTypeSelect = (value) => {
		setPersonType(value);
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);
			setIntermediarySelected(null);
			setSearchingIntermediary(true);

			const filters =
				personType === "INDIVIDUAL"
					? {
						"name[firstName]": values.firstName || null,
						"name[lastName]": values.lastName || null,
					}
					: { "name[organisationName]": values.name?.trim() || null };

			const res = await apiCall(endpoints.SEARCH_INTERMEDIARIES, [], {
				...filters,
				typeCode: personType,
			});

			const intermediaries = res?.values?.map((intermediary, idx) => {
				return {
					key: intermediary.code,
					code: intermediary.code,
					name: intermediary.name,
					licence: intermediary.licence,
					group: intermediary.groups?.values[0]?.name,
					role: intermediary.roles?.roles[0]?.name,
					status: intermediary.status?.name,
					typeCode: personType,
				};
			});
			const totalRows = res?.total;

			onSearch(intermediaries, totalRows);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
			setSearchingIntermediary(false);
		}
	};

	return (
		<Form
			form={form}
			name="search-commercial-structure"
			layout="vertical"
			onFinish={onFinish}
		>
			<Row gutter={7} style={{ flexWrap: "nowrap" }}>
				<Col span={4}>
					<PersonTypeSelector
						actions={null}
						value={personType}
						onChange={onPersonTypeSelect}
						minified={true}
						t={t}
					/>
				</Col>

				{personType ? (
					<>
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
											max: 50,
											message: t("maximum-character-lbl", 50),
										},
									]}
								>
									<Input />
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("last-name-lbl")}
								value={formValues?.lastName}
								hint={t("last-name-hint")}
							>
								<Form.Item
									name="lastName"
									rules={[
										{
											max: 50,
											message: t("maximum-character-lbl", 50),
										},
									]}
								>
									<Input />
								</Form.Item>
							</FloatingLabel>
						</Col>
					</>
				) : (
					<Col span={8}>
						<FloatingLabel
							label={t("intermediary-name-lbl")}
							value={formValues?.name}
							hint={t("intermediary-name-hint")}
						>
							<Form.Item
								name="name"
								rules={[
									{
										max: 50,
										message: t("maximum-character-lbl", 50),
									},
								]}
							>
								<Input />
							</Form.Item>
						</FloatingLabel>
					</Col>
				)}
				<Col span={4}>
					<Form.Item>
						<LargeButton
							type="primary"
							ghost
							htmlType="submit"
							loading={submitting}
						>
							{t("search-btn-intermediaires")}
						</LargeButton>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default SearchForm;
