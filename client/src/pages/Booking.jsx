import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import ChooseFile from "../components/ui/ChooseFile";
import DatePicker from "../components/ui/DatePicker";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { bookingFields, timeSlots } from "../constants/fields/booking";
import { departments } from "../constants/departments";
import { newBooking } from "../features/actions/bookingActions";
import { PiSpinnerGap } from "react-icons/pi";
import { useEffect, useRef } from "react";

const departmentOptions = departments.map((dept) => ({
    value: dept.name,
    label: dept.name,
}));

const Booking = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // UTLIZE BOOKING STATE FROM THE FEATURES STORE
    const { loading, error } = useSelector((state) => state.booking);

    // INITIALIZATION FOR FORM STATE, VALIDATION, AND SUBMISSION HANDLING
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            date: "",
            slot: "",
            department: "",
            doctor: "",
            comments: "",
            reports: null,
        },
    });

    // WATCH DEPARTMENT TO FILTER DOCTORS
    const selectedDepartment = watch("department");
    const prevDepartmentRef = useRef(selectedDepartment);
    const selectedDate = watch("date");
    const selectedSlot = watch("slot");

    // BUILD DOCTOR OPTIONS BASED ON SELECTED DEPARTMENT
    const doctorOptions = (() => {
        const dept = departments.find((d) => d.name === selectedDepartment);
        if (!dept) return [];
        return dept.doctors.map((doc) => ({ value: doc, label: doc }));
    })();

    // RESET DOCTOR WHEN DEPARTMENT CHANGES
    useEffect(() => {
        if (prevDepartmentRef.current !== selectedDepartment) {
            setValue("doctor", "");
            prevDepartmentRef.current = selectedDepartment;
        }
    }, [selectedDepartment, setValue]);

    // GET OPTIONS FOR A SELECT FIELD
    const getSelectOptions = (fieldName) => {
        if (fieldName === "department") return departmentOptions;
        if (fieldName === "doctor") return doctorOptions;
        return [];
    };

    // HANDLE BOOKING FORM SUBMISSION
    const onSubmit = async (data) => {
        try {
            const combinedDate = data.slot ? `${data.date}T${data.slot}:00` : data.date;
            const formData = new FormData();
            formData.append("date", combinedDate);
            formData.append("department", data.department);
            formData.append("doctor", data.doctor);
            if (data.comments) {
                formData.append("comments", data.comments);
            }
            if (data.reports && data.reports.length > 0) {
                formData.append("reports", data.reports[0]);
            }

            const res = await dispatch(newBooking(formData));
            toast.success(res?.message || "Appointment booked successfully!");
            navigate("/appointment");
        } catch (err) {
            console.error("Error creating booking:", err);
            const errorMessage =
                err?.response?.data?.message || err?.message || "Failed to book appointment.";
            toast.error(errorMessage);
        }
    };


    return (
        <div className="w-full space-y-6">
            <section className="w-full">
                <PageHeader
                    title={"Book Appointment"}
                    description={"Schedule an appointment for your next check-up."}
                />
            </section>

            {/* BOOKING APPOINTMENT FORM  */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-surface rounded-2xl border border-body/10 p-6 md:p-8 space-y-4"
            >
                {bookingFields.map((field) => (
                    <div key={field.name} className="space-y-1.5">
                        {field.type !== "file" && (
                            <label className="text-sm font-medium text-heading">
                                {field.label}{field.required && "*"}
                            </label>
                        )}

                        {field.type === "select" ? (
                            <Controller
                                name={field.name}
                                control={control}
                                rules={{
                                    required: field.required,
                                    validate: (value) =>
                                        (value && value.trim() !== "") || field.required || field.invalidMessage,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={getSelectOptions(field.name)}
                                        value={value}
                                        onChange={onChange}
                                        placeholder={field.placeholder}
                                        error={!!errors[field.name]}
                                        disabled={field.name === "doctor" && !selectedDepartment}
                                    />
                                )}
                            />
                        ) : field.type === "file" ? (
                            <ChooseFile
                                id={field.name}
                                label={field.label}
                                accept={field.accept || "image/*,application/pdf,.pdf"}
                                error={!!errors[field.name]}
                                {...register(field.name, {
                                    required: field.required,
                                    validate: (files) => {
                                        if (!files?.[0]) return true;
                                        if (files[0].size > 2 * 1024 * 1024) {
                                            return "File size must be under 2MB";
                                        }
                                        return true;
                                    },
                                })}
                            />
                        ) : field.type === "date" ? (
                            <div className="space-y-3">
                                <Controller
                                    name={field.name}
                                    control={control}
                                    rules={{
                                        required: field.required,
                                        validate: (value) =>
                                            (value && value.trim() !== "") ||
                                            field.required ||
                                            field.invalidMessage,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <DatePicker
                                            value={value}
                                            onChange={onChange}
                                            placeholder={field.placeholder}
                                            error={!!errors[field.name]}
                                        />
                                    )}
                                />

                                {/* AVAILABLE TIME SLOTS */}
                                <div className="space-y-2 pt-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-heading uppercase tracking-wider">
                                            Time Slot*
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {timeSlots.map((slot) => {
                                            const isSelected = selectedSlot === slot.value;
                                            return (
                                                <button
                                                    key={slot.value}
                                                    type="button"
                                                    onClick={() => setValue("slot", slot.value, { shouldValidate: true })}
                                                    className={`py-1 px-1.5 text-xs font-medium rounded-md border transition-all duration-150 text-center cursor-pointer ${isSelected
                                                        ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20"
                                                        : "bg-surface text-body border-body/10 hover:border-primary/40 hover:bg-primary/5"
                                                        }`}
                                                >
                                                    {slot.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <Controller
                                        name="slot"
                                        control={control}
                                        rules={{ required: "Please select an appointment time slot" }}
                                        render={() => null}
                                    />
                                    {errors.slot && (
                                        <p className="text-sm text-red-500">{errors.slot.message}</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Input
                                type={field.type}
                                placeholder={field.placeholder}
                                error={!!errors[field.name]}
                                {...register(field.name, {
                                    required: field.required,
                                    validate: (value) => {
                                        if (field.required && (!value || value.trim() === "")) {
                                            return field.required || field.invalidMessage;
                                        }
                                        return true;
                                    },
                                })}
                            />
                        )}

                        {errors[field.name] && (
                            <p className="text-sm text-red-500">{errors[field.name].message}</p>
                        )}
                    </div>
                ))}

                {/* SEND BOOKING TO THE SERVER  */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 disabled:opacity-70 gap-2"
                    >
                        {loading ? (
                            <>
                                <PiSpinnerGap className="animate-spin text-lg" />
                                <span>Booking Appointment...</span>
                            </>
                        ) : (
                            "Book Appointment"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Booking;

