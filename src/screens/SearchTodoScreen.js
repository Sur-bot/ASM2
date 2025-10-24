import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SearchTodoScreen({ navigation }) {
  const todos = useSelector(state => state.todos);
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // ====== Hàm lọc todo theo từ khóa + ngày ======
  const filteredTodos = todos.filter(todo => {
    const textMatch = todo.text.toLowerCase().includes(keyword.toLowerCase());
    const todoStart = todo.startDate ? new Date(todo.startDate) : null;
    const todoEnd = todo.endDate ? new Date(todo.endDate) : null;

    const inStartRange = !startDate || (todoStart && todoStart >= startDate);
    const inEndRange = !endDate || (todoEnd && todoEnd <= endDate);

    return textMatch && inStartRange && inEndRange;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm công việc</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa tìm kiếm ..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.dateFilter}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.dateText}>
            {startDate ? `Từ: ${startDate.toLocaleDateString()}` : 'Chọn ngày bắt đầu'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.dateText}>
            {endDate ? `Đến: ${endDate.toLocaleDateString()}` : 'Chọn ngày kết thúc'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nút xóa bộ lọc */}
      {(startDate || endDate) && (
        <TouchableOpacity
          onPress={() => { setStartDate(null); setEndDate(null); }}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>Xóa bộ lọc thời gian</Text>
        </TouchableOpacity>
      )}

      {/* Danh sách kết quả */}
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={[styles.itemText, item.completed && { textDecorationLine: 'line-through' }]}>
              {item.text}
            </Text>
            <Text style={styles.dateLabel}>
              {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có công việc phù hợp</Text>}
      />

      {/* Bộ chọn ngày */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (event?.type === 'set') setStartDate(selectedDate);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          minimumDate={startDate || new Date()}
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (event?.type === 'set') setEndDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}

// ====== Styles ======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    marginBottom: 15,
  },
  dateFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  clearText: {
    color: '#007bff',
    fontSize: 14,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
  },
  dateLabel: {
    color: '#666',
    fontSize: 14,
  },
});
