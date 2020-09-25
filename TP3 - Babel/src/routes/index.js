import Header from '../templates/Header';
import Home from '../pages/Home';
import Footer from '../templates/Footer';
import M from '../utils/materialize.min.js'

const router = async () => {
    const header = null ||  document.getElementById('header');
    const content = null ||  document.getElementById('content');
    header.innerHTML = Header();
    await Home()
    .then((res) => content.innerHTML = res)
    .then(() => M.AutoInit());
    footer.innerHTML = Footer();
};

export default router;