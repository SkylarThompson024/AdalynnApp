import Header from './views/partials/Header.jsx';
import Footer from './views/partials/Footer.jsx';
import NavBar from './views/partials/NavBar.jsx';
import Card from './customComponents/Card.jsx';

function App() {

  return (
    <div id='wrapper'>
      <section id='leftSide'>
        <Header/>
        <section id='tabsContainer'>
          <div className='tabRow'>
            <Card name='Feedings' />
            <Card name='Sleeps' />
          </div>
          <div className='tabRow'>
            <Card name='Diaper Change'  />
            <Card name='Doctor Appts'  />
          </div>
          <div className='tabRow'>
            <Card name='Sicknesses'  />
            <Card name='Injuries'  />
          </div>
          <div className='tabRow'>
            <Card name='Calendar'  />
            <Card name='Settings'  />
          </div>
        </section>
      </section>
    <section id='rightSide'>

    </section>
    </div>
  );
}

export default App
