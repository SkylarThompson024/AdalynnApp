import Header from './views/partials/Header.jsx';
import Card from './customComponents/Card.jsx';
import Modal from 'react-modal';
import { useState } from 'react';
import './assets/styles/Panel.css';
import './assets/styles/Panels/Feedings.css';

Modal.setAppElement('#root');

function SlidePanel({ visible, content, onClose }) {
  return (
    <div className={`slidePanel ${visible ? 'visible' : ''}`}>
      <button className='closeButton' onClick={onClose}>{'\u2190'}</button> {/* {'\u2190'} is a left arrow - &lt; is < */}
      {content}
    </div>
  )
}

function App() {
  const [panelVisible, setPanelVisible] = useState(false);
  const [activePanel, setActivePanel] = useState('');
  const [userDate, setUserDate] = useState('');
  const [feedAmount, setFeedAmount] = useState('');
  const [feedType, setFeedType] = useState('');

  const openPanel = (panelName) => {
    //Checks if there is a panel already on screen, then waits for it to slide off screen, then slides in the newly selected panel
    //Also checks if selected panel is already on screen, if so, it breaks out and does nothing
    
    if (panelName !== activePanel) {
      if (panelVisible) {
      console.log(`Testing...`);
      closePanel();
      setTimeout(() => {
        setActivePanel(panelName);
        setPanelVisible(true);
      }, 500);
    } else {
      setActivePanel(panelName);
      setPanelVisible(true);
    }
    }
    
    
  };
  const closePanel = () => {
    setPanelVisible(false);
    setActivePanel('');
    clearEverything();
  };
  const clearEverything = () => {
    setFeedAmount('');
    setFeedType('');

  }



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
            <div className='feedingsSlidePanelContent'>
              <div className='feedingsPanelHeader'>
                Feedings

              </div>
              <div className='feedingsPanelBody'>
                <div className='feedingsNumberInput'>
                  <p className='feedingsP'>How much did Adalynn eat?</p>
                  <label>
                    <input
                      type='number'
                      placeholder='Ex: 2.6oz'
                      value={feedAmount}
                      onChange={(e) => setFeedAmount(e.target.value)}
                    />
                  </label>
                </div>
                <p className='feedingsP'>What did Adalynn eat?</p>
                <div className='feedingsRadioGroup'>
                  <label>
                    <input
                      type="radio"
                      value="Breastmilk"
                      checked={feedType === "Breastmilk"}
                      onChange={(e) => setFeedType(e.target.value)}
                    />
                    Breastmilk
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Formula"
                      checked={feedType === "Formula"}
                      onChange={(e) => setFeedType(e.target.value)}
                    />
                    Formula
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Straight from the Tap"
                      checked={feedType === "Straight from the Tap"}
                      onChange={(e) => setFeedType(e.target.value)}
                    />
                    From the Tap
                  </label>
                </div>
                <p className='feedingsP'>What time and day did Adalynn eat?</p>
                <div className='feedingsTimeGroup'>
                  <input
                    type="datetime-local"
                    value={userDate}
                    onChange={(e) => setUserDate(e.target.value)}
                  />
                </div>

              </div>
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
