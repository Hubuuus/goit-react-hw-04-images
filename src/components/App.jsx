import { useState, useEffect } from "react";

import api from "../services/api.js";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

const App = () => {
  const [query, setQuery] = useState("");
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bigFormatUrl, setBigFormatUrl] = useState("");

  useEffect(() => {
    getApi(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const searchValue = evt => {
    evt.preventDefault();
    const searchValue = evt.target.name.value;

    setPictures([]);
    setQuery(searchValue);
    setPage(1);
  };

  const loadMore = () => {
    console.log(page);

    setPage(page + 1);
  };

  const getApi = async (query, page) => {
    if (query === "") {
      setPictures([]);
    } else {
      setIsLoading(true);
      try {
        const newPictures = await api.fetchGalleryWithQuery(query, page);

        setPictures([...pictures, ...newPictures]);
      } catch (err) {
        setError(err);
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          {
            page > 1 &&
              window.scrollBy({
                top: 260,
                behavior: "smooth",
              });
          }
        }, 500);
      }
    }
  };

  const openModal = src => {
    setModalIsOpen(true);
    setBigFormatUrl(src);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBigFormatUrl("");
  };

  const closeModalEsc = evt => {
    if (evt.key === "Escape") {
      closeModal();
    }
  };

  return (
    <div className='App'>
      <Searchbar OnSubmit={searchValue} />
      <ImageGallery pictures={pictures} openModal={openModal} modalIsOpen={modalIsOpen} />
      {isLoading ? <Loader /> : query ? <Button OnSubmit={loadMore} /> : null}
      {modalIsOpen && (
        <Modal
          img={bigFormatUrl}
          alt={pictures.alt}
          onClose={closeModal}
          onKeyDown={closeModalEsc}
        />
      )}
    </div>
  );
};

export default App;
