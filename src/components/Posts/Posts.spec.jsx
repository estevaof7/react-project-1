import { render, screen } from "@testing-library/react";
import { Posts } from '.';
import React from 'react'; //ESLint

const props =  [
        {
            id: 1,
            title: 'title 1',
            body: 'body 1',
            cover: 'img/img1.png'
        },
        {
            id: 2,
            title: 'title 2',
            body: 'body 2',
            cover: 'img/img2.png'
        },
        {
            id: 3,
            title: 'title 3',
            body: 'body 3',
            cover: 'img/img3.png'
        }
    ] //fiz diferente do prof

describe('<Posts />', () => {
    it('should render Posts correctly', ()=> {
        render(<Posts posts={props} />);

        //Não convém testar novamete o PostCard pois já testamos anteriormente
        //Eu só preciso saber quanto posts foram renderizados e ver se está correto
        //Para isso, eu vou pegar todos os title, body e img e checar se estão na página

        const headings = screen.getAllByRole('heading', {name: /title/i});
        const imgs = screen.getAllByRole('img', {name: /title/i});
        const bodies = screen.getAllByText(/body/i);

        expect(headings).toHaveLength(3);
        expect(imgs).toHaveLength(3);
        expect(bodies).toHaveLength(3);

        //para testar uma imagem específica

        const img = screen.getByRole('img', {name: /title 1/i});
        expect(img).toHaveAttribute('src', 'img/img1.png');
    });


    it('should not render posts', () => {
        //vou verificar se está tudo certo se não tiver nenhum post
        //isso foi porque mandamos posts = [] como parâmetro no index.jsx e o coverage disse que precisa testar isso. Se eu mandasse somente posts sem o valor padrão que é um array vazio, eu não precisaria desse teste. Não entendi direito.
        render(<Posts />);

        const heading = screen.queryByRole('heading', {name: /title/i});

        expect(heading).not.toBeInTheDocument();
    });

    it('should match snapshot', ()=> {
        const {container} = render(<Posts posts={props} />);

        expect(container.firstChild).toMatchSnapshot();
    });
})
