import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const NoTimetableMessage = styled.p`
  color: white;
  font-size: 30px;
  text-align: center;
`;

export const Header = styled.span`
  color: white;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const SeatGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({gap}) => gap};
  ${({$pb}) => $pb && "padding-bottom: 15px"};
`;

export const SeatRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const SeatButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) =>
    props.variant === 'available'
      ? '#FCE5E5'
      : props.variant === 'selected'
      ? '#c53e3a'
      : '#6c757d'};
  border: 2px solid #333;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: ${(props) => (props.variant === 'reserved' ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
  &:hover {
    transform: ${(props) => (props.variant === 'reserved' ? 'none' : 'scale(1.1)')};
  }
  &:disabled {
    background-color: #6c757d;
  }

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

export const SeatStatus = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  gap: 20px;
`;

export const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StatusColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const StatusText = styled.span`
  color: white;
  font-size: 16px;
`;

export const Screen = styled.div`
  background-color: #36383a;
  color: white;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 40px;
`;

export const Footer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #0f1315;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  color: white;
`;

export const FooterButton = styled.button`
  padding: 0px 5px;
  background-color: ${({ $cancel }) => ($cancel ? '#36383a' : '#c53e3a')};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-weigth: 500;
  width: 120px;
  height: 45px;
  cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
  opacity: ${({disabled}) => disabled ? "0.4" : "1"};

  &:hover {
    background-color: ${({ $cancel }) => ($cancel ? '#5a6268' : '#b52f2f')};
  }
`;