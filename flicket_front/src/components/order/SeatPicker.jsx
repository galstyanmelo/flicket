// ** React Imports
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// ** Styled Components
import { Container, Footer, FooterButton, Header, NoTimetableMessage, Screen, SeatButton } from '../../style/SeatPicker'; 
import { SeatGrid, SeatRow, SeatStatus, StatusBox, StatusColor, StatusText } from '../../style/SeatPicker';
import { Info } from '../../style/MoviesTimeTable';

// ** Utils
import { getSeatVariant } from '../../utils/SeatPickerHelpers';
import { SEAT_PICKER_STATUSES } from '../../data/SeatPickerStatus';

// ** Store
import { resetTimetableSeats, timetableSeatsService } from '../../store/order/TimetableSeatsService';
import { resetCreateSeat } from '../../store/order/CreateSeatService';

// ** Custom Components
import { Modal } from '../modal/Modal';
import { CardDetails } from './CardDetails';


export function SeatPicker({ hideModal, empty, selectedTime, setSelectedTime }) {
  // ** Hooks
  const dispatch = useDispatch()
  const timetableSeatsData = useSelector((state) => state.timetableSeats);
  const createSeatData = useSelector((state) => state.createSeat);

  // ** States
  const initalState = Array(Number(process.env.REACT_APP_SEATMAP_ROWS)).fill(null).map(() => Array(Number(process.env.REACT_APP_SEATMAP_COLS)).fill('available'))
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState(initalState);
  const [reservedSeats, setReservedSeats] = useState();
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    setSelectedSeats([])
  }, [selectedTime])

  useEffect(() => {
    if (selectedTime?.id) {
      dispatch(timetableSeatsService({ id: selectedTime?.id }));
    }
  }, [dispatch, selectedTime]);

  useEffect(() => {
    if (timetableSeatsData.status === "fulfilled") {
      setReservedSeats(timetableSeatsData.data)
      dispatch(resetTimetableSeats());
    } else if (timetableSeatsData.status === "rejected") {
      dispatch(resetTimetableSeats())
    }
  }, [dispatch, timetableSeatsData]);

  useEffect(() => {
    reservedSeats?.forEach((seat) => {
      const { row, column } = seat;
      initalState[row - 1][column - 1] = 'reserved'; 
    });
    setSeats(initalState); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservedSeats]);

  useEffect(() => {
    if (createSeatData.status === "fulfilled") {
      const newSeats = [...seats];
      createSeatData.data.forEach((seat) => {
        const { row, column } = seat;
        newSeats[row - 1][column - 1] = 'reserved';
      });
      setSeats(newSeats);
      dispatch(resetCreateSeat());
      setSelectedSeats([])
      toast.remove()
      toast.success("Your seats have been successfully reserved! Enjoy your movie.", {duration: 3000})
    } else if (createSeatData.status === "rejected") {
      dispatch(resetCreateSeat())
      toast.remove()
      toast.error("Sorry, an error occurred while selecting your seats. Please try again.")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, createSeatData]);

  function handleSeatClick(rowIndex, colIndex) {
    const newSeats = [...seats];
    const currentStatus = newSeats[rowIndex][colIndex];

    if (currentStatus === 'available') {
      newSeats[rowIndex][colIndex] = 'selected';
      setSelectedSeats((prev) => [...prev, { row: rowIndex + 1, column: colIndex + 1 } ]);
    } else if (currentStatus === 'selected') {
      newSeats[rowIndex][colIndex] = 'available';
      setSelectedSeats((prev) => prev.filter((seat) => seat.row !== rowIndex + 1 || seat.column !== colIndex + 1));
    }

    setSeats(newSeats);
  };

  function handleCancelClick() {
    setSeats(initalState)
    hideModal()
    setSelectedTime(null)
  }

  return (
    <Container>
      {empty ? (
        <NoTimetableMessage>No timetable available for this movie yet. Please check back later.</NoTimetableMessage>
      ) : (
        <>
          <Header>Seat Picker</Header>
          <Screen>
            <p>Screen</p>
            <img src="/images/screen.svg" alt="" height={22} />
          </Screen>

          <SeatStatus>
            {SEAT_PICKER_STATUSES.map((status, index) => (
              <StatusBox key={index}>
                <StatusColor color={status.color} />
                <StatusText>{status.text}</StatusText>
              </StatusBox>
            ))}
          </SeatStatus>
          <SeatGrid gap="20px" $pb>
            <SeatGrid gap="4px">
              {seats.slice(0, 5).map((row, rowIndex) => (
                <SeatRow key={rowIndex}>
                  {row.map((seat, colIndex) => (
                    <SeatButton
                      key={`${rowIndex}-${colIndex}`}
                      variant={getSeatVariant(seat)}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      disabled={seat === "reserved"}
                    />
                  ))}
                </SeatRow>
              ))}
            </SeatGrid>
            <div />
            <SeatGrid gap="4px">
              {seats.slice(5).map((row, rowIndex) => (
                <SeatRow key={rowIndex + 5}>
                  {row.map((seat, colIndex) => (
                    <SeatButton
                      key={`${rowIndex + 5}-${colIndex}`}
                      variant={getSeatVariant(seat)}
                      onClick={() => handleSeatClick(rowIndex + 5, colIndex)}
                      disabled={seat === "reserved"}
                    />
                  ))}
                </SeatRow>
              ))}
            </SeatGrid>
          </SeatGrid>
        </>
      )}
      <Footer>
        <FooterButton $cancel onClick={handleCancelClick}>Cancel</FooterButton>
        {!selectedSeats.isEmpty() && <Info $price fontSize='20px'>{selectedSeats.length} Tickets: {selectedSeats.length * selectedTime.price}$</Info>}
        <FooterButton disabled={empty || selectedSeats.isEmpty()} onClick={() => setShowPopup(true)}>Order</FooterButton>
      </Footer>
      <Modal show={showPopup} onHide={() => setShowPopup(false)} component={<CardDetails {...{setShowPopup, selectedSeats, selectedTime}}/>}/>
    </Container>
  );
};