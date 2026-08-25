import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Services from "../Services";
import { servicesReducer } from "../../features/reducers/serviceReducers";
import * as serviceActions from "../../features/actions/serviceActions";
import { renderWithProviders } from "../../test/testUtils";

const services = [
  {
    _id: "1",
    name: "Cardiology Consultation",
    shortDescription: "Heart health consultation",
    tags: ["heart", "checkup"],
    type: "Specialist",
  },
  {
    _id: "2",
    name: "Dental Cleaning",
    shortDescription: "Routine dental cleaning",
    tags: ["teeth", "cleaning"],
    type: "Dental",
  },
];

const servicesState = {
  services,
  totalPages: 2,
  loading: false,
  error: null,
  success: true,
};

const renderServices = () => renderWithProviders(<Services />, {
  reducer: { services: servicesReducer },
  preloadedState: { services: servicesState },
});

describe("Services page integration tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(serviceActions, "getAllServices").mockImplementation(() => async () => {});
  });

  // CHECK IF MOUNTS PROPERLY ON LOAD OR NOT
  it("mounts and displays the services page", () => {
    renderServices();

    expect(screen.getByRole("heading", { name: "Services We Offer" })).toBeInTheDocument();
    expect(screen.getByText("Cardiology Consultation")).toBeInTheDocument();
    expect(screen.getByText("Dental Cleaning")).toBeInTheDocument();
  });

  // TEST PAGINATION IS BEING LOAD AND BUTTONS ARE CLICKABLE
  it("loads pagination and allows changing pages", async () => {
    const user = userEvent.setup();
    renderServices();

    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous Page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next Page" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Next Page" }));

    expect(screen.getByRole("button", { name: "Previous Page" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "2", current: "page" })).toBeInTheDocument();
  });

  // TEST SEARCH BAR IS WORKING OR NOT.
  it("filters services when searching", async () => {
    const user = userEvent.setup();
    renderServices();

    const searchInput = screen.getByPlaceholderText("Search services...");
    await user.type(searchInput, "dental");

    expect(screen.getByText("Dental Cleaning")).toBeInTheDocument();
    expect(screen.queryByText("Cardiology Consultation")).not.toBeInTheDocument();
  });
});