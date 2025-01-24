import styled from "styled-components";
import COLORS from "../../common/theme/colors";
import TYPO from "../../common/theme/typo";

export const Inner = styled.div`
	padding: 2rem;
`;

export const EmptyData = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const CardHeader = styled.div`
	font-size: 20px;
	font-weight: bold;
	line-height: 20px;
	padding-left: 0;
	padding-bottom: 0.5rem;
	color: ${COLORS.SECONDARY};
`;
export const SectionTitle = styled(TYPO.H2)`
	color: ${COLORS.SECONDARY};
	margin-bottom: 1rem !important;
`;

export const Buttons = styled.div`
	flex-direction: row;
	& button {
		margin-right: 20px !important;
	}
`;
export const Footer = styled.div`
	width: 100%;
	padding: 50px 0;
	padding-top: 0px;
	position: fixed;
	bottom: 0;
	z-index: 2000;
	background-color: ${COLORS.WHITE};
	& .ant-divider-horizontal {
		margin-top: 0px;
	}
`;
