import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import ChooseFile from "../components/ui/ChooseFile";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { bookingFields } from "../constants/fields/booking";
import { departments } from "../constants/departments";
import { newBooking } from "../features/actions/bookingActions";
import { PiSpinnerGap } from "react-icons/pi";

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
        formState: { errors },
    } = useForm({
        defaultValues: {
            date: "",
            department: "",
            comments: "",
            reports: null,
        },
    });

    // HANDLE BOOKING FORM SUBMISSION
    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                reports: data.reports && data.reports.length > 0
                    ? Array.from(data.reports).map((f) => f.name)
                    : [],
            };
            const res = await dispatch(newBooking(payload));
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

            {error && (
                <div className="w-full p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                </div>
            )}

            {/* BOOKING APPOINTMENT FORM  */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-surface rounded-2xl border border-body/10 p-6 md:p-8 space-y-4"
            >
                {bookingFields.map((field) => (
                    <div key={field.name} className="space-y-1.5">
                        {field.type !== "file" && (
                            <label className="text-sm font-medium text-heading">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
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
                                        options={departmentOptions}
                                        value={value}
                                        onChange={onChange}
                                        placeholder={field.placeholder}
                                        error={!!errors[field.name]}
                                    />
                                )}
                            />
                        ) : field.type === "file" ? (
                            <ChooseFile
                                id={field.name}
                                label={field.label}
                                accept={field.accept || "image/*"}
                                error={!!errors[field.name]}
                                {...register(field.name, {
                                    required: field.required,
                                    validate: (files) => {
                                        if (!files || files.length === 0) return true;
                                        const file = files[0];
                                        if (file && !file.type.startsWith("image/")) {
                                            return field.invalidMessage || "Only image files are allowed";
                                        }
                                        return true;
                                    },
                                })}
                            />
                        ) : (
                            <Input
                                type={field.type}
                                placeholder={field.placeholder}
                                min={
                                    field.type === "datetime-local"
                                        ? new Date().toISOString().slice(0, 16)
                                        : undefined
                                }
                                {...register(field.name, {
                                    required: field.required,
                                    validate: (value) => {
                                        if (field.required && (!value || value.trim() === "")) {
                                            return field.required || field.invalidMessage;
                                        }
                                        if (field.type === "datetime-local" && value) {
                                            const selectedTime = new Date(value).getTime();
                                            if (selectedTime < Date.now()) {
                                                return "Appointment date and time cannot be in the past";
                                            }
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
