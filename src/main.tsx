import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import 'react-medium-image-zoom/dist/styles.css'
// REDUX
import { Provider } from "react-redux";
import { store, persistor } from "./store";
// REDUX-PERSIST
import { PersistGate } from "redux-persist/integration/react";

// ROUTER
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
