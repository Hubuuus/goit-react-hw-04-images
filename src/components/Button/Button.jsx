import { PropTypes } from "prop-types";

export const Button = ({ OnSubmit }) => {
  return (
    <button className='Button' onClick={OnSubmit}>
      Load More
    </button>
  );
};

Button.propTypes = {
  OnSubmit: PropTypes.func,
};
