import styled from "styled-components";
import COLORS from "../theme/colors";
import TYPO from "../theme/typo";

export const Inner = styled.div`
	margin-bottom: 20px;
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.1);
	margin-right: 30px;
	${"" /* display: flex; */}

	& .ant-btn-link {
		padding: 0 !important;
		margin: 0 !important;
		height: auto !important;
	}
`;

export const DataSection = styled(TYPO.H3)`
	display: flex;
	color: ${COLORS.SECONDARY};
	margin-bottom: 10px;
	font-weigth: bold;
`;

export const DataContent = styled.div`
	flex: 5;
	${"" /* padding-left: 20px; */}
`;

export const AddRow = styled(TYPO.H5)`
	flex: 1;
	color: ${COLORS.ANTDBLUE};
`;
