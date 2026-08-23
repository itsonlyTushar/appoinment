import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  fetchBookingYears,
} from "../features/actions/bookingActions";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import Search from "../components/ui/Search";
import Select from "../components/ui/Select";
import Modal from "../components/ui/Modal";
import { FiExternalLink } from "react-icons/fi";

// OLD REPORTS OF USERS WILL BE SHOWN IN THIS 
const Appointment = () => {
  const dispatch = useDispatch();
  const {
    bookings = [],
    years = [],
    loading,
    error,
  } = useSelector((state) => state.booking || {});
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear()),
  );
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportLoading, setIsReportLoading] = useState(true);

  // HANDLE OPEN REPORT MODAL 
  const handleOpenReport = (report) => {
    setSelectedReport(report);
    const isUrl =
      typeof report === "string" &&
      (report.startsWith("http://") || report.startsWith("https://"));
    setIsReportLoading(isUrl);
  };

  // FETCH BOOKING YEARS
  useEffect(() => {
    dispatch(fetchBookingYears());
  }, [dispatch]);

  // FETCH BOOKINGS WHENEVER SELECTED YEAR CHANGES
  useEffect(() => {
    dispatch(getAllBookings(selectedYear));
  }, [dispatch, selectedYear]);

  const bookingList = Array.isArray(bookings) ? bookings : [];

  // YEAR OPTIONS FOR SELECT DROPDOWN
  const yearOptions = years.map((year) => ({
    value: year,
    label: year,
  }));

  // SEARCH APPOINTMENTS BY DEPARTMENT, DOCTOR, AND COMMENTS
  const filteredBookings = bookingList.filter((booking) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;

    const department = booking.department
      ? booking.department.toLowerCase()
      : "";
    const doctor = booking.doctor ? booking.doctor.toLowerCase() : "";
    const comments = booking.comments ? booking.comments.toLowerCase() : "";

    return (
      department.includes(query) ||
      doctor.includes(query) ||
      comments.includes(query)
    );
  });

  return (
    <section className="space-y-6">
      <PageHeader
        title={"Previous Appointments"}
        description={"Check and manage your bookings here."}
      />

      {/* SEARCH BAR FILTER */}
      <div className="mb-6 flex items-center gap-3 w-full">
        <div className="flex-1 min-w-0">
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search appointments by department or doctor"
          />
        </div>

        {/* YEAR FILTER */}
        <Select
          className="w-36 shrink-0"
          buttonClassName="bg-surface"
          options={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
          placeholder="Select Year"
        />
      </div>

      {/* SHOW LOADER TILL BOOKINGS FETCHED  */}
      {loading && <Loader title="Loading Appointments..." />}

      {/* SHOW EMPTY STATE IF BOOKINGS ARE NOT MADE  */}
      {!loading && bookingList.length === 0 && (
        <div className="text-center py-12 bg-surface rounded-2xl border border-body/10 text-body">
          No appointments found. Book your first appointment to see it here.
        </div>
      )}

      {/* SHOW EMPTY SEARCH RESULTS */}
      {!loading &&
        !error &&
        bookingList.length > 0 &&
        filteredBookings.length === 0 && (
          <div className="text-center py-12 bg-surface rounded-2xl border border-body/10 text-body">
            No appointments found matching.
          </div>
        )}

      {!loading && !error && filteredBookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <Card
              key={booking._id || booking.id}
              heading={booking.department}
              badge={
                booking.date
                  ? new Date(booking.date).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                  : undefined
              }
              description={
                `To See : ${booking.doctor}`
              }
            >
              {booking.comments && (
                <div className="mt-3 pt-3 border-t border-body/10">
                  <p className="text-xs font-medium text-body">
                    <span className="font-semibold text-heading mr-1">
                      Additional Details:
                    </span>
                    {booking.comments}
                  </p>
                </div>
              )}

              {booking.reports && booking.reports.length > 0 && (
                <div className="mt-3 pt-3 border-t border-body/10">
                  <button
                    type="button"
                    onClick={() => handleOpenReport(booking.reports[0])}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                  >
                    <FiExternalLink className="bg-none text-md" />
                    <span>Attachements</span>
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* MEDICAL REPORT PREVIEW MODAL */}
      <Modal
        isOpen={Boolean(selectedReport)}
        onClose={() => {
          setSelectedReport(null);
          setIsReportLoading(true);
        }}
        ModalTitle="Medical Report"
        actions={
          selectedReport &&
            (selectedReport.startsWith("http://") ||
              selectedReport.startsWith("https://")) ? (
            <a
              href={selectedReport}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-surface bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              Large View
            </a>
          ) : null
        }
      >
        {selectedReport && (
          <div className="space-y-4">
            {isReportLoading && (
              <Loader title="Loading report..." className="py-12" />
            )}

            {selectedReport.toLowerCase().includes(".pdf") ? (
              <div
                className={`space-y-3 ${isReportLoading ? "hidden" : "block"}`}
              >
                <iframe
                  src={selectedReport}
                  title="Medical Report PDF"
                  onLoad={() => setIsReportLoading(false)}
                  onError={() => setIsReportLoading(false)}
                  className="w-full h-80 rounded-xl border border-body/10 bg-white"
                />
              </div>
            ) : selectedReport.startsWith("http://") ||
              selectedReport.startsWith("https://") ? (
              <div
                className={`flex items-center justify-center p-2 bg-background rounded-xl border border-body/10 ${isReportLoading ? "hidden" : "flex"
                  }`}
              >
                <img
                  src={selectedReport}
                  alt="Medical Report"
                  onLoad={() => setIsReportLoading(false)}
                  onError={() => setIsReportLoading(false)}
                  className="max-h-80 w-full object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="p-4 bg-background rounded-xl border border-body/10 text-center">
                <p className="text-sm font-medium text-heading">
                  {selectedReport}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Appointment;
