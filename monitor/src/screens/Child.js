// Child app code
import React, {useEffect, useState} from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import io from 'socket.io-client';

const Child = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const socket = io('http://your-server-ip:3000'); // Replace with your server address

    // Authenticate with the server
    socket.emit('authenticate', {
      username: 'sharedUsername',
      password: 'sharedPassword',
    });

    // Listen for authentication response
    socket.on('authenticated', isAuthenticated => {
      setAuthenticated(isAuthenticated);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendNotification = () => {
    if (authenticated) {
      const socket = io('http://your-server-ip:3000'); // Replace with your server address

      // Simulate receiving a notification
      const notificationData = {
        title: 'New Notification',
        message: 'This is a test notification from the child app.',
      };

      // Emit the notification to the server
      socket.emit('notification', notificationData);
    }
  };

  return (
    <View>
      <Text>Child App</Text>
      {authenticated ? (
        <Button title="Send Notification" onPress={sendNotification} />
      ) : (
        <View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <Button
            title="Authenticate"
            onPress={() => authenticate(username, password)}
          />
        </View>
      )}
    </View>
  );
};

export default Child;
