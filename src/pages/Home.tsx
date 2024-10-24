import { useDispatch, useSelector } from "react-redux";
import SlideShow from "../components/SlideShow";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import {
  getCartoon,
  getFeatureFilm,
  getSlideShow,
  getTelevisionSeries,
  getTvShows,
} from "../redux/asyncThunk/moviesThunk";
import { Alert, Box, Button, Typography } from "@mui/joy";
import MovieList from "../components/MovieList";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import { useNavigate } from "react-router-dom";
import TitleContainer from "../components/common/TitleContainer";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const featureFilm = useSelector(
    (state: RootState) => state.movies.featureFilm
  );
  const televisionSeries = useSelector(
    (state: RootState) => state.movies.televisionSeries
  );
  const cartoon = useSelector((state: RootState) => state.movies.cartoon);
  const tvShows = useSelector((state: RootState) => state.movies.tvShows);

  useEffect(() => {
    dispatch(getSlideShow());
    dispatch(getFeatureFilm());
    dispatch(getTelevisionSeries());
    dispatch(getCartoon());
    dispatch(getTvShows());
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SlideShow />
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/phim-le"
          content="Phim lẻ"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={featureFilm} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/phim-bo"
          content="Phim bộ"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={televisionSeries} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/hoat-hinh"
          content="Hoạt hình"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={cartoon} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/tv-shows"
          content="Chương trình truyền hình"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={tvShows} />
      </Box>
    </Box>
  );
};

export default Home;
