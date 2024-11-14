import P from 'prop-types';
import './styles.css';
import React from 'react'; //ESLint

export const TextInput = ({ searchValue, handleChange }) => {
    return (
        <input
            className='text-input'
            onChange={handleChange}
            value={searchValue}
            type="search"
            placeholder='Type your search'
        />
    )
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
}
