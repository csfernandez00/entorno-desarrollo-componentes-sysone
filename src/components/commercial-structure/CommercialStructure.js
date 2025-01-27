import React, { useState, useEffect } from "react";
import SearchForm from "./components/search-form/SearchForm";
import SearchResults from "./components/search-results/SearchResults";
import { Button, Col, Modal } from "antd";


function CommercialStructure({
	intermediarySelected,
	setIntermediarySelected,
	setModalCommercialStructureVisible,
	onSelected,
	visible,
	handleCancelCommercialStructure,
	results,
	setResults, t
}) {


	const [totalItems, setTotalItems] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	const [validationErrorMessage, setValidationErrorMessage] = useState("");
	const [searchingIntermediary, setSearchingIntermediary] = useState(false);

	useEffect(() => { }, []);

	const handleCommercialStructureSelection = (commercialStructure) => {
		onSelected(commercialStructure)
		setModalCommercialStructureVisible(false);
	};

	const onSearch = (results, total) => {
		setTotalItems(total);
		setResults(results || []);
	};

	return (
		<Modal
			title={t("search-commercial-structure-title")}
			visible={visible}
			onCancel={handleCancelCommercialStructure}
			width={"1200px"}
			centered={true}
			destroyOnClose={true}
			footer={[
				<Button onClick={handleCancelCommercialStructure} key={"cancel-btn"}>
					{t("cancel-btn")}
				</Button>,
			]}
		>
			<Col>
				<SearchForm
					onSearch={onSearch}
					setSearchingIntermediary={setSearchingIntermediary}
					setIntermediarySelected={setIntermediarySelected}
					t={t}
				/>
				<SearchResults
					results={results}
					pageSize={pageSize}
					totalItems={totalItems}
					onSearch={onSearch}
					onSelect={handleCommercialStructureSelection}
					validationErrorMessage={validationErrorMessage}
					setValidationErrorMessage={setValidationErrorMessage}
					searchingIntermediary={searchingIntermediary}
					intermediarySelected={intermediarySelected}
					setIntermediarySelected={setIntermediarySelected}
					t={t}
				/>

			</Col>
		</Modal>
	);
}

export default CommercialStructure;
