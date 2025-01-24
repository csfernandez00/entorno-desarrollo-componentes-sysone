import React, { createContext, useContext, useState, useEffect } from "react";

const MenuContext = createContext();

export function useMenu() {
	return useContext(MenuContext);
}

const defaultPaths = [
	{
		code: "PRODUCTION_MODULE",
		path: "/production",
	},
	{
		code: "QUOTATION_SEARCH_MENU",
		path: "/production/search/QUOTATION",
	},
	{
		code: "REQUEST_SEARCH_MENU",
		path: "/production/search/REQUEST",
	},
	{
		code: "SUBSCRIPTION_SEARCH_MENU",
		path: "/production/search/SUBSCRIPTION",
	},
];

const r = [];

export function MenuProvider({ initialData, children }) {
	const [menu, setMenu] = useState(initialData);
	const [routes, setRoutes] = useState(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!menu) setRoutes(null);
		const rs = iterate([menu]);
		setRoutes(rs);
		setReady(true);
	}, []);

	const getDefaultPath = (code) => {
		console.log("code", defaultPaths, code);
		return defaultPaths.find((p) => p.code === code)?.path;
	};

	const iterate = (menus, parents = []) => {
		menus.map((m) => {
			if (!m.path) {
				m.path = getDefaultPath(m.code);
			}
			if (m.path) r.push({ m, parents });
			if (m.menus)
				iterate(m.menus, [
					...parents,
					{ code: m.code, labelCode: m.labelCode, path: m.path },
				]);
		});

		return r;
	};

	const cleanPath = (path) => {
		return path?.split("/:")[0];
	};

	return (
		<MenuContext.Provider
			value={{ menu, routes, getDefaultPath, cleanPath, ready }}
		>
			{children}
		</MenuContext.Provider>
	);
}
