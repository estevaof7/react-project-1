import './styles.css';
import { Component } from "react";

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