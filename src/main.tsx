import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.js";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index.js";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
