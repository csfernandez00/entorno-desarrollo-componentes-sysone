import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { Action, EmptyResults, Inner, Title } from "./styles";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import CreateOrganization from "../create-organization/CreateOrganization";

export default function SearchResultsOrganization({
	title,
	setResultsTitle,
	results,
	onSelect,
	onResult,
	submitting,
	createData,
	setCreatingParty,
}) {
	const { t } = useTranslation();
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		setResultsTitle(
			`${t("legal-person-search-result-title")}: (${results?.length})`
		);
	}, [results]);

	const columns = [
		{
			title: t("business-name-subtitle"),
			dataIndex: "name",
			key: "name",
		},
		{
			title: t("id-type-lbl"),
			dataIndex: "identificationType",
			key: "identificationType",
			render: (data) => (
				<>{data.name}</>
			),
		},
		{
			title: t("identification-number-lbl"),
			dataIndex: "identificationValue",
			key: "identificationValue",
		},
		{
			title: t("actions-subtitle"),
			key: "action",
			render: (data) => (
				<Action type="link" htmlType="button" onClick={() => onSelect(data)}>
					{t("select-btn")}
				</Action>
			),
		},
	];

	return (
		<Inner>
			{modalVisible ? (
				<CreateOrganization
					onSelect={onSelect}
					onResult={onResult}
					createData={createData}
					setCreatingParty={setCreatingParty}
					setModalVisible={setModalVisible}
				/>
			) : submitting || (results && results?.length > 0) || (!results && !submitting) ? (
				<Table
					pagination={{
						position: "bottomRight",
						pageSize: 10,
					}}
					size="small"
					columns={columns.filter((c) => !c.hidden)}
					dataSource={results}
					loading={submitting}
				/>
			) : (
				results &&
				!results.length && (
					<EmptyResults>
						<Title>{t("no-information-with-search-criteria-lbl")}</Title>
						<Button
							type="link"
							onClick={() => {
								setModalVisible(true);
								setCreatingParty(true);
							}}
						>
							{t("create-new-person-btn")}
						</Button>
					</EmptyResults>
				)
			)}
		</Inner>
	);
}
