// ** React Imports
import { useDispatch, useSelector } from "react-redux";
import Cards from "react-credit-cards-2";
import { useEffect, useState } from "react";

// CSS Files
import "react-credit-cards-2/dist/es/styles-compiled.css";

// ** Style Components
import { ButtonWrapper, Container, FormWrapper, Input, InputRow } from "../../style/CardDetails";
import { FooterButton } from "../../style/SeatPicker";

// ** Utils
import { allowOnlyNumbers, alphaOnly, formatCardNumber } from "../../utils/ValidationMethods";

// Store
import { createSeatService } from "../../store/order/CreateSeatService";


export function CardDetails({ setShowPopup, selectedSeats, selectedTime }) {
  // ** Hooks
  const dispatch = useDispatch()
  const createSeatData = useSelector((state) => state.createSeat);

  // ** Variables
  const initialErrors = { number: false, expiry: false, cvc: false, name: false };
  const initialState = { number: "", expiry: "", cvc: "", name: "", focus: "" };

  // States
  const [errors, setErrors] = useState(initialErrors);
  const [state, setState] = useState(initialState);

  function handleExpirationChange(e) {
    let { value } = e.target;
    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = `${value.slice(0, 2)} / ${value.slice(2, 4)}`;
    } else if (value.length === 1 && parseInt(value, 10) > 1) {
      value = `0${value}`;
    }

    setErrors((prevValues) => ({ ...prevValues, expiry: false }));
    setState((prevValues) => ({ ...prevValues, expiry: value }));    
  }

  function validateInputs() {
    const [month, year] = state.expiry.split(" / ").map((num) => parseInt(num, 10));
    const isMonthInvalid = month < 1 || month > 12;
    const isYearInvalid = year <= 24;

    const errors = {
      expiry: state.expiry.length < 7 || isMonthInvalid || isYearInvalid,
      cvc: state.cvc.length < 3,
      number: state.number.length < 19,
      name: state.name.length === 0,
    }
    setErrors(errors);
    if (Object.values(errors).every(error => !error)) {
      const body = selectedSeats.map(seat => ({
        timetable: selectedTime?.id,
        row: seat.row,
        column: seat.column
      }));
      dispatch(createSeatService({ body }))
    }
  }

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: name === "number" ? formatCardNumber(value) : value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  function handleInputFocus(evt) {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  function handleClosePopup() {
    setShowPopup(false);
    setErrors(initialErrors);
    setState(initialState);
  }

  useEffect(() => {
    if (createSeatData.status === "fulfilled") {
      handleClosePopup()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, createSeatData]);

  return (
    <Container>
      <Cards
        number={state.number}
        expiry={state.expiry.replace(/\//g, "")}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <FormWrapper>
        {[
          { name: "number", placeholder: "Number", maxLength: 19, onKeyDown: allowOnlyNumbers, error: errors.number },
          { name: "name", placeholder: "Name", onKeyDown: alphaOnly, error: errors.name },
        ].map(({ name, placeholder, ...props }) => (
          <Input
            key={name}
            type="text"
            name={name}
            placeholder={placeholder}
            value={state[name]}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            {...props}
          />
        ))}
        <InputRow>
          {[
            { name: "expiry", placeholder: "Expiry", onChange: handleExpirationChange, error: errors.expiry, small: true },
            { name: "cvc", placeholder: "CVC", maxLength: 4, onKeyDown: allowOnlyNumbers, error: errors.cvc, small: true },
          ].map(({ name, placeholder, ...props }) => (
            <Input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={state[name]}
              onFocus={handleInputFocus}
              onChange={handleInputChange}
              {...props}
            />
          ))}
        </InputRow>
      </FormWrapper>
      <ButtonWrapper>
        <FooterButton $cancel onClick={handleClosePopup}>Cancel</FooterButton>
        <FooterButton onClick={validateInputs}>Apply</FooterButton>
      </ButtonWrapper>
    </Container>
  );
}
