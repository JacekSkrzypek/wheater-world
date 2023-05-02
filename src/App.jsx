import CitiesList from './components/CitiesList';
import MainPanel from './components/MainPanel';
import './style/main.scss';

function App() {
  return (
   <main>
    <section className='weather'>
      <CitiesList />
      <MainPanel />
    </section>
   </main>
  );
}

export default App;
