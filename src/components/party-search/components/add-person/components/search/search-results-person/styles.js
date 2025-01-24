import styled from "styled-components";
import { Button, Skeleton } from "antd";

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Title = styled.div`
	margin-bottom: 20px;
	flex-direction: row;
`;

export const EmptyResults = styled.div``;

export const Action = styled(Button)`
	margin: 0 !important;
`;

export const SkeletonTable = styled(Skeleton)``;
