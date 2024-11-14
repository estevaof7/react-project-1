import P from 'prop-types';
import './styles.css';
import { Component } from "react";
import React from 'react'; //ESLint

export class Button extends Component {

    render() {
        const {text, clique, disabled} = this.props;
        return (
            <button
            className='button'
            onClick={clique}
            disabled={disabled}
             >
                {text}
            </button>
        )
    }
}

Button.defaultProps = {
  disabled: false,
}

Button.propTypes = {
  text: P.string.isRequired,
  clique: P.func.isRequired,
  disabled: P.bool,
}
