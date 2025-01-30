// ** React Imports
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// ** Style Components
import { AppHeader, ButtonsWarpper, HeaderButton, Logo, Spacer } from "../../style/Header";

// ** Store
import { cineroomsService } from "../../store/cineroom/CineroomsService";

export function Header({ setSelectedCineroom, selectedCineroom }) {
  // ** Hooks
  const dispatch = useDispatch();
  const cineroomsData = useSelector((state) => state.cinerooms);

  // ** States
  const [cinerooms, setCinerooms] = useState([]);

  useEffect(() => {
    dispatch(cineroomsService());
  }, [dispatch]);

  useEffect(() => {
    if (cineroomsData.status === "fulfilled") setCinerooms(cineroomsData.data);
  }, [cineroomsData?.status, cineroomsData?.data]);

  return (
    <AppHeader>
      <Spacer/>
      <Logo src="/images/logo.png" alt="" />
      <ButtonsWarpper>
        {cinerooms?.map((cinema, index) => (
          <HeaderButton key={index} onClick={() => setSelectedCineroom(cinema.id)} selected={selectedCineroom === cinema.id}>
            {cinema.name}
          </HeaderButton>
        ))}
      </ButtonsWarpper>
    </AppHeader>
  );
}
