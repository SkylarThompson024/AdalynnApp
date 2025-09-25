import { Link } from 'react-router-dom';
import '../assets/styles/index.css';


const labels = [
    {
        name: 'Feedings',
        icon: 'restaurant',
        to: '/feed'
    },
    {
        name: 'Sleeps',
        icon: 'crib',
        to: '/sleep'
    },
    {
        name: 'Diaper Change',
        icon: 'baby_changing_station',
        to: '/diaper'
    },
    {
        name: 'Doctor Appts',
        icon: 'health_and_safety',
        to: '/doctor'
    },
    {
        name: 'Sicknesses',
        icon: 'sick',
        to: '/sick'
    },
    {
        name: 'Injuries',
        icon: 'healing',
        to: '/injury'
    },
    {
        name: 'Calendar',
        icon: 'calendar_month',
        to: '/calendar'
    },
    {
        name: 'Settings',
        icon: 'settings',
        to: '/settings'
    },
]

function Card({ name, onClick }) {
    const label = labels.find(item => item.name === name);
    if (!label) return null;

    return (
        <div className='card' onClick={onClick}>
            <p className='cardLink'>
                <span className="material-icons">
                    {label.icon}
                </span>
                <span className='cardText'>
                    {label.name}
                </span>
            </p>
        </div>
    );
}

export default Card;