import React, { useState, useEffect } from "react";
import {
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Space,
} from "antd";
import FloatingLabel from "../../../../../../../floatingLabel/FloatingLabel";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import DataContainer from "../../../../../../../common/data-container/DataContainer";
import { apiCall, endpoints } from "sysone-endpoints-demo";

const GUTTER = 7;

const { Option } = Select;
const { TextArea } = Input;

export default function Address({ form, personType }) {
	const { t } = useTranslation();
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const [postalCodes, setPostalCodes] = useState([]);
	const [isDpt, setIsDpt] = useState(false);
	const [addressesTypes, setAddressesTypes] = useState([]);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		const fetch_address_types = async () => {
			const data = await apiCall(endpoints.GET_ADDRESS_TYPES, []);
			setAddressesTypes(data.values || []);
		};

		fetch_address_types();
	}, []);

	useEffect(() => {
		if (formValues?.isDpt) setIsDpt(true);
	}, [formValues?.isDpt]);

	const fetch_provinces = async (country) => {
		const data = await apiCall(endpoints.GET_PROVINCES, [country]);
		setProvinces(data.provinces || []);
	};

	const fetch_cities = async (p) => {
		const data = await apiCall(endpoints.GET_CITIES, [p]);
		setCities(data.cities || []);
		if (data.cities.length === 1) {
			form.setFieldsValue({
				city: data.cities[0].code,
			});
		}
	};

	const fetch_postal_codes = async (c) => {
		const data = await apiCall(endpoints.GET_POSTAL_CODES, [c]);
		setPostalCodes(data.values || []);
		if (data.values.length === 1) {
			form.setFieldsValue({
				postalCode: data.values[0].number,
			});
		}
	};

	useEffect(() => {
		if (formValues?.province) fetch_cities(formValues?.province);
	}, [formValues?.province]);

	useEffect(() => {
		if (formValues?.city) fetch_postal_codes(formValues?.city);
	}, [formValues?.city]);

	useEffect(() => {
		if (formValues?.residenceCountryCode) {
			setCities([]);
			setPostalCodes([]);
			fetch_provinces(formValues?.residenceCountryCode);
		}
	}, [formValues?.residenceCountryCode]);

	const onProvinceChange = async (value) => {
		form.setFieldsValue({
			province: value,
			city: null,
			postalCode: null,
		});
		setPostalCodes([]);
	};

	const onCityChange = async (value) => {
		form.setFieldsValue({
			city: value,
			postalCode: null,
		});
	};

	return (
		<DataContainer>
			<DataContainer.Section>{t("home-title")}</DataContainer.Section>
			<DataContainer.Content>
				<Col className="relative">
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("type-of-address-lbl")}
								value={formValues?.addressType}
								hint={t("type-of-address-hint")}
							>
								<Form.Item
									name={"addressType"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select allowClear={true}>
										{addressesTypes.map((type) => (
											<Option key={type.code} value={type.code}>
												{type.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("street-lbl")}
								value={formValues?.street}
								hint={t("street-hint")}
							>
								<Form.Item
									name={"street"}
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
									<Input />
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={4}>
							<FloatingLabel
								label={t("number-lbl")}
								value={formValues?.addressNumber}
								hint={t("number-hint")}
							>
								<Form.Item
									name={"addressNumber"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
										{
											pattern: /^\d+$/,
											message: t("number-format-lbl"),
										},
										{
											max: 9,
											message: t("maximum-character-lbl", 9),
										},
									]}
								>
									<Input type="number" />
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={4}>
							<Form.Item name={"isDpt"}>
								<Checkbox
									checked={isDpt}
									onChange={(e) => setIsDpt(e.target.checked)}
								>
									{t("dept-lbl")}
								</Checkbox>
							</Form.Item>
						</Col>

						{isDpt && (
							<>
								<Col span={4}>
									<FloatingLabel
										label={t("flat-lbl")}
										value={formValues?.floor}
										hint={t("flat-hint")}
									>
										<Form.Item
											name={"floor"}
											rules={[
												{
													max: 10,
													message: t("maximum-character-lbl", 10),
												},
												{
													pattern: /^\d+$/,
													message: t("number-format-lbl"),
												},
												{ required: true, message: t("field-required-lbl") },
											]}
										>
											<Input type="number" />
										</Form.Item>
									</FloatingLabel>
								</Col>

								<Col span={4}>
									<FloatingLabel
										label={t("dept-lbl")}
										value={formValues?.dpto}
										hint={t("dept-hint")}
									>
										<Form.Item
											name={"dpto"}
											rules={[
												{
													max: 5,
													message: t("maximum-character-lbl", 5),
												},
											]}
										>
											<Input />
										</Form.Item>
									</FloatingLabel>
								</Col>
							</>
						)}
					</Row>

					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("province-lbl")}
								value={formValues?.province}
								hint={t("province-hint")}
							>
								<Form.Item
									name={"province"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select
										allowClear={true}
										onChange={onProvinceChange}
										disabled={!formValues?.residenceCountryCode}
										showSearch
										placeholder=""
										optionFilterProp="children"
										filterOption={true}
									>
										{provinces.map((province) => (
											<Option key={province.code} value={province.code}>
												{province.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={8}>
							<FloatingLabel
								label={t("city-lbl")}
								value={formValues?.city}
								hint={t("city-hint")}
							>
								<Form.Item
									name={"city"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select
										allowClear={true}
										onChange={onCityChange}
										disabled={!formValues?.province}
										showSearch
										placeholder=""
										optionFilterProp="children"
										filterOption={true}
									>
										{cities.map((city) => (
											<Option key={city.code} value={city.code}>
												{city.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={8}>
							<FloatingLabel
								label={t("postal-code-lbl")}
								value={formValues?.postalCode}
								hint={t("postal-code-hint")}
							>
								<Form.Item
									name={"postalCode"}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select
										allowClear={true}
										disabled={!formValues?.city}
										showSearch
										placeholder=""
										optionFilterProp="children"
										filterOption={true}
									>
										{postalCodes.map((postalCode) => (
											<Option key={postalCode.number} value={postalCode.number}>
												{postalCode.number}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>

					<Row gutter={GUTTER}>
						<Col span={24}>
							<FloatingLabel
								label={t("observations-lbl")}
								value={formValues?.observations}
								hint={t("observations-hint")}
							>
								<Form.Item
									name={"observations"}
									rules={[
										{
											max: 500,
											message: t("maximum-character-lbl", 500),
										},
									]}
								>
									<TextArea />
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
				</Col>
			</DataContainer.Content>
		</DataContainer>
	);
}
