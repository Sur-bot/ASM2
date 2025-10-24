import { ADD_TODO, UPDATE_TODO, DELETE_TODO, TOGGLE_TODO } from "../action/todoAction";

// 1. SỬA LỖI: initialState bây giờ CHỈ LÀ MỘT MẢNG RỖNG.
const initialState = [];

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            const newTodo = {
                id: Math.random().toString(36).substring(2, 9),
                ...action.payload,
                completed: false,
            };
            // console.log("REDUCER: ĐÃ THÊM TODO MỚI, STATE TIẾP THEO SẼ LÀ:", [...state, newTodo])
            return [...state, newTodo];

        case UPDATE_TODO:
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        text: action.payload.newText,
                        startDate: action.payload.startDate,
                        endDate: action.payload.endDate,
                    };
                }
                return todo;
            });

        case TOGGLE_TODO:
            return state.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );

        case DELETE_TODO:
            // 4. SỬA LỖI: Trả về trực tiếp mảng mới sau khi filter
            return state.filter((todo) => todo.id !== action.payload);

        default:
            return state;
    }
};

export default todoReducer;