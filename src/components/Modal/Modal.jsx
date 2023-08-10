import { useEffect } from "react";
import { PropTypes } from "prop-types";

export const Modal = ({ img, alt, onClose, onKeyDown }) => {
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='Overlay' onClick={onClose} onKeyDown={onKeyDown}>
      <div className='Modal'>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default Modal;
