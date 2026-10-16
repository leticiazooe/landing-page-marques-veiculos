import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { Story } from './components/Story';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-clip bg-night font-sans text-ivory selection:bg-gold selection:text-night">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:p-4 focus:text-night">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Collection />
        <Story />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
