import MainPanel from './components/MainPanel';
import './style/main.scss';

function App() {
  return (
   <main>
    <section className='weather'>
      <article className='weather__article weather__cities'></article>
      <MainPanel />
    </section>
   </main>
  );
}

export default App;
