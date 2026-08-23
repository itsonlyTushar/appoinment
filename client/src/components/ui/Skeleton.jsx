import React from 'react';

const Skeleton = () => {
    return (
        <div className='w-full space-y-6 animate-pulse'>
            {/* HEADER SKELETON */}
            <section className="w-full space-y-2">
                <div className='h-8 w-44 bg-body/10 rounded-lg'></div>
                <div className='h-4 w-72 bg-body/10 rounded-md'></div>
            </section>

            {/* METRICS CARDS SKELETON */}
            <section className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className='bg-surface w-full rounded-2xl border border-body/10 p-5 sm:p-6 shadow-xs flex items-center justify-between'
                    >
                        <div className='space-y-2.5'>
                            <div className='h-3.5 w-24 bg-body/10 rounded'></div>
                            <div className='h-8 w-20 bg-body/10 rounded-md'></div>
                        </div>
                        <div className='w-12 h-12 rounded-xl bg-body/10 shrink-0'></div>
                    </div>
                ))}
            </section>

            {/* UPCOMING BOOKING SKELETON */}
            <section>
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 shadow-xs space-y-4'>
                    <div className='h-6 w-48 bg-body/10 rounded-lg'></div>
                    <div className='space-y-2.5 px-1'>
                        <div className='h-5 w-64 bg-body/10 rounded'></div>
                        <div className='h-4 w-40 bg-body/10 rounded'></div>
                        <div className='h-4 w-full max-w-xl bg-body/10 rounded'></div>
                    </div>
                </div>
            </section>

            {/* RECENT BOOKINGS & SHORTCUTS SKELETON */}
            <section className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* RECENT BOOKINGS SKELETON */}
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 shadow-xs space-y-4'>
                    <div className='h-6 w-40 bg-body/10 rounded-lg'></div>
                    <div className='space-y-3'>
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className='p-3 rounded-xl bg-background border border-body/10 flex items-center justify-between gap-3'
                            >
                                <div className='space-y-1.5'>
                                    <div className='h-4 w-28 bg-body/10 rounded'></div>
                                    <div className='h-3 w-36 bg-body/10 rounded'></div>
                                </div>
                                <div className='h-5 w-14 bg-body/10 rounded-md'></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SHORTCUTS SKELETON */}
                <div className='bg-surface w-full rounded-2xl border border-body/10 p-5 shadow-xs space-y-4'>
                    <div className='h-6 w-32 bg-body/10 rounded-lg'></div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className='h-16 rounded-xl bg-background border border-body/10 p-3 flex items-center gap-3'
                            >
                                <div className='w-9 h-9 rounded-lg bg-body/10 shrink-0'></div>
                                <div className='space-y-1.5 flex-1'>
                                    <div className='h-3.5 w-24 bg-body/10 rounded'></div>
                                    <div className='h-2.5 w-16 bg-body/10 rounded'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Skeleton;