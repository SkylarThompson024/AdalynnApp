import Header from './views/partials/Header.jsx';
import Footer from './views/partials/Footer.jsx';
import NavBar from './views/partials/NavBar.jsx';
import Card from './customComponents/Card.jsx';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

function SlidePanel({ visible, content, onClose }) {
  return (
    <div className={`slidePanel ${visible ? 'visible' : ''}`}>
      <button className='closeButton' onClick={onClose}>X</button>
      <div className='panelContent'>
        {content}
      </div>
    </div>
  )
}

function App() {
  const [panelVisible, setPanelVisible] = useState(false);
  const [activePanel, setActivePanel] = useState('');

  const openPanel = (panelName) => {
    setActivePanel(panelName);
    setPanelVisible(true);
  };
  const closePanel = () => {
    setPanelVisible(false);
    setTimeout(() => {
      setActivePanel('');
    }, 400);
  };



  return (
    <div id='wrapper'>
      <section id='leftSide'>
        <Header/>
        <section id='tabsContainer'>
          <div className='tabRow'>
            <Card name='Feedings' onClick={() => openPanel('Feedings')}/>
            <Card name='Sleeps' onClick={() => openPanel('Sleeps')}/>
          </div>
          <div className='tabRow'>
            <Card name='Diaper Change' onClick={() => openPanel('Diaper Change')}/>
            <Card name='Doctor Appts' onClick={() => openPanel('Doctor Appts')}/>
          </div>
          <div className='tabRow'>
            <Card name='Sicknesses' onClick={() => openPanel('Sicknesses')}/>
            <Card name='Injuries' onClick={() => openPanel('Injuries')}/>
          </div>
          <div className='tabRow'>
            <Card name='Calendar' onClick={() => openPanel('Calendar')}/>
            <Card name='Settings' onClick={() => openPanel('Settings')}/>
          </div>
        </section>
      </section>
    <section id='rightSide'>
      <SlidePanel
        visible={panelVisible}
        onClose={closePanel}
        content={
          activePanel === 'Feedings' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Feedings</h2></div>
              <div className='panelBody'><p>Feedings content goes here.</p></div>
            </div>
          ) : activePanel === 'Sleeps' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Sleeps</h2></div>
              <div className='panelBody'><p>Sleeps content goes here.</p></div>
            </div>
          ) :  activePanel === 'Diaper Change' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Diaper Change</h2></div>
              <div className='panelBody'><p>Diaper Change content goes here.</p></div>
            </div>
          ) :  activePanel === 'Doctor Appts' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Doctor Appts</h2></div>
              <div className='panelBody'><p>Doctor Appts content goes here.</p></div>
            </div>
          ) :  activePanel === 'Diaper Change' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Diaper Change</h2></div>
              <div className='panelBody'><p>Diaper Change content goes here.</p></div>
            </div>
          ) :  activePanel === 'Sicknesses' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Sicknesses</h2></div>
              <div className='panelBody'><p>Sicknesses content goes here.</p></div>
            </div>
          ) :  activePanel === 'Injuries' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Injuries</h2></div>
              <div className='panelBody'><p>Injuries content goes here.</p></div>
            </div>
          ) :  activePanel === 'Calendar' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Calendar</h2></div>
              <div className='panelBody'><p>Calendar content goes here.</p></div>
            </div>
          ) :  activePanel === 'Settings' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'><h2>Settings</h2></div>
              <div className='panelBody'><p>Settings content goes here.</p></div>
            </div>
          ) : null
        }
      />
    </section>
    </div>
  );
}

export default App
