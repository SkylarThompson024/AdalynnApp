import Header from './views/partials/Header.jsx';
import Footer from './views/partials/Footer.jsx';
import NavBar from './views/partials/NavBar.jsx';
import Card from './customComponents/Card.jsx';

function App() {

  return (
    <html id='wrapper'>
      <section id='leftSide'>
        <Header/>
        <section id='tabsContainer'>
          <div className='tabRow'>
            <Card></Card>
            <Card></Card>
          </div>
          <div className='tabRow'>
            <Card></Card>
            <Card></Card>
          </div>
        </section>
      </section>
      <section id='rightSide'>

      </section>
    </html>
  );
}

export default App
