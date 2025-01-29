import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 50px);
  background-color: #0f1315;
  padding: 0 25px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-top: 25px;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 500px) {
    align-items: center;
  }
`;

export const Title = styled.span`
  color: white;
  font-size: 32px;
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CategoryText = styled.span`
  color: white;
  font-size: 18px;
`;

export const TimesContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 25px;
  padding-top: 35px;
  overflow-y: scroll;

  ${({ $selectedTime }) => !$selectedTime && "padding-bottom: 40px"};
`;

export const TimeItem = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  background-color: #36383a;
  ${({ selected }) => selected && `
    border: 1px solid #c43a39;
    transform: translateY(-8px);
  `}
  border-radius: 10px;
  width: 150px;
  padding: 10px;
  cursor: ${({ $available }) => $available ? "pointer" : "not-allowed"};
  gap: 10px;

  transition: transform 0.3s ease;

  &:hover {
    ${({$available}) => $available && "transform: translateY(-8px)"};
  }

`;

export const Info = styled.span`
  color: ${({ color }) => color || 'white'};
  font-size: ${({ fontSize }) => fontSize || '18px'};

  @media (max-width: 500px) {
    ${({ $price }) => $price && "font-size: 15px"};
  }
`;

export const NoDatesMessage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 25px 0;
  height: 100px;
`;