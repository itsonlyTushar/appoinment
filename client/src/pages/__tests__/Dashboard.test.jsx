import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { bookingReducer } from '../../features/reducers/bookingReducers';
import * as bookingActions from '../../features/actions/bookingActions';
import { renderWithProviders } from '../../test/testUtils';

const mockBookings = [
  {
    _id: '1',
    department: 'Cardiology',
    doctor: 'Dr. Michael Scott',
    date: '2026-09-10T10:00:00.000Z',
    comments: 'Routine heart checkup',
  },
  {
    _id: '2',
    department: 'Cardiology',
    doctor: 'Dr. Dwight Schrute',
    date: '2026-09-15T14:00:00.000Z',
    comments: 'Follow up consultation',
  },
  {
    _id: '3',
    department: 'Dermatology',
    doctor: 'Dr. Kelly Kapoor',
    date: '2026-09-20T11:00:00.000Z',
    comments: '',
  },
];

const bookingReducerMap = { booking: bookingReducer };
const defaultState = {
  booking: {
    loading: false,
    error: null,
    bookings: mockBookings,
  },
};

const renderDashboard = (preloadedState = defaultState) =>
  renderWithProviders(<Dashboard />, {
    reducer: bookingReducerMap,
    preloadedState,
  });

describe('Dashboard page basic tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(bookingActions, 'getAllBookings').mockImplementation(() => {
      return async () => mockBookings;
    });
  });

  // CHECK IF DASHBOARD MOUNTS PROPERLY ON LOAD OR NOT
  it('mounts the dashboard with header, metrics, and shortcuts', () => {
    renderDashboard();

    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByText('Total Bookings')).toBeInTheDocument();
    expect(screen.getByText('Next Booking Date')).toBeInTheDocument();
    expect(screen.getByText('Primary Concern')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Booking')).toBeInTheDocument();
    expect(screen.getByText('Shortcuts')).toBeInTheDocument();
  });

  // TEST DASHBOARD METRICS AND UPCOMING BOOKING DISPLAY
  it('displays correct booking count, primary concern department, and upcoming appointment', () => {
    renderDashboard();

    // Total bookings count is 3
    expect(screen.getByText('3')).toBeInTheDocument();

    // Primary concern is Cardiology (booked twice)
    expect(screen.getByText('Cardiology')).toBeInTheDocument();

    // Upcoming booking details
    expect(screen.getByText(/Dr\. Michael Scott, Cardiology/i)).toBeInTheDocument();
    expect(screen.getByText('Routine heart checkup')).toBeInTheDocument();
  });

  // TEST EMPTY STATE WHEN NO BOOKINGS EXIST
  it('shows empty state messages when there are no bookings', () => {
    const emptyState = {
      booking: {
        loading: false,
        error: null,
        bookings: [],
      },
    };
    renderDashboard(emptyState);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('You have no upcoming appointments scheduled.')).toBeInTheDocument();
    expect(screen.getByText('No bookings found yet.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /book first appointment/i })).toBeInTheDocument();
  });

  // TEST QUICK SHORTCUT NAVIGATION LINKS
  it('renders all shortcut navigation links', () => {
    renderDashboard();

    expect(screen.getByRole('link', { name: /book appointment/i })).toHaveAttribute('href', '/book');
    expect(screen.getByRole('link', { name: /my appointments/i })).toHaveAttribute('href', '/appointment');
    expect(screen.getByRole('link', { name: /profile/i })).toHaveAttribute('href', '/profile');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
  });
});
