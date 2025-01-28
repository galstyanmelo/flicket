// ** React Imports
import { useRef, useState } from "react";

// ** Style Components
import { AppContainer, Content, ContentContainer, GenreSpan, OrderButton, Plot, ProducerSpan, Title } from "../../style/MovieInfo";

// ** Utils
import { adjustGradientOnMouseMove } from "../../utils/Design";

// ** Custom Components
import { MoviesTimetables } from "../order/MoviesTimetables";
import { Header } from "../header/Header";
import { MoviesList } from "./List";
import { Modal } from "../modal/Modal";


export function MovieInfo() {
  // ** Ref
  const orderRef = useRef(null);

  // ** State
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedCineroom, setSelectedCineroom] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [opacity, setOpacity] = useState(null);

  function hideModal() {
    setShowModal(false)
  }

  function handleMovieChange(movie) {
    if (selectedMovie?.id === movie.id) return
    setOpacity(0.5);
    setTimeout(() => {
      setSelectedMovie(movie);
      setOpacity(1);
    }, 300);
  }

  return (
    <AppContainer $image={selectedMovie?.poster} $opacity={opacity}>
      <Header {...{setSelectedCineroom, selectedCineroom}}/>
      <ContentContainer>
        <Content>
          <Title>{selectedMovie && `${selectedMovie?.title} (${selectedMovie?.creation_year})`}</Title>
          <Plot>{selectedMovie && selectedMovie?.plot}</Plot>
          <ProducerSpan>{selectedMovie && `Producer: ${selectedMovie?.producer}`}</ProducerSpan>
          <GenreSpan>{selectedMovie && `Genre: ${selectedMovie?.genre.capitalizeFirst()}`}</GenreSpan>
          <OrderButton ref={orderRef} onMouseMove={(e) => adjustGradientOnMouseMove(e, orderRef)} onClick={() => setShowModal(true)}>Order tickets</OrderButton>
        </Content>
      </ContentContainer> 
      <MoviesList {...{setSelectedMovie, selectedCineroom, handleMovieChange, selectedMovie}}/>
      {showModal && (
        <Modal show={showModal} onHide={hideModal} component={<MoviesTimetables {...{selectedMovie, hideModal}}/>}/>
      )}
    </AppContainer>
  );
}
