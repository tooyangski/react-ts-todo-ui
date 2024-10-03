import { RouterProvider } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import router from "./Routes";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ToastContainer position="top-right" />
        <Header />
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
