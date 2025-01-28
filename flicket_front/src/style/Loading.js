import styled from "styled-components";

export const CenteredAnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || "100vh"};
  width: ${({ width }) => width || "100vw"};
`;
