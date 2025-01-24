import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { Action, EmptyResults, Inner, Title } from "./styles";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import CreatePerson from "../create-person/CreatePerson";

export default function SearchResultsPerson({
	title,
	setResultsTitle,
	results,
	onSelect,
	onResult,
	createData,
	submitting,
	setCreatingParty,
}) {
	const { t } = useTranslation();
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		setResultsTitle(
			`${t("result-search-natural-person-title")}: (${results?.length})`
		);
	}, [results]);

	const columns = [
		{
			title: t("name-lbl"),
			dataIndex: "firstName",
			key: "firstName",
		},
		{
			title: t("last-name-lbl"),
			dataIndex: "lastName",
			key: "lastName",
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
			render: (data) => {
				return (
					<Action htmlType="button" type="link" onClick={() => onSelect(data)}>
						{t("select-btn")}
					</Action>
				);
			},
		},
	];

	return (
		<Inner>
			{modalVisible ? (
				<CreatePerson
					onResult={onResult}
					createData={createData}
					setCreatingParty={setCreatingParty}
					setModalVisible={setModalVisible}
					onSelect={onSelect}
				/>
			) : submitting || (results && results?.length > 0) || (!results && !submitting) ? (
				<Table
					size="small"
					columns={columns.filter((c) => !c.hidden)}
					dataSource={results}
					loading={submitting}
					pagination={{
						position: "bottomRight",
						pageSize: 10,
					}}
				/>
			) : (
				results &&
				!results?.length && (
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
