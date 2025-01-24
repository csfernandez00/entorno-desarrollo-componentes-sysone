import styled from "styled-components";

export const Inner = styled.div`
	padding-bottom: 10rem;
	& .ant-form-item-explain,
	.ant-form-item-extra {
		padding-bottom: 10px !important;
		line-height: 1.2 !important;
	}
`;
export const Row = styled.div`
	display: flex;
	align-items: center;
`;
export const Title = styled.div``;
export const Col = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Buttons = styled.div`
	flex-direction: row;
	& button {
		margin-right: 20px !important;
	}
`;
