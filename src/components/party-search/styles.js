import styled from "styled-components";
import COLORS from "../../common/theme/colors";
import typo from "../../common/theme/typo";

export const Inner = styled.div`
	padding: 2rem;
`;

export const SectionTitle = styled(typo.H2)`
	color: ${COLORS.SECONDARY};
	margin-bottom: 1rem !important;
`;

export const RolesContainer = styled.div``;

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
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
	z-index: 1000;
	position: fixed;
	bottom: 0;
	background-color: ${COLORS.WHITE};
	& .ant-divider-horizontal {
		margin-top: 0px;
	}
`;
