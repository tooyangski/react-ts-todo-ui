import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  deleteTodo,
  getTodos,
  postTodos,
  updateTodo,
} from "../../reducers/todoSlice";
import { LoadingButton } from "@mui/lab";
import { Todo, Todo as TodoDto } from "../../types/Todo";

const Todos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<TodoDto | undefined>(
    undefined
  );

  const { todos, isFetchingData, isCreatingData } = useSelector(
    (state: RootState) => state.todo
  );

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getTodos(token));
  }, [dispatch, token]);

  const clearFields = () => {
    setTitle("");
    setDesc("");
  };

  const handleCreateTodo = (e: any) => {
    e.preventDefault();

    const todo: TodoDto = {
      title,
      description: desc,
    };

    clearFields();
    dispatch(postTodos(todo));
  };

  const handleDeleteTodo = (e: any) => {
    e.preventDefault();
    dispatch(deleteTodo(selectedTodo));
  };

  const handleDone = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  return (
    <Container>
      <Stack spacing={1} sx={{ width: "50vw", margin: "0 auto" }}>
        <TextField
          type="text"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type="text"
          label="Description"
          variant="outlined"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {isCreatingData ? (
          <LoadingButton
            loading
            loadingIndicator="Loading…"
            variant="outlined"
          />
        ) : (
          <Button onClick={handleCreateTodo} variant="outlined">
            Create Todo
          </Button>
        )}
      </Stack>

      {isFetchingData ? (
        <CircularProgress />
      ) : (
        <List>
          {todos.map((t) => {
            return (
              <ListItem
                key={t.id}
                sx={{
                  minWidth: "60vw",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10rem",
                  borderBottom: "1px solid gray",
                  backgroundColor: t.id === selectedTodo?.id ? "lightblue" : "",
                }}
                onClick={() => setSelectedTodo(t)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    minWidth: "30%",
                  }}
                >
                  <Checkbox
                    checked={t.status === "OPEN" ? false : true}
                    onClick={() => handleDone(t)}
                  />
                  <Typography
                    style={{ color: t.status === "DONE" ? "green" : "" }}
                    key={t.id}
                  >
                    {t.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Button variant="contained">EDIT</Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={(e) => {
                      setSelectedTodo(t);
                      handleDeleteTodo(e);
                    }}
                  >
                    DELETE
                  </Button>
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
};

export default Todos;
