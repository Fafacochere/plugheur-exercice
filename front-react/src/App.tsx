import React, { useReducer } from 'react';
import './App.scss';
import SearchForm from './pages/search-from/SearchForm';
import Stats from './pages/stats/Stats';


const emptyMetrics: any = {
  metrics: [],
  serial: ''
}
export const metricsContext = React.createContext(emptyMetrics)

const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_METRICS":
      return {
        metrics: action.payload.metrics,
        serial: action.payload.serial,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(Reducer, emptyMetrics);
  return (
    <div className='app'>
      <header className='bg-secondary'>
        <h1 className='no-margin text-primary'>Plug'Heur Exercice</h1>
      </header>
      <metricsContext.Provider value={{ state, dispatch }}>
        <div className="app__content">
          <div className='app__content__search'><SearchForm /></div>
          <div className='app__content__stats'><Stats /></div>
        </div>
      </metricsContext.Provider>
    </div>
  );
}

export default App;
