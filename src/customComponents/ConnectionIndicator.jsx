import { useConnectionStatus } from '../../backend/hooks/useConnectionStatus';

export default function ConnectionIndicator() {
    const isConnected = useConnectionStatus();

    return (
        <div style={{
            padding: '0.5rem 1rem',
            backgroundColor: isConnected ? '#d4fcd4' : '#fddcdc',
            color: isConnected ? '#2e7d32' : '#c62828',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            transition: 'background-color 0.3s ease',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            textAlign: 'center'
        }}>
            {isConnected ? 'Connected to server' : 'Offline - changes will not sync'}
        </div>
    );
}