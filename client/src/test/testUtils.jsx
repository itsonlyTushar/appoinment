import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const createTestStore = (reducer, preloadedState) => configureStore({
  reducer,
  preloadedState,
});

export const renderWithProviders = (
  ui,
  { reducer, preloadedState, store = createTestStore(reducer, preloadedState) },
) => render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="test-client-id">
      <BrowserRouter>{ui}</BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>,
);