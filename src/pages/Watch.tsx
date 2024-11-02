import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/joy";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieInfo } from "../redux/asyncThunk/moviesThunk";
import { useParams } from "react-router-dom";
import { copyText, scrollToTop } from "../utils";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModalInstructDowload from "../components/modals/ModalInstructDowload";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SkeletonPage from "../components/common/SkeletonPage";
import { Rating } from "@mui/material";
import MovieSuggestions from "../components/movie/MovieSuggestions";
import { addViewingHistory } from "../redux/slice/viewingHistorySlice";
import { updateWatchedEpisodes } from "../redux/slice/watchSlice";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CommentSection from "../components/comment/CommentSection";

type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

type TypeCopy = "not-copy" | "copied";

const Watch = () => {
  const dispatch: AppDispatch = useDispatch();
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const isError = useSelector((state: RootState) => state.movies.isError);
  const status = useSelector(
    (state: RootState) => state.movies.movieInfo.status
  );
  const episodes = useSelector(
    (state: RootState) => state.movies.movieInfo.episodes
  );
  const watchedEpisodes = useSelector(
    (state: RootState) => state.watch.watchedEpisodes
  );
  const params = useParams();
  const [currentEpisode, setCurrentEpisode] = useState<Episode>({
    name: "",
    slug: "",
    filename: "",
    link_embed: "",
    link_m3u8: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = [
    "Đang xem",
    currentEpisode.filename.replace(`- ${currentEpisode.name}`, ""),
    currentEpisode.name,
  ];

  useEffect(() => {
    dispatch(getMovieInfo(params.slug as string));
  }, []);

  useEffect(() => {
    const currentEpisode = handleGetCurrentEpisodes();
    if (episodes?.length > 0) {
      if (!currentEpisode) {
        setCurrentEpisode(episodes[0]);
      } else {
        setCurrentEpisode(currentEpisode);
      }
    }
  }, [episodes, movieInfo]);

  useEffect(() => {
    if (movieInfo.slug) {
      dispatch(addViewingHistory(movieInfo));
    }
  }, [params, movieInfo]);

  const handleGetCurrentEpisodes = () => {
    const objCurrentEpisodes: any = watchedEpisodes.find(
      (item) => item.slug === params.slug
    );

    return objCurrentEpisodes?.currentEpisode;
  };

  const handleChangeEpisode = (item: Episode) => {
    setCurrentEpisode(item);
    scrollToTop();
    handleUpdateWatchedEpisodes(item);
  };

  const handleUpdateWatchedEpisodes = (item: Episode) => {
    dispatch(
      updateWatchedEpisodes({
        currentEpisode: item,
        slug: params.slug,
      })
    );
  };

  if (!status && !isError) {
    return <SkeletonPage page="info" />;
  }

  if (isError) {
    return (
      <Typography level="title-lg" color="danger">
        Không tìm thấy thông tin phim!
      </Typography>
    );
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Alert>
          <Typography level="title-lg">{currentEpisode.filename}</Typography>
        </Alert>
        <Box
          sx={{
            width: "100%",
            height: { lg: "480px", xs: "260px" },
            borderRadius: "8px",
            border: "1px solid #aaa",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
            }}
            src={currentEpisode.link_embed}
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        </Box>

        <Alert
          sx={{
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Typography startDecorator={<PollOutlinedIcon />} level="title-lg">
            Đánh giá phim
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flex: "1",
              alignItems: "center",
            }}
          >
            <Rating name="half-rating" defaultValue={0} precision={1} />
            <Typography level="title-sm">50 lượt đánh giá</Typography>
          </Box>
        </Alert>

        <Alert
          sx={{ flexDirection: "column", alignItems: "start", gap: "24px" }}
        >
          <Typography
            startDecorator={<SubscriptionsOutlinedIcon />}
            level="title-lg"
          >
            Danh sách tập phim
          </Typography>
          <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {episodes.map((item: Episode, index: number) => (
              <Button
                key={index}
                variant={item.slug === currentEpisode.slug ? "solid" : "soft"}
                onClick={() => handleChangeEpisode(item)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Alert>

        <SectionLinkM3U8
          link_m3u8={currentEpisode.link_m3u8 as string}
          setOpen={setOpen}
        />

        <Divider />

        <CommentSection />

        <Divider />
        <MovieSuggestions
          categories={movieInfo.category ?? []}
          countries={movieInfo.country ?? []}
        />
      </Box>

      <ModalInstructDowload open={open} setOpen={setOpen} />
    </>
  );
};
export default Watch;

interface IProps {
  link_m3u8: string;
  setOpen: (open: boolean) => void;
}

const SectionLinkM3U8 = ({ link_m3u8, setOpen }: IProps) => {
  const [typeCopy, setTypeCopy] = useState<TypeCopy>("not-copy");

  const handleCopyLinkM3U8 = (link_m3u8: string) => {
    copyText(link_m3u8);
    setTypeCopy("copied");

    setTimeout(() => setTypeCopy("not-copy"), 1000);
  };
  return (
    <Alert sx={{ flexDirection: "column", alignItems: "start" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Typography startDecorator={<LinkOutlinedIcon />} level="title-lg">
            Liên kết M3U8
          </Typography>

          <Tooltip title="Hướng dẫn tải xuống">
            <IconButton size="sm" onClick={() => setOpen(true)}>
              <HelpOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {typeCopy === "not-copy" ? (
          <Tooltip title="Sao chép">
            <IconButton onClick={() => handleCopyLinkM3U8(link_m3u8 as string)}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Đã sao chép">
            <IconButton>
              <CheckOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Typography
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
        level="body-md"
      >
        {link_m3u8}
      </Typography>
    </Alert>
  );
};
