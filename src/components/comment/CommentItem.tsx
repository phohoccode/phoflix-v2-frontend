import { Avatar, Box, Button, Divider, Textarea, Typography } from "@mui/joy";
import { formatDate } from "../../utils";

const CommentItem = ({
  item,
  index,
  indexEdit,
  valueEditComment,
  setValueEditComment,
  setIndexEdit,
  setIndexDelete,
  setIdComment,
  handleSetOpenModalAlertDialog,
  handleSetOpenModalReportComment,
  handleEditComment,
  handSaveEditComment,
}: any) => {
  const handleOpenModal = (idComment: string) => {
    handleSetOpenModalAlertDialog(true);
    setIdComment(idComment);
  };

  return (
    <li style={{ display: "flex", gap: "12px" }}>
      <Box>
        <Avatar />
      </Box>
      <Box
        sx={{
          border: "1px solid #aaa",
          padding: "8px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: `${indexEdit !== -1 ? "100%" : "unset"}`,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Typography level="title-md" color="primary">
              {item["user.username"]}
            </Typography>
            <Typography level="body-xs" color="neutral">
              {formatDate(item?.createdAt)}
            </Typography>
          </Box>
          {index !== indexEdit ? (
            <Typography
              sx={{
                wordBreak: "break-word",
              }}
              level="body-sm"
            >
              {item.content}
            </Typography>
          ) : (
            <Textarea
              onChange={(e) => setValueEditComment(e.target.value)}
              sx={{ marginTop: "12px" }}
              value={valueEditComment}
              variant="outlined"
            />
          )}
        </Box>
        <Divider />
        {index !== indexEdit ? (
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={() => handleOpenModal(item.id)}
              variant="plain"
              color="danger"
              size="sm"
            >
              Xoá
            </Button>
            <Button
              onClick={() => handleEditComment(index, item.content)}
              variant="plain"
              color="primary"
              size="sm"
            >
              Chỉnh sửa
            </Button>
            <Button
              onClick={() => handleSetOpenModalReportComment(true)}
              variant="plain"
              color="neutral"
              size="sm"
            >
              Báo cáo
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={() => setIndexEdit(-1)}
              variant="plain"
              color="neutral"
              size="sm"
            >
              Huỷ
            </Button>
            <Button
              onClick={() => handSaveEditComment(item?.id)}
              variant="plain"
              color="primary"
              size="sm"
            >
              Xác nhận
            </Button>
          </Box>
        )}
      </Box>
    </li>
  );
};

export default CommentItem;
