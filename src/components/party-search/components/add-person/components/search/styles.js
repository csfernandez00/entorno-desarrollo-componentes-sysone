import styled from "styled-components";
import COLORS from "../../../../../../common/theme/colors";
import TYPO from "../../../../../../common/theme/typo";

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0px;
	height: 100%;
	gap: 0px;
`;

export const Controls = styled.div`
	padding: 0;
`;

export const Results = styled.div`
	padding: 0;
`;

export const Introductory = styled(TYPO.H3)`
	color: ${COLORS.SECONDARY};
	font-weight: 200;
`;
