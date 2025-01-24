import styled from "styled-components";
import COLORS from "../../../../common/theme/colors";
import TYPO from "../../../../common/theme/typo";

export const Inner = styled.div``;

export const Title = styled(TYPO.H2)`
	padding-bottom: 20px;
	color: ${COLORS.SECONDARY};
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: right;
	& button {
		margin-left: 20px !important;
	}
`;

export const ButtonsFixedFooter = styled.div`
	margin-top: 30px;
	flex-direction: row;
	& button {
		margin-right: 20px !important;
	}
`;
