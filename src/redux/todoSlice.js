import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(t => t.id === id);
      if (todo) todo.text = newText;
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
