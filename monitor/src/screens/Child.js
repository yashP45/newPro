// Child app code
import React, {useEffect, useState} from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import {io} from 'socket.io-client';

const Child = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const socket = io('https://newpro-6b8t.onrender.com');
 
  const authenticate = () => {
    // Authenticate with the server
    socket.emit('authenticate', {username, password});

    socket.on('authenticated', ({authenticated: isAuth}) => {
      if (isAuth) {
        setAuthenticated(true);
      } else {
        // Handle authentication failure
        console.log('Authentication failed');
      }
    });
  };

  return (
    <View>
      {!authenticated ? (
        <View>
          <Text>Child Login</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button title="Login as Child" onPress={authenticate} />
        </View>
      ) : (
        <View>
          <Text>Child App</Text>
        </View>
      )}
    </View>
  );
};

export default Child;
