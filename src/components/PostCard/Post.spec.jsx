import { render, screen } from "@testing-library/react";
import { PostCard } from '.';
import { postCardPropsMock } from "./mock";

//O que queremos testar aqui?
//Eu tenho uma imagem, um container com um h2 e um texto

const props = postCardPropsMock;

describe('<PostCard />', ()=> {
    it('should render PostCard correctly', () =>{
        render(<PostCard {...props} />);

        expect(screen.getByRole('img', {name: /title 1/i})).toBeInTheDocument();
    })
});