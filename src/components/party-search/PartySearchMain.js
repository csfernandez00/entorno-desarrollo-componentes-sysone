import { Button, Divider, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Buttons, Footer, Inner, RolesContainer, SectionTitle } from "./styles";
import RoleCard from "./components/role-card/RoleCard";
import { useTranslation } from "../../contexts/translationContext";
import AddPerson from "./components/add-person/AddPerson";
import { apiCall, endpoints } from "sysone-endpoints-demo";
import { TranslationProvider } from "../../contexts/translationContext";

function PartySearchMain({
	onPartySelected,
	title,
	onCancel

}) {
	const { t } = useTranslation();
	const [submitting, setSubmitting] = useState(false);
	const [partyData, setPartyData] = useState(null);


	const [errorMessage, setErrorMessage] = useState("");
	const [form] = Form.useForm();
	const formValues = Form.useWatch([], form);



	return (
		<TranslationProvider>
			<Inner>
				<RolesContainer>
					<AddPerson
						title={title}
						onCancel={onCancel}
						onPartySelected={onPartySelected}
					/>
				</RolesContainer>
			</Inner>
		</TranslationProvider>
	);
}

export default PartySearchMain;
