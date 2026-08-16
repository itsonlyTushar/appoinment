import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Register from '../Register';
import { authReducer } from '../../features/reducers/authReducers';
import * as authActions from '../../features/actions/authActions';

const createMockStore = (initialState = { auth: { loading: false, error: null, userInfo: null, success: false } }) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

// Helper to render component with router and redux store context
const renderWithProviders = (ui, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Register Page Unit Tests', () => {
  let mockDispatchAction;

  beforeEach(() => {
    mockDispatchAction = vi.fn().mockResolvedValue({ token: 'mock-token', user: { name: 'John Doe' } });
    vi.spyOn(authActions, 'userRegistration').mockImplementation((payload) => {
      return (dispatch) => {
        mockDispatchAction(payload);
        return Promise.resolve({ token: 'mock-token', user: { name: 'John Doe' } });
      };
    });
  });

  it('renders all form fields, headers, and buttons correctly', () => {
    renderWithProviders(<Register />);

    // Header
    expect(screen.getByRole('heading', { name: /patient registration/i })).toBeInTheDocument();

    // Labels
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();

    // Inputs by placeholder
    expect(screen.getByPlaceholderText('Tushar Soni')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+91 9327584894')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('admin11@example.com')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(2);

    // Buttons & Links
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login');
  });

  it('shows required error messages when submitting empty form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register />);

    const submitBtn = screen.getByRole('button', { name: /create account/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Contact is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Please confirm your password')).toBeInTheDocument();
    });

    expect(mockDispatchAction).not.toHaveBeenCalled();
  });

  it('shows error when password and confirm password do not match', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register />);

    const nameInput = screen.getByPlaceholderText('Tushar Soni');
    const contactInput = screen.getByPlaceholderText('+91 9327584894');
    const emailInput = screen.getByPlaceholderText('admin11@example.com');
    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /create account/i });

    await user.type(nameInput, 'John Doe');
    await user.type(contactInput, '9876543210');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInputs[0], 'password123');
    await user.type(passwordInputs[1], 'password456');

    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    expect(mockDispatchAction).not.toHaveBeenCalled();
  });

  it('submits valid form data with confirmPassword omitted from payload', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register />);

    const nameInput = screen.getByPlaceholderText('Tushar Soni');
    const contactInput = screen.getByPlaceholderText('+91 9327584894');
    const emailInput = screen.getByPlaceholderText('admin11@example.com');
    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /create account/i });

    await user.type(nameInput, 'John Doe');
    await user.type(contactInput, '9876543210');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInputs[0], 'password123');
    await user.type(passwordInputs[1], 'password123');

    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockDispatchAction).toHaveBeenCalledTimes(1);
      expect(mockDispatchAction).toHaveBeenCalledWith({
        name: 'John Doe',
        contact: '9876543210',
        email: 'john@example.com',
        password: 'password123',
      });
    });
  });

  it('displays loading state and disables submit button when registration is pending', () => {
    const store = createMockStore({
      auth: { loading: true, error: null, userInfo: null, success: false },
    });

    renderWithProviders(<Register />, store);

    const submitBtn = screen.getByRole('button', { name: /creating account/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('toggles password visibility when eye button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register />);

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    const passwordField = passwordInputs[0];

    expect(passwordField).toHaveAttribute('type', 'password');

    // Find the toggle button associated with the password field
    const toggleButtons = screen.getAllByRole('button', { name: '' });
    // The first toggle button belongs to the password input
    await user.click(toggleButtons[0]);
    expect(passwordField).toHaveAttribute('type', 'text');

    await user.click(toggleButtons[0]);
    expect(passwordField).toHaveAttribute('type', 'password');
  });
});
