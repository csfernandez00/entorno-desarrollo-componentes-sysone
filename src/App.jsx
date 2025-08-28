import React from "react";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/es_ES";
import "./index.css";
import { TranslationProvider } from "./contexts/translationContext";
import { MenuProvider } from "./contexts/menuContext";
import { ActionsProvider } from "./contexts/actionsContext";
import Main from "./components/Main";
//import { axiosInstance } from "sysone-endpoints-demo";

import { axiosInstance } from "@sysone/components";
import { ProductProvider } from "./contexts/ProductContext";

export default ({ history, menu }) => {
	const token = localStorage.getItem("auth_token");
	const roles = localStorage.getItem("auth_roles");
	const tenant = localStorage.getItem("auth_tenant");
	const userid = localStorage.getItem("user_id");
	const xApiKey = localStorage.getItem("x-api-key");

	axiosInstance.interceptors.request.use(
		(config) => {
			config.baseURL = process.env.REACT_APP_API_BASE_URL;
			config.headers.Authorization = `Bearer ${token}`;
			config.headers["X-Tenant"] = "sysone";
			config.headers["X-User"] = "sysone";
			config.headers["X-Api-Key"] =
				"PYRxE7iBUFCFcDmTwIFGEkvSMzJ88hSU4uWG0DL0ebk1CYVamsa6phIlsECQQMqkM0XXtZ5K1L85cyr3MgkIhtjlIh4niBsagiVRjzIaqNKxSU2N8Y7KaZLItDB2oDTc";
			config.params = {
				...config.params,
				// roles,
			};
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return (
		<TranslationProvider initialData={menu.labels}>
			<ConfigProvider locale={locale}>
				<MenuProvider initialData={menu}>
					<ActionsProvider initialData={menu}>
						<ProductProvider>
							<Main history={history} />
						</ProductProvider>
					</ActionsProvider>
				</MenuProvider>
			</ConfigProvider>
		</TranslationProvider>
	);
};
