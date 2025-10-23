import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/action/todoAction';

export default function AddTodoScreen({ navigation }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Nhập công việc mới..." value={text} onChangeText={setText} style={{borderRadius: 8 ,borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Thêm" onPress={() => { dispatch(addTodo(text)); navigation.goBack(); }} />
    </View>
  );
}
