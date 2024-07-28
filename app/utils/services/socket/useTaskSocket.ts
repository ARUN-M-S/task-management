// useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (url, event, callback) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  useEffect(() => {
    if (socket) {
      socket.on(event, callback);

      // Cleanup on socket change or component unmount
      return () => {
        socket.off(event, callback);
      };
    }
  }, [socket, event, callback]);

  return socket;
};

export default useSocket;
