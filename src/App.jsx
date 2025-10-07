import Header from './views/partials/Header.jsx';
import Card from './customComponents/Card.jsx';
import Modal from 'react-modal';
import { useState } from 'react';
import './assets/styles/Panel.css';
import './assets/styles/Panels/Feedings.css';
import './assets/styles/Panels/Sleeps.css';
import './assets/styles/Panels/DiaperChanges.css';
import './assets/styles/Panels/DoctorAppts.css';
import './assets/styles/Panels/Sicknesses.css';
import './assets/styles/Panels/Injuries.css';
import './assets/styles/Panels/Calendar.css';
import './assets/styles/Panels/Settings.css';
import {
  fetchFeedEntries,
  fetchSleepEntries,
} from '../backend/databaseInteractions.js';
import ConnectionIndicator from './customComponents/ConnectionIndicator.jsx';
import WeeklyCalendar from './customComponents/weeklyCalendar.jsx';
import WeekC from './customComponents/WeekC.jsx';


Modal.setAppElement('#root');

function SlidePanel({ visible, content, onClose, onAdd }) {
  return (
    <div className={`slidePanel ${visible ? 'visible' : ''}`}>
      <button className='closeButton' onClick={onClose}>{'\u2190'}</button> {/* {'\u2190'} is a left arrow - &lt; is < */}
      <button className='addButton' onClick={onAdd}>+</button> 
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

  const [feedEntries, setFeedEntries] = useState([]);
  const [sleepEntries, setSleepEntries] = useState([]);


  const handleAdd = (activePanel) => {
    setActivePanel(activePanel); //Does nothing right now
  }
  const playSound = (soundName) => {
    console.log(soundName);
  }
  const handlePanelContent =  async (panelName) => {
    if (panelName === "Feedings") {
      const entries = await fetchFeedEntries()
      setFeedEntries(entries)
    }
    if (panelName === "Sleeps") {
      const entries = await fetchSleepEntries()
      setSleepEntries(entries)
    }
  }
  const handleCardClick = (panelName) => {
    openPanel(panelName);
    handlePanelContent(panelName);
  }

  const openPanel = async (panelName) => {
    //Checks if there is a panel already on screen, then waits for it to slide off screen, then slides in the newly selected panel
    //Also checks if selected panel is already on screen, if so, it breaks out and does nothing
    
    if (panelName !== activePanel) {
      if (panelVisible) {
      closePanel();
      setTimeout(() => {
        setActivePanel(panelName);
        setPanelVisible(true);
      }, 500);
    } else {
      setActivePanel(panelName);
      setPanelVisible(true);
      handlePanelContent(panelName);

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
    setDoctorNotes('');
    setSickNotes('');
    setInjuryNotes('');
    setUserDate('');

  }



  return (
    <div id='wrapper'>
      <section id='leftSide'>
        <Header/>
        <ConnectionIndicator/>
        <section id='tabsContainer'>
          <div className='tabRow'>
            <Card name='Feedings' onClick={() => handleCardClick('Feedings')}/>
            <Card name='Sleeps' onClick={() => handleCardClick('Sleeps')}/>
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
        onAdd={handleAdd}
        content={
          activePanel === 'Feedings' ? (
            <div className='feedingsSlidePanelContent'>
              <div className='feedingsPanelHeader'>
                Feedings

              </div>
              <WeekC todayDate={new Date('Tue Oct 28 2025 18:37:12 GMT-0400 (Eastern Daylight Time')} /> {/* Replace new Date(...) with new Date(Date.now()) when testing is finished */}
              <div className='feedingsPanelBody'>
                <div className='feedingsAddSection'>
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

                <div className='feedingsEntryList'>
                  {feedEntries.length === 0 ? (
                    <p className='feedingsP'>No Feedings logged yet...</p>
                  ) : (
                    <ul>
                      {feedEntries.map(entry => (
                        <li key={entry._id} className='feedingsEntryItem'>
                          <strong>{entry.date}</strong> - {entry.amount} oz of {entry.type} by {entry.guardian} on {entry.time} {/* Replace entry.date with new Date(entry.date).toLocaleDateString() */}
                        </li>
                      ))}
                    </ul>
                  )}
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
                <ul>
                      {sleepEntries.map(entry => (
                        <li key={entry._id} className='feedingsEntryItem'> {/* Change to sleepsEntryItem */}
                          <strong>{entry.time}</strong> - {entry.amount} oz of {entry.type} by {entry.guardian} on {entry.date} {/* Replace entry.date with new Date(entry.date).toLocaleDateString() */}
                        </li>
                      ))}
                    </ul>

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
            <div className='sickSlidePanelContent'>
              <div className='sickPanelHeader'>
                Sicknesses
              </div>
              <div className='sickPanelBody'>
                <p className='sickP'>What happened with Adalynn?</p>
                <input
                  type='text'
                  placeholder='Start typing here...'
                  value={sickNotes}
                  onChange={(e) => setSickNotes(e.target.value)}
                />
                <p className='sickP'>What time and day did this happen?</p>
                <input
                  type='datetime-local'
                  value={userDate}
                  onChange={(e) => setUserDate(e.target.value)}
                />
              </div>
            </div>
          ) :  activePanel === 'Injuries' ? (
            <div className='injurySlidePanelContent'>
              <div className='injuryPanelHeader'>
                Injuries
              </div>
              <div className='injuryPanelBody'>
                <p className='injuryP'>What happen to Adalynn?</p>
                <input
                  type='text'
                  placeholder='Start typing here...'
                  value={injuryNotes}
                  onChange={(e) => setInjuryNotes(e.target.value)}
                />
                <p className='sickP'>What time and day did this happen?</p>
                <input
                  type='datetime-local'
                  value={userDate}
                  onChange={(e) => setUserDate(e.target.value)}
                />
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
