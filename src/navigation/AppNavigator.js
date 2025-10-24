import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from '../screens/TodoListScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

import DeleteTodoScreen from '../screens/DeleteTodoScreen';
import SearchTodoScreen from '../screens/SearchTodoScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Danh sách công việc' }} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: 'Thêm công việc' }} />

      <Stack.Screen name="DeleteTodo" component={DeleteTodoScreen} options={{ title: 'Xóa công việc' }} />
      <Stack.Screen name="SearchTodo" component={SearchTodoScreen} options={{ title: 'Tìm kiếm công việc' }} />
    </Stack.Navigator>
  );
}
