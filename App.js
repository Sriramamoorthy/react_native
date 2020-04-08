import React from "react";
import AppContainer from "./src/modules/AppContainer/AppContainer.js";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { friendReducer } from "./src/reducers";
import promiseMiddleware from "./src/middlewares/promisemiddleware";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
const reducer = combineReducers({ friendReducer });
const store = createStore(reducer, applyMiddleware(promiseMiddleware));

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
