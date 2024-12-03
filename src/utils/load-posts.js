export const loadPosts = async () => {
    try {
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      const postsJson = await postsResponse.json();

      const postsAndPhotos = postsJson.map((post, i) => {
        return { ...post, cover: `https://picsum.photos/600/600?random=${i}` }
      });

      return postsAndPhotos;
    } catch (e) {
      console.log(e);
      return null;
    }
}

// export const loadPosts = async () => { //fetch dos posts e das imagens... mesmo que as imagens não estão carregando, vou deixar aqui como exemplo de como seria se fizessemos duas requisiçõe fetch ao invés de uma
//   const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
//   const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

//   const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

//   const postsJson = await posts.json();
//   const photosJson = await photos.json();

//   const postsAndPhotos = postsJson.map((post, index) => {
//     return { ...post, cover: photosJson[index].url };
//   });

//   return postsAndPhotos;
// };

