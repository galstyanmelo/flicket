import styled from 'styled-components';


export const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: ${({ $image}) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: all 0.4s;
  opacity: ${({ $opacity }) => $opacity};
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 50px;

  @media (max-width: 900px) {
    padding: 0 20px;
  }

  @media (max-width: 570px) {
    justify-content: flex-end;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-top: 40px;

  @media (max-width: 600px) {
    width: 70%;
  }

  @media (max-width: 570px) {
    padding-bottom: 40px;
  }
`;

export const Title = styled.span`
  color: white;
  font-weight: bold;
  font-size: 40px;
  text-align: left;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px black;

  @media (max-width: 600px) {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

export const Plot = styled.span`
  color: white;
  text-align: left;
  text-shadow: 2px 2px 4px black;
`;

const StyledSpan = styled.span`
  color: white;
  text-align: left;
  font-size: 18px;
  text-shadow: 2px 2px 4px black;
`;

export const ProducerSpan = styled(StyledSpan)`
  margin-top: 15px;
`;

export const GenreSpan = styled(StyledSpan)`
  margin-top: 5px;
`;

export const OrderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  color: white;
  border-radius: 10px;
  height: 45px;
  width: 120px;
  cursor: pointer;
  margin-top: 15px;
  font-size: 17px;
  font-weight: 500;
  background-image: radial-gradient(circle at var(--x, 50%) var(--y, 50%), #e56b63, #9a2e2a);
`;