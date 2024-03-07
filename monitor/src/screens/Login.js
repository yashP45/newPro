import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {io} from 'socket.io-client';
const Login = ({navigation}) => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Child', value: 'Child'},
    {label: 'Parent ', value: 'Parent'},
  ]);
  const socket = io('http://localhost:3000');
  console.log(socket)
  const handleButtonClick = () => {
    if (value === 'Child') {
      navigation.navigate('Child');
    } else if (value === 'Parent') {
      navigation.navigate('Parent');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Role</Text>
      <View style={styles.pickerContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleButtonClick}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
