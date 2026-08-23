import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../features/actions/bookingActions'
import { MdCollectionsBookmark, MdMedicalServices, MdHistoryToggleOff, MdOutlineRecentActors, MdShortcut } from 'react-icons/md'
import { LuHistory, LuArrowRight } from 'react-icons/lu'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { BiSkipNextCircle } from 'react-icons/bi'
import { TbReportMedical } from 'react-icons/tb'
import { LiaBookMedicalSolid } from 'react-icons/lia'
import PageHeader from '../components/ui/PageHeader'
import Skeleton from '../components/ui/Skeleton'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { bookings = [], loading } = useSelector((state) => state.booking || {});

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    // SHOW CUSTOM SKELTON LOADER UNTIL DATA IS BEING FETCHED 
    if (loading) {
        return <Skeleton />;
    }

    const bookingList = Array.isArray(bookings) ? bookings : [];
    const recentBookings = bookingList.slice(0, 3);

    // FIND NEXT BOOKING DETAILS
    const upcomingBookings = [...bookingList]
        .filter((b) => b.date && new Date(b.date).getTime() >= new Date().setHours(0, 0, 0, 0))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const nextBooking = upcomingBookings[0] || null;

    // FIND THE MAXIMUM BOOKED DEPARTMENT - PRIMARY CONCERN
    const primaryConcern = (() => {
        if (bookingList.length === 0) return 'None';
        const deptCounts = bookingList.reduce((acc, b) => {
            if (b.department) {
                acc[b.department] = (acc[b.department] || 0) + 1;
            }
            return acc;
        }, {});
        const sorted = Object.entries(deptCounts).sort((a, b) => b[1] - a[1]);
        return sorted[0][0]
    })();

    const nextBookingDate = nextBooking?.date
        ? new Date(nextBooking.date).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
        })
        : 'None';

    return (
        <div className='w-full space-y-6'>
            <section className="w-full">
                <PageHeader
                    title={"Dashboard"}
                    description={"Check your booking summarry and upcoming apointments."}
                />
            </section>


            {/* METRICS CARDS */}
            <section className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 sm:p-6 shadow-xs flex items-center justify-between'>
                    <div>
                        <span className='text-xs sm:text-sm font-medium text-body'>Total Bookings</span>
                        <h3 className='text-2xl sm:text-3xl font-bold font-heading text-heading mt-1.5'>
                            {bookingList.length}
                        </h3>
                    </div>
                    <div className='w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0'>
                        <MdHistoryToggleOff size={26} />
                    </div>
                </div>
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 sm:p-6 shadow-xs flex items-center justify-between'>
                    <div>
                        <span className='text-xs sm:text-sm font-medium text-body'>Next Booking Date</span>
                        <h3 className='text-2xl sm:text-3xl font-bold font-heading text-heading mt-1.5'>
                            {nextBookingDate}
                        </h3>
                    </div>
                    <div className='w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0'>
                        <BiSkipNextCircle size={26} />
                    </div>
                </div>
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 sm:p-6 shadow-xs flex items-center justify-between'>
                    <div>
                        <span className='text-xs sm:text-sm font-medium text-body'>Primary Concern</span>
                        <h3 className='text-2xl sm:text-3xl font-bold font-heading text-heading mt-1.5'>
                            {primaryConcern}
                        </h3>
                    </div>
                    <div className='w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0'>
                        <TbReportMedical size={26} />
                    </div>
                </div>
            </section>

            {/* UPCOMING BOOKING DETAILS  */}
            <section>
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 shadow-xs'>

                    <h3 className='text-xl sm:text-2xl font-bold font-heading text-heading flex items-center gap-2'>
                        <LiaBookMedicalSolid className='text-primary text-2xl' />
                        Upcoming Booking
                    </h3>


                    {nextBooking ? (
                        <div className='space-y-1.5 mt-4'>
                            <div className='px-3'>
                                {/* SHOW DOCTOR NAME AND DEPARTMENT  */}
                                <h4 className='text-lg sm:text-xl font-semibold text-heading'>
                                    {nextBooking.doctor}, {nextBooking.department}
                                </h4>
                                <p className='text-xs sm:text-sm font-medium text-body'>
                                    <span className='text-xs font-medium px-2 py-1 rounded-lg bg-primary/10 text-primary shrink-0 mr-1'>Date : </span>
                                    <span className='text-heading '>
                                        {nextBooking.date
                                            ? new Date(nextBooking.date).toLocaleString([], {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            })
                                            : ''}
                                    </span>
                                </p>

                                {/* DISPLAY COMMENTS IF ANY  */}
                                {nextBooking.comments && (
                                    <p className='max-w-2xl w-full text-xs sm:text-sm text-body leading-relaxed pt-1'>
                                        <span className='font-semibold text-heading mr-1'>Comments :</span>
                                        {nextBooking.comments}
                                    </p>
                                )}
                            </div>


                        </div>
                    ) : (
                        // MESSAGE WHEN NOTHING TO SHOW 
                        <div className='py-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3'>
                            <p className='text-sm text-body'>You have no upcoming appointments scheduled.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* QUICK SHORTCUTS  */}
            <section className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 shadow-xs flex flex-col justify-between'>
                    <div>
                        <div className='flex mb-4'>
                            <h3 className='text-xl sm:text-2xl font-bold font-heading text-heading flex items-center gap-2'>
                                <MdOutlineRecentActors className='text-primary text-2xl' />
                                Recent Bookings
                            </h3>

                        </div>

                        {/* SHOW WHEN NO BOOKING  */}
                        {recentBookings.length === 0 ? (
                            <div className='py-8 text-center'>
                                <p className='text-sm text-body mb-3'>No bookings found yet.</p>
                                <Link
                                    to="/book"
                                    className='inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors'
                                >
                                    Book First Appointment
                                </Link>
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                {recentBookings.map((item) => (
                                    <div
                                        key={item._id || item.id}
                                        className='p-1.5 mx-0.5 rounded-xl bg-background border border-body/10 flex items-center justify-between gap-3'
                                    >
                                        <div className='min-w-0'>
                                            <h4 className='text-sm font-semibold text-heading truncate'>
                                                {item.department}
                                            </h4>
                                            <p className='text-xs text-body truncate'>
                                                {item.doctor ? (item.doctor.startsWith('Dr') ? item.doctor : `Dr. ${item.doctor}`) : 'Specialist Consultation'}
                                            </p>
                                        </div>
                                        <span className='text-xs font-medium px-2.5 py-1 rounded-lg bg-primary/10 text-primary shrink-0'>
                                            {item.date
                                                ? new Date(item.date).toLocaleDateString([], {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })
                                                : ' '}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {bookings.length > 0 && (
                        <div className='pt-4 mt-4 border-t border-body/10'>
                            <Link
                                to="/appointment"
                                className='w-full py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors'
                            >
                                <span>View all appointments</span>
                                <LuArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 shadow-xs'>
                    <h3 className='text-xl sm:text-2xl font-bold font-heading text-heading mb-4 flex items-center gap-2'>
                        <MdShortcut className='text-primary text-2xl' />
                        Shortcuts
                    </h3>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                        <Link
                            to="/book"
                            className='flex items-center gap-3 p-3 rounded-xl bg-background hover:bg-primary/10 hover:text-primary transition-colors duration-150 border border-body/10 group'
                        >
                            <div className='w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors'>
                                <MdCollectionsBookmark size={18} />
                            </div>
                            <div className='min-w-0'>
                                <span className='text-sm font-semibold text-heading block group-hover:text-primary transition-colors'>Book Appointment</span>
                                <span className='text-xs text-body truncate block'>Schedule consultation</span>
                            </div>
                        </Link>

                        <Link
                            to="/appointment"
                            className='flex items-center gap-3 p-3 rounded-xl bg-background hover:bg-primary/10 hover:text-primary transition-colors duration-150 border border-body/10 group'
                        >
                            <div className='w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors'>
                                <LuHistory size={18} />
                            </div>
                            <div className='min-w-0'>
                                <span className='text-sm font-semibold text-heading block group-hover:text-primary transition-colors'>My Appointments</span>
                                <span className='text-xs text-body truncate block'>View visit history</span>
                            </div>
                        </Link>

                        <Link
                            to="/profile"
                            className='flex items-center gap-3 p-3 rounded-xl bg-background hover:bg-primary/10 hover:text-primary transition-colors duration-150 border border-body/10 group'
                        >
                            <div className='w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors'>
                                <IoPersonCircleOutline size={18} />
                            </div>
                            <div className='min-w-0'>
                                <span className='text-sm font-semibold text-heading block group-hover:text-primary transition-colors'>Profile</span>
                                <span className='text-xs text-body truncate block'>Account & details</span>
                            </div>
                        </Link>

                        <Link
                            to="/services"
                            className='flex items-center gap-3 p-3 rounded-xl bg-background hover:bg-primary/10 hover:text-primary transition-colors duration-150 border border-body/10 group'
                        >
                            <div className='w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors'>
                                <MdMedicalServices size={18} />
                            </div>
                            <div className='min-w-0'>
                                <span className='text-sm font-semibold text-heading block group-hover:text-primary transition-colors'>Services</span>
                                <span className='text-xs text-body truncate block'>Explore treatments</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Dashboard