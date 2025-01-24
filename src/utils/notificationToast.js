import React from "react";
import { notification } from "antd";

const TYPE = {
	SUCCESS: "success",
	ERROR: "error",
	INFO: "info",
	WARNING: "warning",
};

const openNotificationWithIcon = (type, message, description, subErrors) => {
	return notification[type]({
		message,
		description: (
			<>
				{description ? (
					<>
						{description}
						<br />
					</>
				) : null}

				{subErrors?.map((e, idx) => (
					<React.Fragment key={`sub_error_${idx}`}>
						<div style={{ fontSize: "16px" }}>- {e}</div>
						<br />
					</React.Fragment>
				))}
			</>
		),
	});
};

export { openNotificationWithIcon, TYPE };
