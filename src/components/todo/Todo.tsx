import {
  Box,
  Button,
  Checkbox,
  Container,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { reset } from "../../reducers/authSlice";
import { getTodos } from "../../reducers/todoSlice";

// const todos = [
//   { id: "1", title: "todo 1", description: "1", status: "OPEN" },
//   { id: "2", title: "todo 2", description: "3", status: "DONE" },
// ];

const Todo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  // const navigate = useNavigate();

  const { todos, isLoading, isSuccess } = useSelector(
    (state: RootState) => state.todo
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

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

        {/* {isLoading ? (
        <LoadingButton loading loadingIndicator="Loading…" variant="outlined" />
      ) : ( */}
        <Button variant="outlined">Create Todo</Button>
        {/* )} */}
      </Stack>

      <List>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              sx={{
                width: "60vw",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                gap: "10rem",
                borderBottom: "1px solid gray",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Checkbox checked={todo.status === "DONE"} />
                <Typography
                  style={{ color: todo.status === "DONE" ? "green" : "" }}
                  key={todo.id}
                >
                  {todo.title}
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
                <Button color="secondary" variant="contained">
                  DELETE
                </Button>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Todo;
