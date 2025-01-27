import React, { useState, useEffect } from "react";
import { Col, Form, Row, Select } from "antd";
import DataContainer from "../../../../../../../common/data-container/DataContainer";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { ErrorMessage } from "./styles";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const { Option } = Select;

const GUTTER = 7;

export default function FiscalCategories({
	personType,
	form,
	setErrorMessage,
	errorMessage, t
}) {

	const [fiscalCategories, setFiscalCategories] = useState([]);

	const residenceCountryCode = Form.useWatch("residenceCountryCode", form);
	const fiscalCategory = Form.useWatch("fiscalCategory", form);

	useEffect(() => {
		const fetch_fiscal_categories = async () => {
			const data = await apiCall(endpoints.GET_FISCAL_CATEGORIES, [
				personType,
				residenceCountryCode,
			]);
			setFiscalCategories(data.values || []);
		};

		if (residenceCountryCode) {
			fetch_fiscal_categories();
		}
	}, [residenceCountryCode]);

	return (
		<DataContainer>
			<DataContainer.Section>{t("tax-data-subtitle")}</DataContainer.Section>
			<DataContainer.Content>
				<Row gutter={GUTTER}>
					<Col span={8}>
						<FloatingLabel
							label={t("tax-category-lbl")}
							value={fiscalCategory}
							hint={t("tax-category-hint")}
						>
							<Form.Item name="fiscalCategory">
								<Select allowClear={true} onChange={() => setErrorMessage("")}>
									{fiscalCategories.map((fiscalCategory) => (
										<Option
											key={fiscalCategory.code}
											value={fiscalCategory.code}
										>
											{fiscalCategory.name}
										</Option>
									))}
								</Select>
							</Form.Item>
						</FloatingLabel>
					</Col>
					<Col>
						{errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
					</Col>
				</Row>
			</DataContainer.Content>
		</DataContainer>
	);
}
