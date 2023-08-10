import { Component } from "react";

import api from "../services/api.js";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

class App extends Component {
  state = {
    query: "",
    pictures: [],
    isLoading: false,
    error: "",
    page: 1,
    modalIsOpen: false,
    bigFormatUrl: "",
  };

  searchValue = evt => {
    evt.preventDefault();
    const searchValue = evt.target.name.value;
    this.setState({ query: searchValue, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getApi = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const pictures = await api.fetchGalleryWithQuery(query, page);
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures],
      }));
    } catch (err) {
      this.setState({ error: err });
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
        {
          page > 1 &&
            window.scrollBy({
              top: 260,
              behavior: "smooth",
            });
        }
      }, 500);
    }
  };

  openModal = src => {
    this.setState({ modalIsOpen: true, bigFormatUrl: src });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, bigFormatUrl: "" });
  };

  closeModalEsc = evt => {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  };

  render() {
    const { pictures, query, isLoading, modalIsOpen, bigFormatUrl, alt } = this.state;
    return (
      <div className='App'>
        <Searchbar OnSubmit={this.searchValue} />
        <ImageGallery pictures={pictures} openModal={this.openModal} modalIsOpen={modalIsOpen} />
        {isLoading ? <Loader /> : query ? <Button OnSubmit={this.loadMore} /> : null}
        {modalIsOpen && (
          <Modal
            img={bigFormatUrl}
            alt={alt}
            onClose={this.closeModal}
            onKeyDown={this.closeModalEsc}
          />
        )}
      </div>
    );
  }
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.getApi(query, page);
    }
  }
}

export default App;
