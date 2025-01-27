import React, { useEffect, useState } from "react";
import { Form, Button, Divider } from "antd";
import PersonalInformation from "./personal-information/PersonalInformation";
import OrganizationInformation from "./organization-information/OrganizationInformation";
import { Inner, Buttons } from "./styles";
import Phones from "./phones/Phones";
import FiscalCategories from "./fiscal-categories/FiscalCategories";
import SkeletonComponent from "./skeleton-component/SkeletonComponent";
import Email from "./email/Email";
import Layout from "../../../../../../common/layout";
import { Link } from "react-router-dom";
import Address from "./addresses/Address";
import { apiCall, endpoints } from "sysone-endpoints-demo";
import { Footer } from "../../../../styles";

export default function HolderForm({
	initialValues,
	onCancel,
	code,
	personType,
	onSave,
	errorMessage,
	setErrorMessage,
	onFinishAdd,
	form,
	t
}) {


	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		return () => {
			setSubmitting(false);
		};
	}, []);


	if (!initialValues) return <SkeletonComponent />;

	return (
		<Inner>
			<Layout.Header>
				<Layout.Title>{t("holder-data-title")}</Layout.Title>
			</Layout.Header>
			<Form
				form={form}
				name="update-personal-information-form"
				layout="vertical"
				onFinish={onFinishAdd}
				autoComplete="off"
				initialValues={
					initialValues || {
						workMail: { type: { code: "WORK" }, value: null },
						workPhone: { type: { code: "WORK" }, value: null },
					}
				}
			>
				{personType === "INDIVIDUAL" ? (
					<PersonalInformation form={form} t={t} />
				) : (
					<OrganizationInformation form={form} t={t} />
				)}

				<Email form={form} t={t} />
				<Phones form={form} t={t} />
				<Address personType={personType} form={form} t={t} />
				<FiscalCategories
					personType={personType}
					form={form}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage} t={t}
				/>
				<Footer>
					<Divider />
					<Buttons>
						<Button type="secondary" htmlType="button">
							{t("cancel-btn")}
						</Button>
						<Button type="primary" htmlType="submit" loading={submitting}>
							{t("save-btn")}
						</Button>
					</Buttons>
				</Footer>
			</Form>
		</Inner>
	);
}
