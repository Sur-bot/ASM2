import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';

export default function SearchTodoScreen({ navigation }) {
  const todos = useSelector(state => state.todos);
  const [keyword, setKeyword] = useState('');

  // Lọc danh sách todo theo từ khóa (không phân biệt hoa/thường)
  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm công việc</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa tìm kiếm ..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={[styles.itemText, item.completed && { textDecorationLine: 'line-through' }]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có công việc phù hợp</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
  },
});
