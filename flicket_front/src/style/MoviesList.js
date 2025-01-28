import { AsyncImage } from 'loadable-image';
import styled from 'styled-components';

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
`;

export const MovieItem = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 20px;
  height: 330px;
  width: 250px;
  flex-shrink: 0;
  transition: transform 0.3s ease;

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