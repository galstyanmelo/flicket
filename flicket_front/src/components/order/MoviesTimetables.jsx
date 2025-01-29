// ** React Imports
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// ** Store
import { moviesTimetablesService, resetMoviesTimetables } from "../../store/order/MoviesTimetablesService";

// ** Style Components
import { Category, CategoryText, Container, Header, Info, MovieInfo, TimeItem, TimesContainer, Title } from "../../style/MoviesTimeTable";

// ** Custom Components
import { SeatPicker } from "./SeatPicker";
import { LoadingAnimation } from "../loading/LoadingAnimation";


export function MoviesTimetables({ selectedMovie, hideModal }) {
  // ** Hooks
  const dispatch = useDispatch();
  const moviesTimetablesData = useSelector((state) => state.moviesTimetables);

  // ** State
  const [timetables, setTimetables] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (selectedMovie?.id) {
      dispatch(moviesTimetablesService({ id: selectedMovie?.id }));
    }
  }, [dispatch, selectedMovie?.id]);

  useEffect(() => {
    if (moviesTimetablesData.status === "fulfilled") {
      setTimetables(moviesTimetablesData.data)
      setSelectedTime(moviesTimetablesData.data?.[0])
      dispatch(resetMoviesTimetables());
      setLoading(false)
    } else if (moviesTimetablesData.status === "rejected") {
      dispatch(resetMoviesTimetables())
    }
  }, [dispatch, moviesTimetablesData]);

  return (
    <Container>
      <Header>
        <MovieInfo>
          <Title>{selectedMovie?.title}</Title>
          <Category>
            <img src="/images/movie.svg" alt="" height={24} />
            <CategoryText>Programming</CategoryText>
          </Category>
        </MovieInfo>
        <img src="/images/logo.png" alt="Logo" />
      </Header>
      {loading ? <LoadingAnimation width='100%' height='100%'/> : (
        !timetables?.isEmpty() && (
          <TimesContainer>
            {timetables.map((item, index) => (
              <TimeItem key={index} $available={!!item.price} selected={item.id === selectedTime.id} onClick={() => item.price && setSelectedTime(item)}>
                <Info color="white" fontSize="24px">{item.date}</Info>
                <Info color="#c43a39" fontSize="22px">{`${item.start_time.slice(0, -3)} - ${item.end_time.slice(0, -3)}`}</Info>
                <Info color="white" fontSize="18px">{item.price ? `Price: $${item.price}` : "Not available"}</Info>
              </TimeItem>
            ))}
          </TimesContainer>
        )
      )}
      <SeatPicker hideModal={hideModal} empty={timetables?.isEmpty()} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>
    </Container>
  )
}
