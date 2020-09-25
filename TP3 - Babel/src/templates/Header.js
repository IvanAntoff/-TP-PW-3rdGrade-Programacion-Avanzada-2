const Header = () => {
    const view = `
        <div class="Header-main">
            <nav>
                <div class="nav-wrapper orange darken-3">
                    <a href="#" class="brand-logo">TP3</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="https://www.themoviedb.org/">TMDB</a></li>
                        <li><a href="https://materializecss.com/">Materialize</a></li>
                    </ul>
                </div>
            </nav>
            <h2 class="center-align orange lighten-3 orange-text text-darken-3">TOP PELÍCULAS </h2>
        </div>
    `
    return view;
};

export default Header;