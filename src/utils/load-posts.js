export const loadPosts = async () => {
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsJson = await postsResponse.json();

    const postsAndPhotos = postsJson.map((post, i) => {
      return { ...post, cover: `https://picsum.photos/600/600?random=${i}` }
    });

    return postsAndPhotos;
}