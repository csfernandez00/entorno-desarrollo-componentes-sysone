import React, { useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { useMenu } from "../contexts/menuContext";
import { useActions } from "../contexts/actionsContext";
import { useTranslation } from "../contexts/translationContext";
// import { PaymentMethods } from "./payment-methods/PaymentMethods";
import { PaymentMethods } from "sysone-endpoints-demo";
import { Form, Modal } from "antd";
import { PartySearch } from "./party-search/PartySearch";
import PruebaUsoComponente from "./PruebaUsoComponente";

export default function Main({ history }) {
	const { menu, routes, ready } = useMenu();
	const { actions } = useActions();
	const { translations, t } = useTranslation();
	if (!menu || !routes || !actions || !translations)
		return <div>Loading...</div>;

	return (
		<Router history={history}>
			<Route exact path="/">
				{/* <PaymentMethods
					onAddPaymentMethod={(data) => console.log("AGREGANDO", data)}
					fixedFooter={false}
					dataFormattedForEndpoint={true}
				/> */}
				<PruebaUsoComponente />
			</Route>
		</Router>
	);
}
