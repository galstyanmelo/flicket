import styled from "styled-components";

export const AppHeader = styled.header`
  position: absolute;
  display: flex;
  z-index: 10;
  padding: 15px 50px;
  width: calc(100% - 100px);
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    padding: 15px 20px;
    width: calc(100% - 40px);
  }

  @media (max-width: 570px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ButtonsWarpper = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(10px, 0vw, 50px);

  @media (max-width: 570px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const HeaderButton = styled.button`
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background: none;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  text-shadow: 2px 2px 4px black;

 ${(props) => props.selected && `
    background-color: #c53f3c;
    color: white;
    font-weight: bold; 
    text-shadow: none;
    border-radius: 10px;
  `}
  
  @media (max-width: 450px) {
    padding: 10px 2px;
    font-size: 15px;
  }

  &:hover {
    text-decoration: underline;
  }
`;
