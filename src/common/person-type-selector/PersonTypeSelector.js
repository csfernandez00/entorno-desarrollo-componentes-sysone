import React, { useState } from "react";

import { IconButton, Inner } from "./styles";
import { IoBusinessOutline, IoPersonOutline } from "react-icons/io5";
import { Radio } from "antd";
import { useActions } from "../../contexts/actionsContext";
// import "antd/lib/radio/style/index.css";

export default function PersonTypeSelector({
	value,
	onChange,
	actions,
	minified,
	includeOrganisation = true,
	t
}) {
	const { hasAction } = useActions();

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<Inner>
			<Radio.Group
				value={value}
				buttonStyle="solid"
				optionType="button"
				onChange={handleChange}
			>
				{/* {hasAction(actions[0]) && (
					<Radio.Button value="INDIVIDUAL" className="truncate">
						<IconButton>
							<IoPersonOutline />
							{t("physical-person-lbl")}
						</IconButton>
					</Radio.Button>
				)}

				{hasAction(actions[1]) && (
					<Radio.Button value="ORGANISATION" className="truncate">
						<IconButton>
							<IoBusinessOutline />
							{t("legal-person-lbl")}
						</IconButton>
					</Radio.Button>
				)} */}

				{/* Codigo original es el de arriba, no sabia como manjear el tema de action y lo comente */}

				<Radio.Button value="INDIVIDUAL" className="truncate">
					<IconButton>
						<IoPersonOutline />
						{minified ? "\xa0" : t("physical-person-lbl")}
					</IconButton>
				</Radio.Button>

				{includeOrganisation && (
					<Radio.Button value="ORGANISATION" className="truncate">
						<IconButton>
							<IoBusinessOutline />
							{minified ? "\xa0" : t("legal-person-lbl")}
						</IconButton>
					</Radio.Button>
				)}
			</Radio.Group>
		</Inner>
	);
}
