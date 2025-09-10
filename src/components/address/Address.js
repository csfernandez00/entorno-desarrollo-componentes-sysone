import React, { useState, useEffect } from "react";
import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Space,
} from "antd";
import FloatingLabel from "../../floatingLabel/FloatingLabel";
import DataContainer from "../../common/data-container/DataContainer";
import { apiCall, endpoints } from "@sysone/components";
import axios from "axios";
import COLORS from "../../common/theme/colors";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import AddressMapModal from "./components/AddressMapModal";
import { openNotificationWithIcon, TYPE } from "../../utils/notificationToast";

const GUTTER = 7;

const { Option } = Select;
const { TextArea } = Input;

function Address({ form, name, title, residenceCountryCode = "ARG", onAddressConfirmation, addressesListName = null, coordinates, t }) {
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const [postalCodes, setPostalCodes] = useState([]);
	const [isDpt, setIsDpt] = useState(false);
	const [addressesTypes, setAddressesTypes] = useState([]);
	const [mapPosition, setMapPosition] = useState(null);
	const [normalizingAddress, setNormalizingAddress] = useState(false)
	const [needAddressConfirmation, setNeedAddressConfirmation] = useState(false)
	const [addressConfirmed, setAddressConfirmed] = useState(false)
	const [addressFound, setAddressFound] = useState(null)

	const formValues = Form.useWatch(addressesListName ? [addressesListName] : [], form);



	const handleNormalizeAddress = async () => {
		try {
			setNormalizingAddress(true)

			setMapPosition(null)
			const address = form.getFieldValue(addressesListName ? [addressesListName, name] : [name]);
			if (!address) return;

			const { street, addressNumber, city: cityCode, province: provinceCode } = address;


			if (!street || !addressNumber || !cityCode || !provinceCode) {
				openNotificationWithIcon(TYPE.WARNING, t("missing-data-to-find-location-lbl"))
				return;
			}

			const cityName = cities.find((c) => c.code === cityCode)?.name || cityCode;
			const provinceName = provinces.find((p) => p.code === provinceCode)?.name || provinceCode;


			const response = await axios.get("https://nominatim.openstreetmap.org/search", {
				params: {
					format: "json",
					addressdetails: 1,
					street: `${addressNumber} ${street}`, // número + calle
					city: cityName,
					state: provinceName,
					country: "Argentina"
				},
				// comento este header ya que lo rebota el navegador, pero de todas formas
				// se manda el referer (url de la app) asi que ya cumple la politica de nominatim con eso
				// headers: {
				// 	'User-Agent': 'TuApp (contacto@tuempresa.com)' // política de Nominatim
				// }
			});

			const data = response.data;

			if (data.length > 0) {
				const location = data[0];
				setMapPosition([parseFloat(location.lat), parseFloat(location.lon)]);

				const addressDetails = location.address;

				const normalizedData = {
					street: addressDetails.road || "",
					addressNumber: addressDetails.house_number || addressNumber,
					city:
						addressDetails.city ||
						addressDetails.town ||
						addressDetails.village ||
						"",
					province: addressDetails.state || "",
					postalCode: addressDetails.postcode || "",
					country: addressDetails.country || "",
					latitude: location.lat,
					longitude: location.lon,
				};

				setAddressFound(normalizedData)
				setNeedAddressConfirmation(true)
			} else {
				openNotificationWithIcon(TYPE.ERROR, t("address-not-found-in-geolocation-system-lbl"));
			}
		} catch (error) {
			openNotificationWithIcon(TYPE.ERROR, t("error-normalizing-address-lbl"));
			console.error("Error al consultar Nominatim:", error);
		} finally {
			setNormalizingAddress(false)
		}
	};

	const confirmAddress = () => {
		form.setFieldsValue(addressesListName ? {
			[addressesListName]: {
				[name]: {
					street: addressFound?.street,
					addressNumber: addressFound?.addressNumber || formValues?.[name]?.addressNumber,
					// city: normalizedData.city,
					// province: normalizedData.province,
					// postalCode: normalizedData.postalCode,
				},
			}
		} : {
			[name]: {
				street: addressFound?.street,
				addressNumber: addressFound?.addressNumber || formValues?.[name]?.addressNumber,
				// city: normalizedData.city,
				// province: normalizedData.province,
				// postalCode: normalizedData.postalCode,
			},
		});
		setNeedAddressConfirmation(false)
		setAddressConfirmed(true)
		onAddressConfirmation({
			addressNormalized: addressFound,
			addressFormValues: {
				isDpt: isDpt,
				floor: isDpt ? formValues?.[name]?.floor : null,
				dpto: isDpt ? formValues?.[name]?.dpto : null,
				...formValues?.[name]
			}
		})
	}


	const LocationPicker = () => {
		useMapEvents({
			click(e) {
				setMapPosition([e.latlng.lat, e.latlng.lng]);
			},
		});
		return null;
	}



	useEffect(() => {
		const fetch_address_types = async () => {
			const data = await apiCall(endpoints.GET_ADDRESS_TYPES, []);
			setAddressesTypes(data.values || []);
		};

		fetch_address_types();

	}, []);



	useEffect(() => {
		if (coordinates) {
			setNeedAddressConfirmation(false)
			setAddressConfirmed(true)
		}
	}, [coordinates]);

	useEffect(() => {
		if (formValues?.[name]?.isDpt) setIsDpt(true);
	}, [formValues?.[name]?.isDpt]);

	const fetch_provinces = async (country) => {
		const data = await apiCall(endpoints.GET_PROVINCES, [country]);
		setProvinces(data.provinces || []);
	};

	const fetch_cities = async (p) => {
		const data = await apiCall(endpoints.GET_CITIES, [p]);
		setCities(data.cities || []);
		if (data.cities.length === 1) {
			form.setFieldsValue(addressesListName ? {
				[addressesListName]: {
					[name]: {
						city: data.cities[0].code,
					}
				}
			} : {
				[name]: {
					city: data.cities[0].code,
				}
			});
		}
	};

	const fetch_postal_codes = async (c) => {
		const data = await apiCall(endpoints.GET_POSTAL_CODES, [c]);
		setPostalCodes(data.values || []);
		if (data.values.length === 1) {
			form.setFieldsValue(addressesListName ? {
				[addressesListName]: {
					[name]: {
						postalCode: data.values[0].number,
					}
				}
			} : {
				[name]: {
					postalCode: data.values[0].number,
				}
			});
		}
	};

	useEffect(() => {
		if (formValues?.[name]?.province) fetch_cities(formValues?.[name]?.province);
	}, [formValues?.[name]?.province]);

	useEffect(() => {
		if (formValues?.[name]?.city) fetch_postal_codes(formValues?.[name]?.city);
	}, [formValues?.[name]?.city]);

	useEffect(() => {
		if (residenceCountryCode) {
			setCities([]);
			setPostalCodes([]);
			fetch_provinces(residenceCountryCode);
		}
	}, [residenceCountryCode]);

	const onProvinceChange = async (value) => {
		form.setFieldsValue(addressesListName ? {
			[addressesListName]: {
				[name]: {
					province: value,
					city: null,
					postalCode: null,
				}
			}
		} : {
			[name]: {
				province: value,
				city: null,
				postalCode: null,
			}
		});
		setPostalCodes([]);
		setAddressConfirmed(false)
	};

	const onCityChange = async (value) => {
		form.setFieldsValue(addressesListName ? {
			[addressesListName]: {
				[name]: {
					city: value,
					postalCode: null,
				}
			}
		} : {
			[name]: {
				city: value,
				postalCode: null,
			}
		});
		setAddressConfirmed(false)
	};

	return (
		<DataContainer>
			<DataContainer.Section>{title}</DataContainer.Section>
			<DataContainer.Content>
				<Col className="relative">
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("type-of-address-lbl")}
								value={formValues?.[name]?.addressType}
								hint={t("type-of-address-hint")}
							>
								<Form.Item
									name={[name, "addressType"]}
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
								value={formValues?.[name]?.street}
								hint={t("street-hint")}
							>
								<Form.Item
									name={[name, "street"]}
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
									<Input onChange={() => setAddressConfirmed(false)} />
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={4}>
							<FloatingLabel
								label={t("number-lbl")}
								value={formValues?.[name]?.addressNumber}
								hint={t("number-hint")}
							>
								<Form.Item
									name={[name, "addressNumber"]}
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
									<Input type="number" onChange={() => setAddressConfirmed(false)} />
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={4}>
							<Form.Item name={[name, "isDpt"]}>
								<Checkbox
									checked={isDpt}
									onChange={(e) => {
										console.log(e.target.checked)
										setIsDpt(e.target.checked)
									}}
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
										value={formValues?.[name]?.floor}
										hint={t("flat-hint")}
									>
										<Form.Item
											name={[name, "floor"]}
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
										value={formValues?.[name]?.dpto}
										hint={t("dept-hint")}
									>
										<Form.Item
											name={[name, "dpto"]}
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
								value={formValues?.[name]?.province}
								hint={t("province-hint")}
							>
								<Form.Item
									name={[name, "province"]}
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
										disabled={!residenceCountryCode}
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
								value={formValues?.[name]?.city}
								hint={t("city-hint")}
							>
								<Form.Item
									name={[name, "city"]}
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
										disabled={!formValues?.[name]?.province}
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
								value={formValues?.[name]?.postalCode}
								hint={t("postal-code-hint")}
							>
								<Form.Item
									name={[name, "postalCode"]}
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select
										allowClear={true}
										disabled={!formValues?.[name]?.city}
										showSearch
										placeholder=""
										optionFilterProp="children"
										filterOption={true}
										onChange={() => setAddressConfirmed(false)}
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

					<Row >
						<Form.Item >
							<Button
								onClick={() => handleNormalizeAddress()}
								loading={normalizingAddress}
								type="primary"
								ghost
								style={{ marginRight: "1rem" }}
							>
								{t("verify-address")}
							</Button>
							{addressConfirmed ?
								<span style={{ color: COLORS.GREEN }} >
									<CheckCircleOutlined style={{ paddingRight: ".4rem", color: COLORS.GREEN }} />
									{t("verified-address-lbl")}
								</span> :
								<span style={{ color: COLORS.RED }} >
									<WarningOutlined style={{ paddingRight: ".4rem", color: COLORS.RED }} />
									{t("unverified-address-lbl")}
								</span>}
						</Form.Item>
					</Row>
					<AddressMapModal
						visible={needAddressConfirmation}
						onOk={() => confirmAddress()}
						onCancel={() => setNeedAddressConfirmation(false)}
						mapPosition={mapPosition}
						setMapPosition={setMapPosition}
						t={t}
					/>

					<Row gutter={GUTTER}>
						<Col span={24}>
							<FloatingLabel
								label={t("observations-lbl")}
								value={formValues?.[name]?.observations}
								hint={t("observations-hint")}
							>
								<Form.Item
									name={[name, "observations"]}
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
			</DataContainer.Content >
		</DataContainer >
	);
}

export default Address;