import { AsyncImage } from 'loadable-image';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: calc(100% - 100px);
  display: flex;
  justify-content: flex-end;
  margin: 0 50px;

  @media (max-width: 900px) {
    margin: 0 20px;
    width: calc(100% - 40px);
  }
`;

export const SearchBox = styled.div`
  background-color: white;
  border-radius: 40px;
  height: 60px;
  width: 300px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px, rgba(0, 0, 0, 0.08) 0px 1px 2px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  margin: 0 10px;
  height: 35px;
  font-size: 18px;
  width: 215px;
`;

export const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background-color: #c23939;
  border-radius: 50%;
  position: absolute;
  right: 10px;
  top: 6px;
  cursor: pointer;
`;

export const ListContainer = styled.div`
  width: calc(100% - 100px);
  padding: 25px 50px;
  display: flex;
  align-items: center;
  overflow-y: scroll;
  gap: 15px;
  background: linear-gradient(to top, black, transparent);

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 900px) {
    padding: 25px 20px;
    width: calc(100% - 40px);
  }

  @media (max-width: 700px) {
    padding: 20px 20px 0 20px;
    width: calc(100% - 40px);
  }
`;

export const MovieItem = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 20px;
  height: 330px;
  width: 250px;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  @media (max-width: 1500px) {
    height: 300px;
    width: 240px;
  }

  @media (max-width: 900px) {
    height: 200px;
    width: 150px;
  }

  ${({ $selected }) => $selected && "transform: translateY(-15px)"};

  &:hover {
    transform: translateY(-15px);
  }
`;

export const StyledAsyncImage = styled(AsyncImage)`
  border-radius: 20px;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const MovieImage = styled.img`
  border-radius: 20px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  ${({$isloading}) => ($isloading && 'filter: blur(10px)')};
`;

export const RateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: absolute;
  background-color: white;
  border-radius: 5px;
  bottom: 10px;
  left: 10px;
  padding: 2px 4px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

export const Rate = styled.div`
  color: #fec400;
  font-size: 20px;
  font-weight: bold;
`;

export const NotFoundMessage = styled.div`
  width: 100%;
  color: white;
  font-size: 32px;
  padding: 40px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
