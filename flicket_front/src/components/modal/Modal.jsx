// ** Mui Imports
import Slide from "@mui/material/Slide";

// ** React Imports
import { forwardRef } from "react";

// ** Styled Components
import { StyledDialog } from "../../style/Modal";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export function Modal({ show, onHide, component }) {
  return (
    <StyledDialog open={show} TransitionComponent={Transition} keepMounted onClose={onHide}>
      {component}
    </StyledDialog>
  );
}
