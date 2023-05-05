import CitiesList from './components/CitiesList';
import MainPanel from './components/MainPanel';
import { useGlobalContext } from './context';
import './style/main.scss';

function App() {
  const { data: { citiesData }} = useGlobalContext();

  return (
   <main>
    <section className='weather'>
      <CitiesList />
      {citiesData && <MainPanel />}
    </section>
   </main>
  );
}

export default App;
