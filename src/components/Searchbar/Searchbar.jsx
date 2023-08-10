import { PropTypes } from "prop-types";

export const Searchbar = ({ OnSubmit }) => {
  return (
    <header className='Searchbar'>
      <form className='SearchForm' onSubmit={OnSubmit}>
        <button type='submit' className='SearchForm-button'>
          <span className='SearchForm-button-label'>Search</span>
        </button>

        <input
          className='SearchForm-input'
          name='name'
          type='text'
          required
          placeholder='Search images and photos'
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  OnSubmit: PropTypes.func,
};
