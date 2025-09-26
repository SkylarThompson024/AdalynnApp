import Header from './views/partials/Header.jsx';
import Card from './customComponents/Card.jsx';
import Modal from 'react-modal';
import { useState } from 'react';
import './assets/styles/Panel.css';
import './assets/styles/Panels/Feedings.css';
import './assets/styles/Panels/Sleeps.css';
import './assets/styles/Panels/DiaperChanges.css';
import './assets/styles/Panels/DoctorAppts.css';

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
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [totalSleep, setTotalSleep] = useState('');
  const [diaperType, setDiaperType] = useState('');
  const [diaperTime, setDiaperTime] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [sickNotes, setSickNotes] = useState('');
  const [injuryNotes, setInjuryNotes] = useState('');

  const playSound = (soundName) => {
    console.log(soundName);
  }

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
    setFromTime('');
    setToTime('');
    setTotalSleep('');
    setDiaperType('');
    setDiaperTime('');

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
            <div className='sleepsSlidepanelContent'>
              <div className='sleepsPanelHeader'>
                Sleeps
              </div>
              <div className='sleepsPanelBody'>
                <p className='sleepsP'>How long did Adalynn sleep?</p>
                <div className='sleepsTimeRow'>
                  <p className='sleepsP'>From: </p>
                  <input
                    type='time'
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
                <div className='sleepsTimeRow'>
                  <p className='sleepsP'>To: </p>
                  <input
                    type='time'
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
                <p className='sleepsP'>Total: {totalSleep}</p>

              </div>
            </div>
          ) :  activePanel === 'Diaper Change' ? (
            <div className='diaperSlidePanelContent'>
              <div className='diaperPanelHeader'>
                Diaper Change
              </div>
              <div className='diaperPanelBody'>
                <p className='diaperP'>What type of diaper change was it?</p>
                <div className='diaperIconsRow'>
                  <Card name='Wet' onClick={(e) => {playSound(e.target.name); setDiaperType('Wet')}}/>
                  <Card name='Solid' onClick={(e) => {playSound(e.target.name); setDiaperType('Solid')}}/>
                  <Card name='Both' onClick={(e) => {playSound(e.target.name); setDiaperType('Both')}}/>
                  <Card name='Blowout' onClick={(e) => {playSound(e.target.name); setDiaperType('Blowout')}}/>
                </div>
                <p className='diaperP'>What time was the diaper changed?</p>
                <input
                  type='time'
                  value={diaperTime}
                  onChange={(e) => setDiaperTime(e.target.value)}
                />
              </div>
            </div>
          ) :  activePanel === 'Doctor Appts' ? (
            <div className='doctorSlidePanelContent'>
              <div className='doctorPanelHeader'>
                Doctor Appts
              </div>
              <div className='doctorPanelBody'>
                <p className='doctorP'>What is the Doctor's Appointment for?</p>
                <input
                  type='text'
                  placeholder='Start typing here...'
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                />
                <p className='doctorP'>What time and day is the appointment for?</p>
                <input
                  type='datetime-local'
                  value={userDate}
                  onChange={(e) => setUserDate(e.target.value)}
                />
              </div>
            </div>
          ) :  activePanel === 'Sicknesses' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'>
                Sicknesses
              </div>
              <div className='panelBody'>
                <p>Sicknesses content goes here.</p>
              </div>
            </div>
          ) :  activePanel === 'Injuries' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'>
                Injuries

              </div>
              <div className='panelBody'>
                <p>Injuries content goes here.</p>
              </div>
            </div>
          ) :  activePanel === 'Calendar' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'>
                Calendar
              </div>
              <div className='panelBody'>
                <p>Calendar content goes here.</p>
              </div>
            </div>
          ) :  activePanel === 'Settings' ? (
            <div className='slidepanelContent'>
              <div className='panelHeader'>
                Settings
              </div>
              <div className='panelBody'>
                <p>Settings content goes here.</p>
              </div>
            </div>
          ) : null
        }
      />
    </section>
    </div>
  );
}

export default App
