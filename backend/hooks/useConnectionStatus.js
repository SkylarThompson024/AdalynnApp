import { useState, useEffect } from 'react';

export function useConnectionStatus(pingUrl = 'https://adalynnapp1.onrender.com/ping', interval = 30000) { //30 Second interval
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const checkConnection = async() => {
            try {
                const res = await fetch(pingUrl);
                setIsConnected(res.ok);
            } catch {
                setIsConnected(false);
            }
        };

        checkConnection(); //Initial Connection Check
        const timer = setInterval(checkConnection, interval);
        return () => clearInterval(timer);
    }, [pingUrl, interval]);

    return isConnected;
}