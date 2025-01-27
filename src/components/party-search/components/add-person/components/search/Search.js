import React, { useEffect, useState } from "react";
import SearchResultsOrganization from "./search-results-organization/SearchResultsOrganization";
import PersonTypeSelector from "../../../../../../common/person-type-selector/PersonTypeSelector";
import SearchFormOrganization from "./search-form-organization/SearchFormOrganization";
import SearchFormPerson from "./search-form-person/SearchFormPerson";
import SearchResultsPerson from "./search-results-person/SearchResultsPerson";
import { Controls, Inner, Results, Introductory } from "./styles";
import moment from "moment";
import { apiCall, endpoints } from "sysone-endpoints-demo";
import { Col, Modal, Row } from "antd";
import { SectionTitle } from "../../../../styles";

export default function Search({ onSelect, onCancelSearch, title, t }) {
	const [personType, setPersonType] = useState("INDIVIDUAL");
	const [data, setData] = useState(null);
	const [resultsTitle, setResultsTitle] = useState(null);
	const [introductoryMessage, setIntroductoryMessage] = useState("");
	const [createData, setCreateData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [creatingParty, setCreatingParty] = useState(false);

	useEffect(() => {
		setIntroductoryMessage(title);
	}, []);

	const onPersonTypeSelect = (value) => {
		setPersonType(value);
		setData(null);
	};

	const handleSelect = async (item) => {
		if (personType === "INDIVIDUAL") {
			const data = await apiCall(endpoints.GET_PERSON_BY_CODE, [item.key]);
			const practice = data?.practices?.values[0];

			const init = {
				code: item.key,
				personType: personType,
				identificationType: item.identificationType.code,
				identificationValue: item.identificationValue,
				identifications: data?.identifications?.values?.map((i) => ({
					identificationValue: i.value,
					identificationType: i.type.code,
					default: i.default
				})),
				lastName: data.data.lastName,
				firstName: data.data.firstName,
				birthdate: data.data.birthdate
					? moment(data.data.birthdate, "yyyy-MM-DD")
					: null,
				genderCode: data.data.gender.code,
				maritalStatusCode: data.data.maritalStatus?.code,
				residenceCountryCode: data.data.country.code,
				nationality: data?.nationalities?.values[0]?.code,
				workerType: data?.workerTypes?.values[0]?.code,
				practice: practice?.isicCode,
				activity: practice?.activity?.code,
				sector: practice?.activity?.sector?.code,
				economicClass: data?.economicClasses?.values[0]?.code,
				workMail: data.mails?.values?.find(
					(mail) => mail.type.code === "WORK"
				) || { type: { code: "WORK" }, value: null },
				phones: data.phones
					? data.phones.values?.map((phone) => {
						return {
							phoneType: phone.type.code,
							phone: phone.number,
							areaCode: phone.areaCode,
							locationCode: phone.locationCode,
							intern: phone.extension,
						};
					})
					: [],
				addresses: data.addresses
					? data.addresses.values.map((address) => {
						return {
							street: address.street,
							addressNumber: address.number,
							floor: address.floor,
							dpto: address.apartment,
							observations: address.observations,
							city: address.city.code,
							province: address.city.province.code,
							postalCode: address.postalCode.number,
							addressType: address.type.code,
						};
					})
					: [],
				fiscalCategory:
					data.fiscalCategories && data.fiscalCategories.values
						? data.fiscalCategories.values[0]?.fiscalCategory?.code
						: null,
			};

			onSelect(init);
		} else {
			const data = await apiCall(endpoints.GET_ORGANIZATION_BY_CODE, [
				item.key,
			]);

			const practice = data?.practices?.values[0];

			const init = {
				code: item.key,
				personType: personType,
				identificationType: item.identificationType.code,
				identificationValue: item.identificationValue,
				identifications: data?.identifications?.values?.map((i) => ({
					identificationValue: i.value,
					identificationType: i.type.code,
					default: i.default
				})),
				name: data.data.name,
				foundationDate: data.data.foundationDate
					? moment(data.data.foundationDate, "yyyy-MM-DD")
					: null,
				type: data.data.typeCode?.code,
				residenceCountryCode: data.data.hostCountry.code,
				practice: practice?.isicCode,
				activity: practice?.activity?.code,
				sector: practice?.activity?.sector?.code,
				workMail: data.mails?.values?.find(
					(mail) => mail.type.code === "WORK"
				) || { type: { code: "WORK" }, value: null },
				phones: data.phones
					? data.phones.values?.map((phone) => {
						return {
							phoneType: phone.type.code,
							phone: phone.number,
							areaCode: phone.areaCode,
							locationCode: phone.locationCode,
							intern: phone.extension,
						};
					})
					: [],
				addresses: data.addresses
					? data.addresses.values.map((address) => {
						return {
							street: address.street,
							addressNumber: address.number,
							floor: address.floor,
							dpto: address.apartment,
							observations: address.observations,
							city: address.city.code,
							province: address.city.province.code,
							postalCode: address.postalCode.number,
							addressType: address.type.code,
						};
					})
					: [],
				fiscalCategory:
					data.fiscalCategories && data.fiscalCategories.values
						? data.fiscalCategories.values[0]?.fiscalCategory?.code
						: null,
			};

			onSelect(init);
		}
	};

	const handleFound = (data, searchParams) => {
		if (personType === "INDIVIDUAL") {
			setResultsTitle(
				`${t("result-search-natural-person-title")}: (${data?.length})`
			);
		} else {
			setResultsTitle(
				`${t("legal-person-search-result-title")}: (${data?.length})`
			);
		}

		setCreateData({ ...searchParams, personType: personType });

		setData(data || []);
	};

	const onResult = (results) => {
		setData(results || []);
	};

	return (
		<Modal
			title={<SectionTitle>{t("search-holder-title")}</SectionTitle>}
			width={"60%"}
			visible={true}
			footer={null}
			onCancel={onCancelSearch}
		>
			<Inner>
				{!creatingParty && (
					<Controls>
						<Row
							style={{
								flexWrap: "nowrap",
								width: "100%"
							}}
							gutter={10}
						>
							<Col span={4}>
								<PersonTypeSelector
									t={t}
									actions={null}
									value={personType}
									onChange={onPersonTypeSelect}
									minified={true}
								/></Col>

							<Col span={20}>{personType === "INDIVIDUAL" ? (
								<SearchFormPerson
									onCancelSearch={onCancelSearch}
									onFound={handleFound}
									setLoading={setLoading}
									t={t}
								/>
							) : (
								<SearchFormOrganization
									onCancelSearch={onCancelSearch}
									onFound={handleFound}
									setLoading={setLoading}
									t={t}
								/>
							)}</Col>
						</Row>
					</Controls>
				)}
				<Results>
					{personType === "INDIVIDUAL" ? (
						<SearchResultsPerson
							title={resultsTitle}
							setResultsTitle={setResultsTitle}
							results={data}
							onSelect={handleSelect}
							onResult={onResult}
							createData={createData}
							submitting={loading}
							setCreatingParty={setCreatingParty}
							t={t}
						/>
					) : (
						<SearchResultsOrganization
							title={resultsTitle}
							setResultsTitle={setResultsTitle}
							results={data}
							onSelect={handleSelect}
							onResult={onResult}
							createData={createData}
							submitting={loading}
							setCreatingParty={setCreatingParty}
							t={t}
						/>
					)}
				</Results>
			</Inner>
		</Modal>
	);
}
