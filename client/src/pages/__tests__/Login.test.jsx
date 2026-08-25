import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { authReducer } from '../../features/reducers/authReducers';
import * as authActions from '../../features/actions/authActions';
import { renderWithProviders } from '../../test/testUtils';

const authReducerMap = { auth: authReducer };
const defaultAuthState = { auth: { loading: false, error: null, userInfo: null, success: false } };

const renderLogin = () => renderWithProviders(<Login />, {
  reducer: authReducerMap,
  preloadedState: defaultAuthState,
});

describe('Login page basic tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // CHECK IF LOGIN PAGE MOUNTS PROPERLY ON LOAD OR NOT
  it('mounts the login page', () => {
    renderLogin();

    expect(screen.getByRole('heading', { name: /patient login/i })).toBeInTheDocument();
  });

  // TEST LOGIN FORM FIELDS ARE LOADED OR NOT
  it('displays the login form fields', () => {
    renderLogin();

    expect(screen.getByPlaceholderText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
  });

  // TEST SIGN IN BUTTON IS AVAILABLE AND CLICKABLE
  it('provides a clickable sign in button', async () => {
    const user = userEvent.setup();
    renderLogin();

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);
    expect(submitButton).toBeEnabled();
  });

  // TEST VALID LOGIN FLOW AND STORE RETURNED LOGIN DATA
  it('completes the login flow', async () => {
    const user = userEvent.setup();
    const loggedInUser = { name: 'John Doe', email: 'john@example.com' };
    const loginAction = vi.spyOn(authActions, 'userLogin').mockImplementation((credentials) => {
      return async () => {
        expect(credentials).toEqual({
          email: 'john@example.com',
          password: 'password123',
        });
        return { token: 'test-token', user: loggedInUser };
      };
    });
    renderLogin();

    await user.type(screen.getByPlaceholderText('john.doe@example.com'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(localStorage.getItem('lastLoginMethod')).toBe('email');
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(loggedInUser);
  });
});