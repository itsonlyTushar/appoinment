import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Appointment from '../Appointment';
import { bookingReducer } from '../../features/reducers/bookingReducers';
import * as bookingActions from '../../features/actions/bookingActions';

const mockBookings = [
  {
    _id: '1',
    department: 'Cardiology',
    date: '2026-09-01T10:00:00.000Z',
    comments: 'Routine heart checkup',
    reports: ['ecg_report.pdf', 'blood_test.pdf'],
  },
  {
    _id: '2',
    department: 'Dermatology',
    date: '2026-09-05T14:30:00.000Z',
    comments: 'Skin rash consultation',
    reports: ['skin_biopsy.pdf'],
  },
  {
    _id: '3',
    department: 'Pediatrics',
    date: '2026-09-10T09:00:00.000Z',
    comments: 'Child vaccination',
    reports: [],
  },
];

const createMockStore = (initialState = { booking: { loading: false, error: null, bookings: mockBookings } }) => {
  return configureStore({
    reducer: {
      booking: bookingReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (ui, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Appointment Page Unit Tests', () => {
  beforeEach(() => {
    vi.spyOn(bookingActions, 'getAllBookings').mockImplementation(() => {
      return async (dispatch) => {
        return Promise.resolve(mockBookings);
      };
    });
  });

  it('renders page header, search input, and all bookings initially', () => {
    renderWithProviders(<Appointment />);

    // Header
    expect(screen.getByRole('heading', { name: /previous appointments/i })).toBeInTheDocument();

    // Search bar
    const searchInput = screen.getByPlaceholderText(/search appointments/i);
    expect(searchInput).toBeInTheDocument();

    // Cards
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('Dermatology')).toBeInTheDocument();
    expect(screen.getByText('Pediatrics')).toBeInTheDocument();
  });

  it('filters appointments by department when search query is typed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Appointment />);

    const searchInput = screen.getByPlaceholderText(/search appointments/i);
    await user.type(searchInput, 'Cardio');

    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.queryByText('Dermatology')).not.toBeInTheDocument();
    expect(screen.queryByText('Pediatrics')).not.toBeInTheDocument();
  });

  it('filters appointments by comments', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Appointment />);

    const searchInput = screen.getByPlaceholderText(/search appointments/i);
    await user.type(searchInput, 'vaccination');

    expect(screen.getByText('Pediatrics')).toBeInTheDocument();
    expect(screen.getByText('Child vaccination')).toBeInTheDocument();
    expect(screen.queryByText('Cardiology')).not.toBeInTheDocument();
  });

  it('filters appointments by report tag', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Appointment />);

    const searchInput = screen.getByPlaceholderText(/search appointments/i);
    await user.type(searchInput, 'ecg_report');

    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.queryByText('Dermatology')).not.toBeInTheDocument();
  });

  it('shows no matches message when search yields zero results', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Appointment />);

    const searchInput = screen.getByPlaceholderText(/search appointments/i);
    await user.type(searchInput, 'NonExistentQuery');

    expect(screen.getByText(/no appointments found matching "NonExistentQuery"/i)).toBeInTheDocument();
    expect(screen.queryByText('Cardiology')).not.toBeInTheDocument();
  });

  it('shows empty message when bookings array is empty', () => {
    const emptyStore = createMockStore({
      booking: { loading: false, error: null, bookings: [] },
    });
    renderWithProviders(<Appointment />, emptyStore);

    expect(screen.getByText(/no appointments found\. book your first appointment/i)).toBeInTheDocument();
  });
});
