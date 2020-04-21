import React from "react";
import AppContainer from "./src/modules/AppContainer/AppContainer.js";
import { Provider } from "react-redux";
//import * as Sentry from 'sentry-expo';
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  isLoggedIn,
  contacts,
  orgData,
  services,
  contactsUIState,
  ids,
  users,
  userUIState,
} from "./src/reducers";
import promiseMiddleware from "./src/middlewares/promisemiddleware";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { logger } from "redux-logger";

const reducer = combineReducers({
  isLoggedIn,
  contacts,
  services,
  orgData,
  contactsUIState,
  userUIState,
  ids,
  users,
});
const store = createStore(reducer, applyMiddleware(promiseMiddleware));

// Sentry.init({
//   dsn: 'https://a3e8732ac1e546ee97bfb741076caeb6@o229368.ingest.sentry.io/5207482',
//   enableInExpoDevelopment: true,
//   debug: true,
// });

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
