// Parent app code
import React, {useState} from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import {io} from 'socket.io-client';

const ParentApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);

  const authenticate = () => {
    const socket = io('http://localhost:3000/'); // Replace with your server address

    // Authenticate with the server
    socket.emit('authenticate', {username, password});

    // Listen for authentication response
    socket.on('authenticated', ({authenticated: isAuth, role: userRole}) => {
      if (isAuth && userRole === 'parent') {
        setAuthenticated(true);
        setRole('parent');
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
          <Text>Parent Login</Text>
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
          <Button title="Login as Parent" onPress={authenticate} />
        </View>
      ) : (
        <View>
          <Text>Parent App</Text>
          {/* Parent app functionality */}
        </View>
      )}
    </View>
  );
};

export default ParentApp;
