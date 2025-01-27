import { Button, Divider, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Buttons, Footer, Inner, RolesContainer, SectionTitle } from "./styles";
import RoleCard from "./components/role-card/RoleCard";
import AddPerson from "./components/add-person/AddPerson";
import { apiCall, endpoints } from "sysone-endpoints-demo";

function PartySearchMain({
	onPartySelected,
	title,
	onCancel,
	t

}) {

	return (
		<Inner>
			<RolesContainer>
				<AddPerson
					title={title}
					onCancel={onCancel}
					onPartySelected={onPartySelected}
					t={t}
				/>
			</RolesContainer>
		</Inner>
	);
}

export default PartySearchMain;
