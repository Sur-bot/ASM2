import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useSelector } from 'react-redux';

export default function TodoListScreen({ navigation }) {
  const todos = useSelector(state => state.todos);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Thêm công việc" onPress={() => navigation.navigate('AddTodo')} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditTodo', { id: item.id })} onLongPress={() => navigation.navigate('DeleteTodo', { id: item.id })}>
            <Text style={{ fontSize: 18, textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
