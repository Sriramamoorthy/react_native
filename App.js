import React from "react";
import AppContainer from "./src/modules/AppContainer/AppContainer.js";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { friendReducer, isLoggedIn, contacts, orgData } from "./src/reducers";
import promiseMiddleware from "./src/middlewares/promisemiddleware";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { logger } from "redux-logger";

const reducer = combineReducers({
  friendReducer,
  isLoggedIn,
  contacts,
  orgData,
});
const store = createStore(reducer, applyMiddleware(logger, promiseMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <AppContainer />
      </ApplicationProvider>
    </Provider>
  );
}
