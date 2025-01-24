import styled from "styled-components";

export const Inner = styled.div`
	margin: 0px 0 20px 0;
	& .ant-radio-group {
		display: flex !important;
	}
	& .ant-radio-button-wrapper {
		flex: 1 1 0% !important;
	}
`;

export const IconButton = styled.div`
	display: flex;
	flex-wrap: nowrap;

	gap: 10px;
	justify-content: center;
	align-items: center;
`;
