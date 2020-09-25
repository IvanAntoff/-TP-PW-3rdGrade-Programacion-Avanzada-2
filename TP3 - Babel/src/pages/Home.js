import getAllCards from '../utils/getData';

const Home =  async () => {
    const cards = await getAllCards();
    const view = `
        <div id="movies">
            ${cards}
        </div>`;

    return view;
}

export default Home;