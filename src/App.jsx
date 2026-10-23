import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import ScrollBall from './components/ScrollBall.jsx';
import Loader from './components/Loader.jsx';
import Home from './pages/Home.jsx';
import Historia from './pages/Historia.jsx';
import Clubes from './pages/Clubes.jsx';
import ElClasico from './pages/ElClasico.jsx';
import Jugadores from './pages/Jugadores.jsx';
import Aficionados from './pages/Aficionados.jsx';
import NotFound from './pages/NotFound.jsx';

function skipToContent() {
  const main = document.getElementById('main');
  if (main) main.focus();
}

export default function App() {
  return (
    <>
      <Loader />
      <ScrollManager />
      <ScrollBall />
      <button type="button" className="skip-link" onClick={skipToContent}>
        Saltar al contenido
      </button>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/clubes" element={<Clubes />} />
          <Route path="/el-clasico" element={<ElClasico />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/aficionados" element={<Aficionados />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
