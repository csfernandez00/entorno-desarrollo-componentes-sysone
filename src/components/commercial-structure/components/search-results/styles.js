import styled from "styled-components";
import { Button, Skeleton, Checkbox } from "antd";
import COLORS from "../../../../common/theme/colors";

export const Inner = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
export const Center = styled.div`
	margin-left: 2rem;
`;

export const Title = styled.div``;

export const EmptyResults = styled.div``;

export const Actions = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

export const Action = styled(Button)`
	display: flex !important;
	align-items: center;
	gap: 10px;
	padding: 0 !important;
	margin: 0 !important;
`;

export const IntemediariesList = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	text-overflow: ellipsis;
	${"" /* height: 60px; */}
`;

export const ErrorMessage = styled.div`
	color: ${COLORS.RED};
	font-size: 14px;
	font-weight: lighter;
	padding-left: 1rem;
	padding-top: 2px;
`;
