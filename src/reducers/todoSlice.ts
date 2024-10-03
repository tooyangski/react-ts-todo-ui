import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoStatus } from "../types/Todo";
import todoService from "../services/todoService";
import { RootState } from "../store";

type TodoApiState = {
  todos: Todo[];
  //   todo: Todo;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | string[];
};

const initialState: TodoApiState = {
  todos: [],
  //   todo: {
  //     title: "",
  //     description: "",
  //     status: TodoStatus.OPEN,
  //   },
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getTodos = createAsyncThunk("get/todos", async (_, thunkAPI) => {
  try {
    return await todoService.getTodos();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const postTodos = createAsyncThunk(
  "post/todos",
  async (todo: Todo, thunkAPI) => {
    try {
      return await todoService.createTodo(todo);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.todos = [];
      //   state.todo = { title: "", description: "", status: TodoStatus.OPEN };
      state.isError = false;

      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postTodos.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postTodos.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
