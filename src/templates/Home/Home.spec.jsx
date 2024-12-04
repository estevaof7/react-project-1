import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Home } from ".";
import userEvent from "@testing-library/user-event";
import { loadPosts } from "../../utils/load-posts";

describe('<Home />', () => {

  beforeEach(() => {

    global.fetch = jest.fn(() => //override the fetch
      Promise.resolve({
        json: () => Promise.resolve(
          [
            {
              userId: 1,
              id: 1,
              title: "title1",
              body: "body1"
            },
            {
              userId: 2,
              id: 2,
              title: "title2",
              body: "body2"
            },
            {
              userId: 3,
              id: 3,
              title: "title3",
              body: "body3"
            },
            {
              userId: 4,
              id: 4,
              title: "title4",
              body: "body4"
            },
          ]
        )
      })
    )

  });

  // beforeEach(() => { //SE EU FIZER FETCH PARA AS IMAGENS TAMBÉM
  //   global.fetch = jest.fn()
  //     .mockImplementationOnce(() =>
  //       Promise.resolve({
  //         json: () => Promise.resolve([
  //           {
  //             userId: 1,
  //             id: 1,
  //             title: "title1",
  //             body: "body1"
  //           },
  //           {
  //             userId: 2,
  //             id: 2,
  //             title: "title2",
  //             body: "body2"
  //           },
  //           {
  //             userId: 3,
  //             id: 3,
  //             title: "title3",
  //             body: "body3"
  //           }
  //         ])
  //       })
  //     )
  //     .mockImplementationOnce(() =>
  //       Promise.resolve({
  //         json: () => Promise.resolve([
  //           {
  //             url: "img1.png"
  //           },
  //           {
  //             url: "img2.png"
  //           },
  //           {
  //             url: "img3.png"
  //           }
  //         ])
  //       })
  //     );
  // });

  it('should render search, posts and, load more', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts :(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);
    //Como a função useEffect (que é a versão do componentDidMount) tem que esperar o fech acontecer, aqui, o render renderiza a primeira vez sem os posts pois eles ainda não foram chamados, por isso aparece o "não existem posts" se eu fizer o debug.

    //Com essa função, ele espera o elemento ser removido (nesse caso, ele espera os posts serem carregados) para então fazer o teste 'it' e assim carregar o componente com os posts (fazer o debug para ver melhor)

    const search = screen.getByPlaceholderText(/Type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3); //pois eu coloquei para aparecer somente 3 inicialmente

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts :(');

    expect.assertions(13);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title4' })).not.toBeInTheDocument(); //query pois o get dá erro se tentar capturar um elemento que não está na tela

    await userEvent.type(search, 'title1');

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title4' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Search value: title1'})).toBeInTheDocument(); //espero que esse elemnto apareça quando eu digitar algo

    await userEvent.clear(search);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();

    await userEvent.type(search, 'qualquer coisa'); //algo que não existe

    expect(screen.getByText('Não existem posts :(')).toBeInTheDocument();
    //por algum motivo, não dá pra pegar a mesma variável que fizemos lá em cima: noMorePosts

  });

  it('should load more posts and disable button when all posts are loaded', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts :(');

    await waitForElementToBeRemoved(noMorePosts)

    const button = screen.getByText('Load more posts');
    //eu já tinha testado se o botão estava no documento e se os posts renderizavam normalmente, então não preciso fazer de novo aqui

    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title4' })).toBeInTheDocument();
    expect(button).toBeDisabled();

  });

  it('should handle catch of loadposts', async () => {

    fetch.mockImplementationOnce(
      () => Promise.reject("API Failure")
    );

    const mockLoad = await loadPosts();

    expect(mockLoad).toEqual(null);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  })

});

