export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = (todoData) => ({
  type: ADD_TODO,
  payload: todoData,
});

export const updateTodo = (updateData) => ({
  type: UPDATE_TODO,
  payload: updateData,
});

export const deleteTodo = (id)  => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

