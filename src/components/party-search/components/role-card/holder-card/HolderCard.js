import { Button } from "antd";
import React, { useEffect } from "react";

import DataContainer from "../../../../../common/data-container/DataContainer";
import { Inner, ErrorMessage, Container } from "./styles";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import COLORS from "../../../../../common/theme/colors";
import SkeletonComponent from "./components/skeleton-component/SkeletonComponent";
import { SectionTitle } from "../../../styles";

export default function HolderCard({
	data,
	onSelect,
	onDelete,
	validatationErrorHolder,
	loadingSkeleton,
	canModifyRequest,
	t
}) {


	if (loadingSkeleton) return <SkeletonComponent />;

	return (
		<DataContainer>
			<SectionTitle>{t("holder-data-subtitle")}</SectionTitle>
			<DataContainer.Content>
				{data ? (
					<Inner>
						{data.data.name}
						<CloseCircleOutlined
							style={{
								marginLeft: "10px",
								color: canModifyRequest ? COLORS.RED : COLORS.GREY,
								cursor: canModifyRequest ? "pointer" : "not-allowed",
							}}
							onClick={() => (canModifyRequest ? onDelete(data) : null)}
						/>
					</Inner>
				) : (
					<Container>
						<Button type="link" onClick={onSelect}>
							<PlusOutlined /> {t("add-btn")}
						</Button>
						{validatationErrorHolder ? (
							<ErrorMessage>{validatationErrorHolder}</ErrorMessage>
						) : null}
					</Container>
				)}
			</DataContainer.Content>
		</DataContainer>
	);
}
