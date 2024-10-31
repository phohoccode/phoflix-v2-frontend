import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/SlideShow.scss";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Skeleton } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import _NavLink from "./common/_NavLink";
import SlideItem from "./SlideItem";
import { IMovie } from "../interfaces/movie";

const SlideShow = () => {
  const items:IMovie[] = useSelector((state: RootState) => state.movies.slideShow);
  const isLoading: boolean = useSelector(
    (state: RootState) => state.movies.isLoading
  );

  return (
    <Box>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {!isLoading && items.length === 0 && (
          <SwiperSlide>
            <Skeleton animation="wave" variant="overlay" />
          </SwiperSlide>
        )}
        {items.length > 0 &&
          items.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{
                backgroundImage: `url("${item.thumb_url}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <SlideItem key={index} item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default SlideShow;
