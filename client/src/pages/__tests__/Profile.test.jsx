import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import Profile from "../Profile";
import { authReducer } from "../../features/reducers/authReducers";
import * as authActions from "../../features/actions/authActions";
import { renderWithProviders } from "../../test/testUtils";

const initialUser = {
    name: "Jane Doe",
    email: "jane@example.com",
    contactNumber: "9876543210",
    profilePicture: "https://example.com/jane.jpg",
};

const authReducerMap = { auth: authReducer };
const defaultAuthState = { auth: { loading: false, error: null, userInfo: initialUser, success: false } };

describe("Profile page integration tests", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
        vi.spyOn(authActions, "usersDetails").mockImplementation(() => {
            return async () => ({ user: initialUser });
        });
    });

    // CHECK IF PROFILE PAGE MOUNTS AND LOADS USER DETAILS
    it("loads and displays the current user profile", async () => {
        renderWithProviders(<Profile />, { reducer: authReducerMap, preloadedState: defaultAuthState });

        expect(screen.getByText("Loading Profile...")).toBeInTheDocument();
        expect(await screen.findByDisplayValue("Jane Doe")).toBeInTheDocument();
        expect(screen.getByDisplayValue("jane@example.com")).toBeDisabled();
        expect(screen.getByDisplayValue("9876543210")).toBeDisabled();
        expect(JSON.parse(localStorage.getItem("user"))).toEqual(initialUser);
    });

    // TEST SAVING EDITED PROFILE DETAILS AND PROFILE IMAGE
    it("saves edited details and selected image through the update thunk", async () => {
        const user = userEvent.setup();
        const updatedUser = { ...initialUser, name: "Janet Doe", contactNumber: "9123456780" };
        const toastSuccess = vi.spyOn(toast, "success").mockImplementation(() => {});
        const updateProfile = vi.spyOn(authActions, "updateProfile").mockImplementation((formData) => {
            return async () => {
                expect(formData).toBeInstanceOf(FormData);
                expect(formData.get("name")).toBe("Janet Doe");
                expect(formData.get("contactNumber")).toBe("9123456780");
                expect(formData.get("profilePicture")).toBeInstanceOf(File);
                return { user: updatedUser, message: "Profile updated" };
            };
        });
        renderWithProviders(<Profile />, { reducer: authReducerMap, preloadedState: defaultAuthState });

        const nameInput = await screen.findByDisplayValue("Jane Doe");
        await user.click(screen.getByRole("button", { name: "Edit" }));
        await user.clear(nameInput);
        await user.type(nameInput, "Janet Doe");
        const contactInput = screen.getByDisplayValue("9876543210");
        await user.clear(contactInput);
        await user.type(contactInput, "9123456780");

        const image = new File(["image"], "avatar.png", { type: "image/png" });
        fireEvent.change(screen.getByLabelText("Upload your image"), {
            target: { files: [image] },
        });
        await user.click(screen.getByRole("button", { name: "Save Changes" }));

        await waitFor(() => expect(updateProfile).toHaveBeenCalledTimes(1));
        expect(await screen.findByDisplayValue("Janet Doe")).toBeDisabled();
        expect(toastSuccess).toHaveBeenCalledWith("Profile updated");
        expect(JSON.parse(localStorage.getItem("user"))).toEqual(updatedUser);
    });

    // TEST CANCEL EDITING RESTORES ORIGINAL PROFILE VALUES
    it("restores saved values when editing is cancelled", async () => {
        const user = userEvent.setup();
        localStorage.setItem("user", JSON.stringify(initialUser));
        renderWithProviders(<Profile />, { reducer: authReducerMap, preloadedState: defaultAuthState });

        const nameInput = await screen.findByDisplayValue("Jane Doe");
        await user.click(screen.getByRole("button", { name: "Edit" }));
        await user.clear(nameInput);
        await user.type(nameInput, "Unsaved Name");
        await user.click(screen.getByRole("button", { name: "Cancel" }));

        expect(screen.getByDisplayValue("Jane Doe")).toBeDisabled();
        expect(screen.queryByDisplayValue("Unsaved Name")).not.toBeInTheDocument();
    });

    // TEST USER LOGOUT FLOW WITH CONFIRMATION MODAL
    it("logs out only after confirmation", async () => {
        const user = userEvent.setup();
        localStorage.setItem("token", "token");
        localStorage.setItem("user", JSON.stringify(initialUser));
        renderWithProviders(<Profile />, { reducer: authReducerMap, preloadedState: defaultAuthState });

        await screen.findByDisplayValue("Jane Doe");
        await user.click(screen.getByRole("button", { name: /logout/i }));
        expect(screen.getByRole("heading", { name: "Confirm Logout" })).toBeInTheDocument();
        expect(localStorage.getItem("token")).toBe("token");

        await user.click(screen.getAllByRole("button", { name: "Logout" })[1]);

        await waitFor(() => expect(localStorage.getItem("token")).toBeNull());
        expect(localStorage.getItem("user")).toBeNull();
    });
});