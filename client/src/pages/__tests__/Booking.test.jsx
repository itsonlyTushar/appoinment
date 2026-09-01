import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Booking from '../Booking';
import { bookingReducer } from '../../features/reducers/bookingReducers';
import * as bookingActions from '../../features/actions/bookingActions';
import { renderWithProviders } from '../../test/testUtils';

const bookingReducerMap = { booking: bookingReducer };
const defaultBookingState = {
  booking: { loading: false, error: null, bookings: [] },
};

const renderBooking = () =>
  renderWithProviders(<Booking />, {
    reducer: bookingReducerMap,
    preloadedState: defaultBookingState,
  });

describe('Booking page basic tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // CHECK IF BOOKING PAGE MOUNTS PROPERLY ON LOAD OR NOT
  it('mounts the booking page', () => {
    renderBooking();

    expect(screen.getByRole('heading', { name: /book appointment/i })).toBeInTheDocument();
  });

  // TEST BOOKING FORM FIELDS ARE LOADED OR NOT
  it('displays the booking form fields', () => {
    renderBooking();

    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
    expect(screen.getByText('Select department')).toBeInTheDocument();
    expect(screen.getByText('Select doctor')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write other instructions...')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /available time slots/i })).toBeInTheDocument();
  });

  // TEST DEPARTMENT AND DOCTOR SELECTION DROPDOWNS
  it('populates doctors when department is selected', async () => {
    const user = userEvent.setup();
    renderBooking();

    const deptTrigger = screen.getByText('Select department').closest('button');
    await user.click(deptTrigger);

    const cardiologyOption = screen.getByRole('button', { name: 'Cardiology' });
    await user.click(cardiologyOption);

    expect(screen.getByText('Cardiology')).toBeInTheDocument();

    const doctorTrigger = screen.getByText('Select doctor').closest('button');
    expect(doctorTrigger).toBeEnabled();

    await user.click(doctorTrigger);
    expect(screen.getByRole('button', { name: 'Dr. Michael Scott' })).toBeInTheDocument();
  });

  // TEST BOOK APPOINTMENT BUTTON IS AVAILABLE AND CLICKABLE
  it('provides a clickable book appointment button', async () => {
    const user = userEvent.setup();
    renderBooking();

    const submitButton = screen.getByRole('button', { name: /book appointment/i });
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);
    expect(submitButton).toBeEnabled();
  });

  // TEST VALID BOOKING FLOW
  it('completes the booking flow', async () => {
    const user = userEvent.setup();
    const bookingAction = vi.spyOn(bookingActions, 'newBooking').mockImplementation((formData) => {
      return async () => {
        expect(formData).toBeInstanceOf(FormData);
        expect(formData.get('date')).toBe('2026-09-20T10:00:00');
        expect(formData.get('department')).toBe('Cardiology');
        expect(formData.get('doctor')).toBe('Dr. Michael Scott');
        expect(formData.get('comments')).toBe('Routine heart consultation');
        return { message: 'Appointment booked successfully!' };
      };
    });

    renderBooking();

    // Select date
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.change(dateInput, { target: { value: '2026-09-20' } });

    // Select time slot
    await user.click(screen.getByRole('button', { name: '10:00 AM' }));

    // Select department
    await user.click(screen.getByText('Select department').closest('button'));
    await user.click(screen.getByRole('button', { name: 'Cardiology' }));

    // Select doctor
    await user.click(screen.getByText('Select doctor').closest('button'));
    await user.click(screen.getByRole('button', { name: 'Dr. Michael Scott' }));

    // Enter comments
    await user.type(screen.getByPlaceholderText('Write other instructions...'), 'Routine heart consultation');

    // Click submit button
    await user.click(screen.getByRole('button', { name: /book appointment/i }));

    await waitFor(() => expect(bookingAction).toHaveBeenCalledTimes(1));
  });
});
