import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/Todo";
import todoService from "../services/todoService";
import { RootState } from "../store";

type TodoApiState = {
  todos: Todo[];
  targetTodo?: Todo;
  isError: boolean;
  isFetchingData: boolean;
  isDeletingData: boolean;
  isUpdatingData: boolean;
  isCreatingData: boolean;
  isSuccess: boolean;
  message: string | string[];
};

const initialState: TodoApiState = {
  todos: [],
  isError: false,
  isFetchingData: false,
  isDeletingData: false,
  isUpdatingData: false,
  isCreatingData: false,
  isSuccess: false,
  message: "",
};

export const getTodos = createAsyncThunk<any, any, { state: RootState }>(
  "get/todos",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await todoService.getTodos(token);
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

export const postTodos = createAsyncThunk<any, any, { state: RootState }>(
  "post/todos",
  async (todo: Todo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await todoService.createTodo(todo, token);
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

export const deleteTodo = createAsyncThunk<any, any, { state: RootState }>(
  "delete/todos",
  async (todo: any, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await todoService.deleteTodo(todo, token);
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

export const patchTodo = createAsyncThunk<any, any, { state: RootState }>(
  "patch/todo",
  async (todo: Todo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await todoService.patchTodoStatus(todo, token);
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

export const putTodo = createAsyncThunk<any, any, { state: RootState }>(
  "put/todo",
  async (todo: Todo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await todoService.updateTodo(todo, token);
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
    resetAll: (state) => {
      state.todos = [];
      state.isError = false;
      state.isFetchingData = false;
      state.isCreatingData = false;
      state.isDeletingData = false;
      state.isSuccess = false;
      state.message = "";
      state.targetTodo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isFetchingData = true;
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.isFetchingData = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action: any) => {
        state.isFetchingData = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postTodos.pending, (state) => {
        state.isCreatingData = true;
      })
      .addCase(postTodos.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isCreatingData = false;
        state.isSuccess = true;
        state.todos.push(action.payload);
      })
      .addCase(postTodos.rejected, (state, action: any) => {
        state.isCreatingData = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.isDeletingData = true;
      })
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<Todo | undefined>) => {
          state.isDeletingData = false;
          state.isSuccess = true;
          state.todos = state.todos.filter((t) => t.id !== action.payload?.id);
        }
      )
      .addCase(deleteTodo.rejected, (state, action: any) => {
        state.isDeletingData = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(patchTodo.pending, (state) => {
        state.isUpdatingData = true;
      })
      .addCase(patchTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isUpdatingData = false;
        state.isSuccess = true;
        const targetItem = state.todos.findIndex(
          (x) => x.id === action.payload.id
        );
        state.todos[targetItem] = action.payload;
      })
      .addCase(patchTodo.rejected, (state, action: any) => {
        state.isUpdatingData = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(putTodo.pending, (state) => {
        state.isUpdatingData = true;
      })
      .addCase(putTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isUpdatingData = false;
        state.isSuccess = true;
        const targetItem = state.todos.findIndex(
          (x) => x.id === action.payload.id
        );
        state.todos[targetItem] = action.payload;
      })
      .addCase(putTodo.rejected, (state, action: any) => {
        state.isUpdatingData = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAll } = todoSlice.actions;
export default todoSlice.reducer;
