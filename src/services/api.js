import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api";

const fetchGalleryWithQuery = async (searchQuery, page) => {
  const Parametrs = {
    ApiKay: "33342226-bbc62fd28fd26f410ebf6a75c",
    searchQuery: searchQuery,
    page: page,
    perPage: 12,
  };

  const response = await axios.get(
    `/?key=${Parametrs.ApiKay}&q=${Parametrs.searchQuery}&page=${Parametrs.page}&per_page=${Parametrs.perPage}`
  );
  return response.data.hits;
};

export default {
  fetchGalleryWithQuery,
};
