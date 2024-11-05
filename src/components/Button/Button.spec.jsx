import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
        render(<Button text="Load more" />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();

        render(<Button text="Load more" clique={fn} />);

        const button = screen.getByRole('button', { name: /load more/i });

        fireEvent.click(button);
        fireEvent.click(button);

        expect(fn).toHaveBeenCalled();
    });

    it('should be disabled when disabled is true', () => {
        //Vamos verificar se o botão realmente vai estar desativado se o disabled for true

        render(<Button text="Load more" disabled={true} />);

        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeDisabled();

    });

    it('should be enabled when disabled is false', () => {
        render(<Button text="Load more" disabled={false} />);
        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeEnabled();
    }); //Mesma coisa do de cima só que o contrário

    it('should match snapshot', () => {
        const { container } = render(<Button text="Load more" disabled={false} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});