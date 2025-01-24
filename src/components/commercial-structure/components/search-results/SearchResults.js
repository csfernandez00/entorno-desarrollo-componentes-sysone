import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import {
	EmptyResults,
	Inner,
	Title,
	IntemediariesList,
	ErrorMessage,
	Actions,
	Action,
} from "./styles";
import { useTranslation } from "../../../../contexts/translationContext";
import SkeletonComponent from "./skeleton-component/SkeletonComponent";
import DataContainer from "../../../../common/data-container/DataContainer";
import { apiCall, endpoints } from "sysone-endpoints-demo"



export default function SearchResults({
	title,
	results,
	pageSize,
	totalItems,
	onSelect,
	validationErrorMessage,
	setValidationErrorMessage,
	searchingIntermediary,
	onSearch,
	intermediarySelected,
	setIntermediarySelected,
}) {
	const { t } = useTranslation();
	const [searchingStructures, setSearchingStructures] = useState(false);

	const search_structures = async (code) => {
		try {
			setSearchingStructures(true);

			const res = await apiCall(endpoints.GET_INTERMEDIARY_STRUCTURES, [code]);

			const commercialStructures = res?.values?.map((ec) => {
				return {
					key: ec.code,
					name: ec.name,
					status: ec.status,
				};
			});

			const totalRows = res?.total;
			onSearch(commercialStructures, totalRows);
		} catch (error) {
			console.error(error);
		} finally {
			setSearchingStructures(false);
		}
	};

	const columns = intermediarySelected
		? [
			{
				title: t("commercial-structure-code-lbl"),
				dataIndex: "key",
				key: "key",
			},
			{
				title: t("commercial-structure-name-lbl"),
				dataIndex: "name",
				key: "name",
			},
			{
				title: t("status-lbl"),
				dataIndex: "status",
				key: "status",
				render: (data, idx) => <>{data.name}</>,
			},
			{
				title: t("actions-subtitle"),
				key: "action",
				width: "16.6%",
				ellipsis: {
					showTitle: false,
				},
				render: (data) => {
					return (
						<Actions>
							<Action
								type="link"
								onClick={() => {
									onSelect(data);
								}}
							>
								{t("select-btn")}
							</Action>
						</Actions>
					);
				},
			},
		]
		: [
			{
				title: t("intermediary-code-lbl"),
				dataIndex: "code",
				key: "code",
				ellipsis: {
					showTitle: false,
				},
			},
			{
				title: t("intermediary-name-lbl"),
				dataIndex: "name",
				key: "name",
				ellipsis: {
					showTitle: false,
				},
			},
			{
				title: t("license-number-lbl"),
				dataIndex: "licence",
				key: "licence",
				ellipsis: {
					showTitle: false,
				},
			},
			{
				title: t("intermediary-group-lbl"),
				dataIndex: "group",
				key: "group",
				ellipsis: {
					showTitle: false,
				},
			},
			{
				title: t("condition-lbl"),
				dataIndex: "status",
				key: "status",
				ellipsis: true,
			},
			{
				title: t("actions-subtitle"),
				key: "action",
				ellipsis: {
					showTitle: false,
				},
				render: (data) => {
					return (
						<Actions>
							<Action
								type="link"
								onClick={() => {
									setIntermediarySelected(data);
									search_structures(data.code);
								}}
							>
								{t("select-btn")}
							</Action>
						</Actions>
					);
				},
			},
		];

	return (
		<DataContainer style={{ marginRight: 0 }}>
			<DataContainer.Section>
				{intermediarySelected
					? `${t("commercial-structures-title")} - ${intermediarySelected?.name
					}`
					: t("intermediaries-title")}
			</DataContainer.Section>
			<DataContainer.Content>
				<Table
					size="small"
					pagination={{
						pageSize: pageSize,
						total: totalItems,
						showSizeChanger: false,
					}}
					columns={columns.filter((c) => !c.hidden)}
					dataSource={
						searchingStructures || searchingIntermediary ? [] : results
					}
					loading={searchingStructures || searchingIntermediary}
				/>
			</DataContainer.Content>
		</DataContainer>
	);
}
