import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageHeader from "../components/ui/PageHeader";
import ChooseFile from "../components/ui/ChooseFile";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { updateProfile, usersDetails } from "../features/actions/authActions";

const defaultProfile = {
    name: "",
    email: "",
    contactNumber: "",
    profilePicture: "",
};

const Profile = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(defaultProfile);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [saving, setSaving] = useState(false);

    // LOAD PROFILE WITH USER DETAILS 
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await dispatch(usersDetails());
                setProfile({ ...defaultProfile, ...response.user });
                localStorage.setItem("user", JSON.stringify(response.user));
            } catch (error) {
                toast.error(error?.response?.data?.message || "Unable to load profile.");
            }
        };

        loadProfile();
    }, [dispatch]);

    // DISPLAY PREVIEW TEMPORARY CREATING BROWSER URL
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // SAVE IMAGE TO DB
    const handleSave = async (event) => {
        event.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append("name", profile.name);
            if (selectedImage) formData.append("profilePicture", selectedImage);

            const response = await dispatch(updateProfile(formData));
            setProfile({ ...defaultProfile, ...response.user });
            localStorage.setItem("user", JSON.stringify(response.user));
            setSelectedImage(null);
            setPreviewUrl("");
            setIsEditing(false);
            toast.success(response.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to update profile.");
        } finally {
            setSaving(false);
        }
    };

    // DEFAULT IMAGE URL OR EXISTING URL 
    const avatarUrl = previewUrl || profile.profilePicture ||
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60";

    return (
        <>
            <PageHeader
                title="Profile Account"
                description="Manage and update your account details here."
            />

            <section className="bg-surface mt-5 pt-8 px-6 pb-8 rounded-2xl border border-body/10 shadow-sm">
                {/* SECTION TO SHOW TO PFP  */}
                <section className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-32 h-32 aspect-square rounded-full overflow-hidden border-2 border-primary/20 shadow-sm shrink-0">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            alt="Profile avatar"
                            src={avatarUrl}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60";
                            }}
                        />
                    </div>
                    {/* UTLIZING CUSTOMER CHOOSE COMPONENT  */}
                    <div className="w-full max-w-md">
                        <ChooseFile
                            label="Upload your image"
                            accept="image/jpeg,image/png,image/webp"
                            disabled={!isEditing || saving}
                            onChange={handleImageChange}
                        />
                        <p className="text-xs text-body/60 mt-1.5">JPEG and PNG up to 2MB.</p>
                    </div>
                </section>

                <div className="mt-8">
                    <h2 className="text-2xl font-heading font-bold text-heading mb-4">Personal Details</h2>

                    {/* PERSONAL DETAILS SHOWING SECTION - EDITABLE  */}
                    <form onSubmit={handleSave} className="grid grid-cols-2 gap-y-4 gap-x-4 max-w-2xl">
                        <div className="col-span-2 sm:col-span-1 space-y-1.5">
                            <label className="text-sm font-medium text-heading" htmlFor="profile-name">Full Name</label>
                            <Input
                                id="profile-name"
                                value={profile.name}
                                onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                                disabled={!isEditing || saving || loading}
                                placeholder="Your full name"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1 space-y-1.5">
                            <label className="text-sm font-medium text-heading" htmlFor="profile-contact">Contact</label>
                            <Input id="profile-contact" value={profile.contactNumber} disabled placeholder="Not provided" readOnly />
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="text-sm font-medium text-heading" htmlFor="profile-email">Email Address</label>
                            <Input id="profile-email" type="email" value={profile.email} disabled readOnly />
                        </div>

                        <div className="col-span-2 mt-2">
                            {/* DYNAMIC BUTTON TO SHOW SAVING AND EDTING STATE OF THE CHANGES  */}
                            <Button
                                type={isEditing ? "submit" : "button"}
                                className="px-6 py-2.5"
                                disabled={loading || saving}
                                onClick={!isEditing ? () => setIsEditing(true) : undefined}
                            >
                                {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Profile;
