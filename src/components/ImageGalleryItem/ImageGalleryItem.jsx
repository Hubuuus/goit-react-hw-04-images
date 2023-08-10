import { PropTypes } from "prop-types";

export const ImageGalleryItem = ({ smallUrl, alt, onClick }) => {
  return (
    <li className='ImageGalleryItem'>
      <img className='ImageGalleryItem-image' src={smallUrl} alt={alt} onClick={onClick} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallUrl: PropTypes.string,
  alt: PropTypes.string,
  bigFormatUrl: PropTypes.string,
  onClick: PropTypes.func,
};
