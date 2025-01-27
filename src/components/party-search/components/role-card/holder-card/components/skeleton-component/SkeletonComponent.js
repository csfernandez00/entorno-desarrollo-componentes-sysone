import { Skeleton, Row, Col, Button, Divider } from "antd";
import React from "react";
import DataContainer from "../../../../../../../common/data-container/DataContainer";
import { Inner } from "./styles";

export default function SkeletonComponent({ t }) {
	return (
		<DataContainer>
			<DataContainer.Section>{t("taker-data-subtitle")}</DataContainer.Section>
			<DataContainer.Content>
				<Row gutter={[7]} style={{ marginTop: "10px", marginBottom: "20px" }}>
					<Col span={4}>
						<Skeleton.Input active={true} size="default" block />
					</Col>
				</Row>
			</DataContainer.Content>
		</DataContainer>
	);
}
