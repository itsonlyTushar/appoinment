import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../Register';
import { authReducer } from '../../features/reducers/authReducers';
import * as authActions from '../../features/actions/authActions';
import { renderWithProviders } from '../../test/testUtils';

const authReducerMap = { auth: authReducer };
const defaultAuthState = { auth: { loading: false, error: null, userInfo: null, success: false } };

const renderRegister = () => renderWithProviders(<Register />, {
  reducer: authReducerMap,
  preloadedState: defaultAuthState,
});

describe('Register page basic tests', () => {
  // CHECK IF REGISTER PAGE MOUNTS PROPERLY ON LOAD OR NOT
  it('mounts the register page', () => {
    renderRegister();

    expect(screen.getByRole('heading', { name: /patient registration/i })).toBeInTheDocument();
  });

  // TEST REGISTRATION FORM FIELDS ARE LOADED OR NOT
  it('displays the registration form fields', () => {
    renderRegister();

    expect(screen.getByPlaceholderText('Tushar Soni')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+91 9327584894')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('admin11@example.com')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(2);
  });

  // TEST CREATE ACCOUNT BUTTON IS AVAILABLE AND CLICKABLE
  it('provides a clickable create account button', async () => {
    const user = userEvent.setup();
    renderRegister();

    const submitButton = screen.getByRole('button', { name: /create account/i });
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);
    expect(submitButton).toBeEnabled();
  });

  // TEST VALID REGISTRATION FLOW AND STORE RETURNED LOGIN DATA
  it('completes the registration flow', async () => {
    const user = userEvent.setup();
    const registeredUser = { name: 'John Doe', email: 'john@example.com' };
    const registrationAction = vi.spyOn(authActions, 'userRegistration').mockImplementation((payload) => {
      return async () => {
        expect(payload).toEqual({
          name: 'John Doe',
          contact: '9876543210',
          email: 'john@example.com',
          password: 'password123',
        });
        return { token: 'test-token', user: registeredUser };
      };
    });
    localStorage.clear();
    renderRegister();

    await user.type(screen.getByPlaceholderText('Tushar Soni'), 'John Doe');
    await user.type(screen.getByPlaceholderText('+91 9327584894'), '9876543210');
    await user.type(screen.getByPlaceholderText('admin11@example.com'), 'john@example.com');
    const passwordFields = screen.getAllByPlaceholderText('••••••••');
    await user.type(passwordFields[0], 'password123');
    await user.type(passwordFields[1], 'password123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => expect(registrationAction).toHaveBeenCalledTimes(1));
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(registeredUser);
  });
});
