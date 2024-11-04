import _ from "lodash";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Không thể sao chép: ", err);
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); 
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
