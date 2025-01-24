import React from "react";
import HolderCard from "./holder-card/HolderCard";

export default function RoleCard({
	role,
	onSelect,
	data,
	onDelete,
	validatationErrorHolder,
	loadingSkeleton,
	canModifyRequest,
}) {
	const handleSelectRole = () => {
		onSelect(role);
	};

	switch (role.code) {
		case "HOLDER":
			return (
				<HolderCard
					data={data.holder}
					onSelect={handleSelectRole}
					onDelete={onDelete}
					validatationErrorHolder={validatationErrorHolder}
					loadingSkeleton={loadingSkeleton}
					canModifyRequest={canModifyRequest}
				/>
			);
		default:
			return null;
	}
}
