import { ADD_TODO, UPDATE_TODO, DELETE_TODO, TOGGLE_TODO } from "../action/todoAction"; 

// State ban đầu là một OBJECT chứa mảng todos
const initialState = {
    todos: [] 
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            const newTodo = {
                // Tạo ID duy nhất và an toàn hơn Date.now()
                id: Math.random().toString(36).substring(2, 9), 
                ...action.payload, // payload chứa { text, startDate, endDate }
                completed: false,
            };
            return {
                ...state, 
                todos: [...state.todos, newTodo], // Thêm todo mới vào mảng state.todos
            };

        case UPDATE_TODO:
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    // Chỉ cập nhật lại text, giữ nguyên các thuộc tính khác
                    return { ...todo, text: action.payload.newText }; 
                }
                return todo;
            });
            return {
                ...state,
                todos: updatedTodos,
            };

        case TOGGLE_TODO:
            const toggledTodos = state.todos.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
            return {
                ...state,
                todos: toggledTodos,
            };

        case DELETE_TODO:
            const remainingTodos = state.todos.filter((todo) => todo.id !== action.payload);
            return {
                ...state,
                todos: remainingTodos,
            };

        default:
            return state;
    }
};

export default todoReducer;