import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  background-color: #0f1315;
  padding: 15px 0;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;

  @media (max-width: 500px) {
    width: 290px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
`;

export const Input = styled.input`
  height: 45px;
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.error ? "0 0 10px 5px rgba(255, 0, 0, 0.4)" : "none")};
  border-radius: 8px;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #b0b0b0")};
  outline: none;
  font-size: 16px;
  padding: 0 5px;
  color: white;
  background-color: #0f1315;
  width: ${(props) => (props.small && "50%")} ;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 450px;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 500px) {
    width: 290px;
    justify-content: space-between;
  }
`;