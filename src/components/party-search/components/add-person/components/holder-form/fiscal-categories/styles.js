import styled from "styled-components";
import { Button } from "antd";
import COLORS from "../../../../../../../common/theme/colors";

export const Inner = styled.span`
	flex-direction: column;
	border: 1px solid grey;
	padding: 0.5rem;
	margin-top: 1rem;
	border-radius: 5px;
`;
export const ErrorMessage = styled.div`
	color: ${COLORS.RED};
	font-size: 14px;
	padding-top: 5px;
	padding-left: 10px;
`;

export const Container = styled.div`
	height: 20px;
`;
