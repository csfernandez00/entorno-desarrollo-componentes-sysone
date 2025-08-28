import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function useProduct() {
	return useContext(ProductContext);
}

export function ProductProvider({ children }) {
	const [initialInfo, setInitialInfo] = useState(null);

	const numberFormatter = (value, { userTyping, input }) => {
		let [ent, dec] = value.toString().split(".");
		if (dec === undefined) {
			dec = input.split(",")[1];
		}
		return dec
			? `${`${ent}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${value.toString().includes(",") ? "" : ","
			}${dec}`
			: `${`${ent}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
	};

	const formatNumberES = (n, d = 0) => {
		n = new Intl.NumberFormat("de-DE").format(parseFloat(n)?.toFixed(d));
		if (d > 0) {
			const decimals = n.indexOf(",") > -1 ? n.length - 1 - n.indexOf(",") : 0;

			n =
				decimals == 0 ? n + "," + "0".repeat(d) : n + "0".repeat(d - decimals);
		}
		return n;
	};

	return (
		<ProductContext.Provider
			value={{
				initialInfo,
				setInitialInfo,
				numberFormatter,
				formatNumberES,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}
