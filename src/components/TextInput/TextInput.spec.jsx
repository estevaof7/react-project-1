import { render, screen } from "@testing-library/react"
import { TextInput } from "."
import userEvent from "@testing-library/user-event";

describe('<TextInput />', () => {
    //nosso input precisa de um searchvalue e uma função que é chamada no onchange

    it('should have a value of searchValue', () => {
        const fn = jest.fn();

        render(<TextInput handleChange={fn} searchValue={'testando'} />);

        const input = screen.getByPlaceholderText(/type your search/i);
        expect(input.value).toBe('testando');
    })

    it('should call handleChange function on each key pressed', async () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue='uma valor qualquer' />);

        const input = screen.getByPlaceholderText(/type your search/i);
        const value = 'o valor';

        await userEvent.type(input, value);

        expect(input.value).toBe('uma valor qualquer');

        //mas quero saber também se a função foi chamada na quantidade de vezes que as teclas foram pressionadas... no caso de 'o valor', são 7 vezes.
        expect(fn).toHaveBeenCalledTimes(value.length);
    })

    it('should match snapshot', ()=> {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn} searchValue={'testando'} />);

        expect(container.firstChild).toMatchSnapshot();
    })
})
