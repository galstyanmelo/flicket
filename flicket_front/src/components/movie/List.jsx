// ** React Imports
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

// ** Style Components
import { Input, ListContainer, MovieItem, NotFoundMessage, Rate, RateContainer, SearchBox, SearchContainer, SearchIconContainer, StyledAsyncImage } from "../../style/MoviesList";
import { movieSearchService, resetMovieSearch } from "../../store/movie/MovieSearchService";
import { Info } from "../../style/MoviesTimeTable";

// ** Custom Components
import { LoadingAnimation } from "../loading/LoadingAnimation";

// ** Third Party Libraries
import { Blur } from "transitions-kit";

export function MoviesList({ setSelectedMovie, selectedCineroom, handleMovieChange, selectedMovie }) {
  // ** Hooks
  const dispatch = useDispatch();
  const moviesData = useSelector((state) => state.movieSearch);

  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAllowRequest, setIsAllowRequest] = useState(true);

  // ** Ref
  const scrollContainerRef = useRef(null);
  const prevPageRef = useRef(-1);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft === maxScrollLeft) {
      if (!isAllowRequest && !movies.isEmpty()) {
        setLoading(true);
      }
      setPage((prevPage) => prevPage + 1);
    }
  }, [isAllowRequest, movies]);

  function handleSearchButton() {
    setIsAllowRequest(false);
    setPage(0);
    setSelectedMovie(null);
    const body = { cineroom_id: selectedCineroom, title: searchTerm };
    dispatch(movieSearchService({ page: 0, body }));
  }

  useEffect(() => {
    setIsAllowRequest(true);
    setPage(0);
    setSelectedMovie(null);
    prevPageRef.current = -1;
  }, [selectedCineroom, setSelectedMovie]);

  useEffect(() => {
    if (isAllowRequest && prevPageRef.current !== page) {
      prevPageRef.current = page;
      const body = { cineroom_id: selectedCineroom, title: searchTerm };
      dispatch(movieSearchService({ page, body }));
    }
  }, [dispatch, page, isAllowRequest, selectedCineroom, searchTerm]);

  useEffect(() => {
    if (moviesData.status === "fulfilled") {
      setMovies((prev) => page === 0 ? moviesData.data?.results : [...prev, ...(moviesData.data?.results || [])]);
      setSelectedMovie((prev) => prev ?? moviesData.data?.results[0]);
      setIsAllowRequest(!moviesData.data?.results?.isEmpty());
      setLoading(false);
      dispatch(resetMovieSearch());
    } else if (moviesData.status === "rejected") {
      setLoading(false);
      dispatch(resetMovieSearch());
      toast.error("Failed to load movies, Please try again");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesData, page, setLoading]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
    <SearchContainer>
      <SearchBox>
        <Input placeholder="Find something to watch..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <SearchIconContainer onClick={handleSearchButton}>
          <img src="/images/search.svg" alt="Search icon" />
        </SearchIconContainer>
      </SearchBox>
      </SearchContainer>
      <ListContainer ref={scrollContainerRef}>
        {loading && isAllowRequest ? (
          <LoadingAnimation height="100%" />
        ) : (
          <>
            {!movies?.isEmpty() ? (
              movies.map((item, index) => (
                <MovieItem key={index} onClick={() => handleMovieChange(item)} $selected={selectedMovie?.id === item?.id}>
                  <StyledAsyncImage src={item.icon} Transition={Blur} loader={<div style={{ background: "black" }} />} />
                  <RateContainer>
                    <img src="/images/rate.svg" alt="Rate icon" height={20} />
                    <Rate>{item?.rate}</Rate>
                  </RateContainer>
                </MovieItem>
              ))
            ) : (
              <NotFoundMessage>
                <img src="/images/movie.svg" alt="" height={55}/>
                <Info color="white" fontSize="32px">Not Found</Info>
              </NotFoundMessage>
            )}
          </>
        )}
      </ListContainer>
    </>
  );
}
