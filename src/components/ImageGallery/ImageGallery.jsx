import { PropTypes } from "prop-types";
import { ImageGalleryItem } from "..//ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ pictures, openModal }) => {
  return (
    <ul className='ImageGallery'>
      {pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallUrl={webformatURL}
          alt={tags}
          onClick={() => openModal(largeImageURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  openModal: PropTypes.func,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
