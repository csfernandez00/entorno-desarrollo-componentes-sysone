import { Skeleton, Row, Col } from "antd";
import React from "react";
import DataContainer from "../../../../../../../common/data-container/DataContainer";


export default function SkeletonComponent({ t }) {

	return (
		<>
			<DataContainer>
				<DataContainer.Section>
					{t("organization-data-subtitle")}
				</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={[16]}>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}></Col>
					</Row>

					<Row
						gutter={[16]}
						style={{ marginBottom: "10px", marginTop: "10px" }}
					>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}></Col>
					</Row>
					<Row gutter={[16]}>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
			<DataContainer>
				<DataContainer.Section>
					{t("identifications-title")}
				</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={[16]}>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}></Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
			<DataContainer>
				<DataContainer.Section>Emails</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={[16]}>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}></Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
			<DataContainer>
				<DataContainer.Section>{t("phones-lbl")}</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={[16]}>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col>
							<Row gutter={[16]}>
								<Col>
									<Skeleton.Input size="default" active block />
								</Col>
								<Col>
									<Skeleton.Input size="default" active block />
								</Col>
							</Row>
						</Col>
						<Col>
							<Skeleton.Input size="default" active block />
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
			<DataContainer>
				<DataContainer.Section>{t("home-title")}</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={[16]}>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}></Col>
						<Col span={8}></Col>
					</Row>
					<Row
						gutter={[16]}
						style={{ marginBottom: "10px", marginTop: "10px" }}
					>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={4}>
							<Skeleton.Input size="default" active />
						</Col>
						<Col span={8}></Col>
					</Row>
					<Row
						gutter={[16]}
						style={{ marginBottom: "10px", marginTop: "10px" }}
					>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
						<Col span={8}>
							<Skeleton.Input size="default" active block />
						</Col>
					</Row>
					<Row gutter={[16]}>
						<Col span={24}>
							<Skeleton.Input size="default" active block />
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
			<DataContainer>
				<DataContainer.Section>{t("tax-data-subtitle")}</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={[16]}>
						<Col span={16}>
							<Skeleton.Input size="default" active block />
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
			<DataContainer>
				<DataContainer.Section></DataContainer.Section>
				<DataContainer.Content>
					{" "}
					<Skeleton.Button active size="default" />
				</DataContainer.Content>
			</DataContainer>
		</>
	);
}
