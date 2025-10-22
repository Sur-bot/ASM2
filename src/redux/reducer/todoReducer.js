import { ADD_TODO, UPDATE_TODO, DELETE_TODO, TOGGLE_TODO } from "../action/todoAction"; 

const initialState = [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state, 
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case UPDATE_TODO:
      const { id, newText } = action.payload;
      return state.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText } // Tạo object mới cho todo được update
          : todo // Giữ nguyên các todo khác
      );

    case TOGGLE_TODO:
      const todoId = action.payload;
      return state.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed } // Đảo ngược 'completed'
          : todo
      );

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload); // Trả về array mới không chứa todo cần xóa

    default:
      return state; // Trả về state hiện tại nếu không có action nào khớp
  }
};

export default todoReducer;
