import Navbar from './components/Navbar';
import Accueil from './sections/Accueil';
import Formation from './sections/Formation';
import Competences from './sections/Competences';
import Projets from './sections/Projets';
import Services from './sections/Services';
import Contact from './sections/Contact';

function App() {
  return (
    <>
         <Navbar />
        <Accueil />
        <Formation/> 
        <Competences />
        <Projets />
        <Services />
        <Contact />


               

    </>
  );
}

export default App;
