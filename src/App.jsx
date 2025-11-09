import Header from './views/partials/Header.jsx';
import Card from './customComponents/Card.jsx';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
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
  postFeedEntry,
  fetchSleepEntries,
  postSleepEntry,
  postDiaperEntry,
  fetchDiaperEntries,
  fetchDoctorEntries,
  fetchSickEntries,
  fetchInjuryEntries,
  postDoctorEntry,
  postSickEntry,
  postInjuryEntry,
  // postSleepEntry,
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
  const [addVisible, setAddVisible] = useState(false);
  const [userDate, setUserDate] = useState('');
  // Feedings
  const [feedAmount, setFeedAmount] = useState('');
  const [feedType, setFeedType] = useState('');
  const [feedEntries, setFeedEntries] = useState([]);
  //Sleeps
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [totalSleep, setTotalSleep] = useState('');
  const [sleepEntries, setSleepEntries] = useState([]);
  //Diaper Changes
  const [diaperType, setDiaperType] = useState('');
  const [diaperTime, setDiaperTime] = useState('');
  const [diaperEntires, setDiaperEntires] = useState([]);
  //Doctor Appts
  const [doctorNotes, setDoctorNotes] = useState('');
  const [doctorEntires, setDoctorEntries] = useState('');
  //Sicknesses
  const [sickNotes, setSickNotes] = useState('');
  const [sickEntries, setSickEntries] = useState('');
  //Injuries
  const [injuryNotes, setInjuryNotes] = useState('');
  const [injuryEntries, setInjuryEntries] = useState('');
  //Calendar
  const [calendarDate, setCalendarDate] = useState(new Date());
  
  


  const handleAdd = () => {
    setAddVisible(true);
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
    if (panelName === "Diaper Change") {
      const entries = await fetchDiaperEntries()
      setDiaperEntires(entries)
    }
    if (panelName === "Doctor Appts") {
      const entries = await fetchDoctorEntries()
      setDoctorEntries(entries)
    }
    if (panelName === "Sicknesses") {
      const entries = await fetchSickEntries()
      setSickEntries(entries)
    }
    if (panelName === "Injuries") {
      const entries = await fetchInjuryEntries()
      setInjuryEntries(entries)
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
    setAddVisible(false);
    setActivePanel('');
    clearEverything();
  };
  const calculateTotalTime = (fromTime, toTime) => {
    if (fromTime && toTime) {
      fromTime = convertTimeToDateObject(fromTime);
      toTime = convertTimeToDateObject(toTime);
      
      const FROM = new Date(fromTime);
      const TO = new Date(toTime);
      const DIFFMs = TO - FROM;
      const totalMinutes = Math.floor(DIFFMs / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const totalTime = `${hours} H: ${minutes}M`;
      setTotalSleep(totalTime)
    }
    
  }
  const convertTimeToDateObject = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
      const tempDate = new Date();
      tempDate.setHours(hours, minutes, 0, 0)
      return tempDate;
  }
  const handleFeedSubmit = (ouncesDrank, date, guardian='Unknown', time, type) => {
    let guardianSelected = "Unknown" //Switch to automatically providing current user as guardianSelected when a login feature is implemented
    guardianSelected = guardian;
    // console.log(`ActivePanel: ${activePanel}`);
    if (!ouncesDrank) {
      ouncesDrank = 0.0
    }
    if (!date) {
      date = new Date(Date.now());
    }
    if (!type) {
      type = ('Default')
    }
    if ((!time) || (time === date)) {
      time = new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    }
    
    // console.log(`Amount: ${parseFloat(ouncesDrank)}`);
    // console.log(`Date: ${date}`);
    // console.log(`Guardian: ${guardianSelected}`);
    // console.log(`Type: ${type}`);
    // console.log(`Time: ${time}`);

    postFeedEntry({
      amount: parseFloat(ouncesDrank),
      date: date,
      guardian: guardianSelected,
      time: time,
      type: type,
    })
    setAddVisible(false);
    clearEverything();
    setTimeout(() => {
      handlePanelContent('Feedings');
    }, 1000);
  };
  const handleSleepSubmit = (fromTime, toTime, totalSleep, date, guardian='Unknown') => {
    let guardianSelected = "Unknown" //Switch to automatically providing current user as guardianSelected when a login feature is implemented
    guardianSelected = guardian;
    if (typeof date != Date) {
      date = new Date(Date.now());
    }
    postSleepEntry({
      fromTime: fromTime,
      toTime: toTime,
      elapsedTime: totalSleep,
      date: date,
      guardian: guardianSelected,
    })
    setAddVisible(false);
    clearEverything();
    setTimeout(() => {
      handlePanelContent('Sleeps');
    }, 1000);
  };
  const handleDiaperSubmit = (type, date, guardian='Unknown', time) => {
    let guardianSelected = "Unknown" //Switch to automatically providing current user as guardianSelected when a login feature is implemented
    guardianSelected = guardian;
    if (typeof date != Date) {
      date = new Date(Date.now());
    }
    if (!type) {
      type = ('Default')
    }
    if ((!time) || (time === date)) {
      time = new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    }
    postDiaperEntry({
      type: type,
      date: date,
      guardian: guardianSelected,
      time: time,
    })
    setAddVisible(false);
    clearEverything();
    setTimeout(() => {
      handlePanelContent('Diaper Change');
    }, 1000);
  };
  const handleDoctorSubmit = (date, guardian, notes) => {
    let guardianSelected = "Unknown" //Switch to automatically providing current user as guardianSelected when a login feature is implemented
    guardianSelected = guardian;
    if (typeof date != Date) {
      date = new Date(Date.now());
    }
    let time = new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    postDoctorEntry({
      date: date,
      time: time,
      notes: notes,
      guardian: guardianSelected,
    })
    setAddVisible(false);
    clearEverything();
    setTimeout(() => {
      handlePanelContent('Doctor Appts');
    }, 1000);
  };
  const handleSickSubmit = (date, guardian, notes) => {
    let guardianSelected = "Unknown" //Switch to automatically providing current user as guardianSelected when a login feature is implemented
    guardianSelected = guardian;
    if (typeof date != Date) {
      date = new Date(Date.now());
    }
    let time = new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    postSickEntry({
      date: date,
      time: time,
      notes: notes,
      guardian: guardianSelected,
    })
    setAddVisible(false);
    clearEverything();
    setTimeout(() => {
      handlePanelContent('Sicknesses');
    }, 1000);
  };
  const handleInjurySubmit = (date, guardian, notes) => {
    let guardianSelected = "Unknown" //Switch to automatically providing current user as guardianSelected when a login feature is implemented
    guardianSelected = guardian;
    if (typeof date != Date) {
      date = new Date(Date.now());
    }
    let time = new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    postInjuryEntry({
      date: date,
      time: time,
      notes: notes,
      guardian: guardianSelected,
    })
    setAddVisible(false);
    clearEverything();
    setTimeout(() => {
      handlePanelContent('Injuries');
    }, 1000);
  }
  
  const handleCancel = () => {
    setAddVisible(false);
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

  };



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
            <Card name='Diaper Change' onClick={() => handleCardClick('Diaper Change')}/>
            <Card name='Doctor Appts' onClick={() => handleCardClick('Doctor Appts')}/>
          </div>
          <div className='tabRow'>
            <Card name='Sicknesses' onClick={() => handleCardClick('Sicknesses')}/>
            <Card name='Injuries' onClick={() => handleCardClick('Injuries')}/>
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
              <WeekC todayDate={new Date(Date.now())} /> {/* Replace new Date(...) with new Date(Date.now()) when testing is finished */}
              <div className='feedingsPanelBody'>
                <div className={`feedingsAddSection ${addVisible ? 'visible' : ''}`}>
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
                  <div className='feedingsButtonsRow'>
                    <button className='feedingsButton' onClick={() => handleFeedSubmit(feedAmount, userDate, 'None', userDate, feedType)}>Submit</button>
                    <button className='feedingsButton' onClick={() => handleCancel()}>Cancel</button>
                  </div>
                </div>
                <div className='feedingsEntryList'>
                  {feedEntries.length === 0 ? (
                    <p className='feedingsP'>No Feedings logged yet...</p>
                  ) : (
                    <div>
                      {/* <p className='feedingsP'> Date | Amount | Type | Guardian | Time </p> */}
                      <ul>
                        {feedEntries.map(entry => (
                          <li key={entry._id} className='feedingsEntryItem'>
                            <strong>
                              {new Date(entry.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                            </strong> 
                            {' '} - {entry.amount} oz of {entry.type} by {entry.guardian} at {entry.time} 
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activePanel === 'Sleeps' ? (
            <div className='sleepsSlidepanelContent'>
              <div className='sleepsPanelHeader'>
                Sleeps
              </div>
              <WeekC todayDate={new Date(Date.now())} />
              <div className='sleepsPanelBody'>
                <div className={`sleepsAddSection ${addVisible ? 'visible' : ''}`}>
                  <div className='sleepsInputSection'>
                    <p className='sleepsP'>How long did Adalynn sleep?</p>
                    <div className='sleepsTimeRow'>
                      <p className='sleepsP'>From: </p>
                      <input
                        type='time'
                        value={fromTime}
                        onChange={(e) => {setFromTime(e.target.value);
                          calculateTotalTime(e.target.value, toTime);
                        }}
                      />
                    </div>
                    <div className='sleepsTimeRow'>
                      <p className='sleepsP'>To: </p>
                      <input
                        type='time'
                        value={toTime}
                        onChange={(e) => {setToTime(e.target.value);
                          calculateTotalTime(fromTime, e.target.value)
                        }}
                      />
                    </div>
                    <p className='sleepsP'>Total: {totalSleep}</p>
                    <p className='sleepsP'>What day is this for?</p>
                    <div className='sleepsTimeGroup'>
                        <input
                          type="datetime-local"
                          value={userDate}
                          onChange={(e) => setUserDate(e.target.value)}
                        />
                    </div>
                    <div className='sleepsButtonsRow'>
                      <button className='sleepsButton' onClick={() => handleSleepSubmit(fromTime, toTime, totalSleep, userDate, 'None')}>Submit</button>
                      <button className='sleepsButton' onClick={() => handleCancel()}>Cancel</button>
                    </div>
                  </div>
                </div>
                <div className='sleepsEntryList'>
                  {sleepEntries.length === 0 ? (
                    <p className='sleepsP'>No Sleeps logged yet...</p>
                  ): (
                  <div>
                    {/* <p className='sleepsP'> From | To | Total </p> */}
                    <ul>
                      {sleepEntries.map(entry => (
                        <li key={entry._id} className='sleepsEntryItem'> 
                          <strong>
                            {new Date(entry.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                          </strong>
                          {' '} - {entry.fromTime} to {entry.toTime} - Total: {entry.elapsedTime}
                        </li>
                      ))}
                    </ul>
                  </div>
                  )}
                </div>
              </div>
            </div>
          ) :  activePanel === 'Diaper Change' ? (
            <div className='diaperSlidePanelContent'>
              <div className='diaperPanelHeader'>
                Diaper Change
              </div>
              <WeekC todayDate={new Date(Date.now())} />
              <div className='diaperPanelBody'>
                <div className={`diaperAddSection ${addVisible ? 'visible' : ''}`}>
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
                  <div className='diaperButtonsRow'>
                    <button className='diaperButton' onClick={() => handleDiaperSubmit(diaperType, userDate, 'None', diaperTime)}>Submit</button>
                    <button className='diaperButton' onClick={() => handleCancel()}>Cancel</button>
                  </div>
                </div>
                <div className='diaperEntryList'>
                  {diaperEntires.length === 0 ? (
                    <p className='diaperP'>No Diaper Changes logged yet...</p>
                  ) : (
                    <div>
                      {/* <p className='diaperP'> Date | Type | Guardian | Time </p> */}
                      <ul>
                        {diaperEntires.map(entry => (
                          <li key={entry._id} className='diaperEntryItem'>
                            <strong>
                              {new Date(entry.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                            </strong>
                            {' '} - {entry.type} with {entry.guardian} at {entry.time}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) :  activePanel === 'Doctor Appts' ? (
            <div className='doctorSlidePanelContent'>
              <div className='doctorPanelHeader'>
                Doctor Appts
              </div>
              <WeekC todayDate={new Date(Date.now())} />
              <div className='doctorPanelBody'>
                <div className={`doctorAddSection ${addVisible ? 'visible' : ''}`}>
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
                  <div className='doctorButtonsRow'>
                    <button className='doctorButton' onClick={() => handleDoctorSubmit(userDate, 'None', doctorNotes)}>Submit</button>
                    <button className='doctorButton' onClick={() => handleCancel()}>Cancel</button>
                  </div>
                </div>
                <div className='doctorEntryList'>
                  {doctorEntires.length === 0 ? (
                    <p className='doctorP'>No Doctor Appts logged yet...</p>
                  ) : (
                    <div>
                      {/* <p className='doctorP'> Date | Time | Guardian | Notes </p> */}
                      <ul>
                        {doctorEntires.map(entry => (
                          <li key={entry._id} className='doctorEntryItem'>
                            <strong>
                              {new Date(entry.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                            </strong>
                            {' '} - at {entry.time} by {entry.guardian} - Notes: {entry.notes}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) :  activePanel === 'Sicknesses' ? (
            <div className='sickSlidePanelContent'>
              <div className='sickPanelHeader'>
                Sicknesses
              </div>
              <WeekC todayDate={new Date(Date.now())} />
              <div className='sickPanelBody'>
                <div className={`sickAddSection ${addVisible ? 'visible' : ''}`}>
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
                  <div className='sickButtonsRow'>
                    <button className='sickButton' onClick={() => handleSickSubmit(userDate, 'None', sickNotes)}>Submit</button>
                    <button className='sickButton' onClick={() => handleCancel()}>Cancel</button>
                  </div>
                </div>
                <div className='sickEntryList'>
                  {sickEntries.length === 0 ? (
                    <p className='sickP'>No Sicknesses logged yet...</p>
                  ) : (
                    <div>
                      {/* <p className='sickP'> Date | Time | Guardian | Notes </p> */}
                      <ul>
                        {sickEntries.map(entry => (
                          <li key={entry._id} className='sickEntryItem'>
                            <strong>
                              {new Date(entry.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                            </strong>
                            {' '} - at {entry.time} with {entry.guardian} - Notes: {entry.notes}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) :  activePanel === 'Injuries' ? (
            <div className='injurySlidePanelContent'>
              <div className='injuryPanelHeader'>
                Injuries
              </div>
              <WeekC todayDate={new Date(Date.now())} />
              <div className='injuryPanelBody'>
                <div className={`injuryAddSection ${addVisible ? 'visible' : ''}`}>
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
                  <div className='injuryButtonsRow'>
                    <button className='injuryButton' onClick={() => handleInjurySubmit(userDate, 'None', injuryNotes)}>Submit</button>
                    <button className='injuryButton' onClick={() => handleCancel()}>Cancel</button>
                  </div>
                </div>
                <div className='injuryEntryList'>
                  {injuryEntries.length === 0 ? (
                    <p className='injuryP'>No Injuries logged yet...</p>
                  ) : (
                    <div>
                      {/* <p className='injuryP'> Date | Time | Guardian | Notes </p> */}
                      <ul>
                        {injuryEntries.map(entry => (
                          <li key={entry._id} className='injuryEntryItem'>
                            <strong>
                              {new Date(entry.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                            </strong>
                            {' '} - at {entry.time} with {entry.guardian} - Notes: {entry.notes} 
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) :  activePanel === 'Calendar' ? (
            <div className='slidepanelContent'>
              <div className='calendarPanelHeader'>
                Calendar
              </div>
              <div className='calendarPanelBody'>
                <Modal 
                  className='modalNotReadyYet'
                  isOpen={true}
                  
                >
                  <p>Sorry, This feature is not ready yet...</p>
                </Modal>
                <div className='calendarContainer'>
                  <Calendar
                    locale='en-US'
                    onChange={setCalendarDate}
                    value={calendarDate}
                    formatShortWeekday={(locale, date) => 
                      date.toLocaleDateString(locale, { weekday: 'long' })
                    }

                  />
                </div>
                {/* <p>Selected date: {calendarDate.toLocaleDateString()}</p> */}
              </div>
            </div>
          ) :  activePanel === 'Settings' ? (
            <div className='slidepanelContent'>
              <div className='settingsPanelHeader'>
                Settings
              </div>
              <div className='settingsPanelBody'>
                <Modal 
                  className='modalNotReadyYet'
                  isOpen={true}
                  
                >
                  <p>Sorry, This feature is not ready yet...</p>
                </Modal>
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
