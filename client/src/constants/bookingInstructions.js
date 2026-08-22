// BOOKING GUIDELINES AND PATIENT INSTRUCTIONS
export const bookingInstructions = [
  {
    id: "emergency",
    title: "Emergency Care",
    description:
      "In case of a critical or life-threatening emergency, please visit your nearest hospital emergency department immediately or contact local emergency helplines. Do not rely on appointment booking",
    urgent: true,
  },
  {
    id: "availability",
    title: "Unavailable Dates or Doctors",
    description:
      "If your preferred doctor or desired date is currently unavailable online, please reach out directly to our helpline by phone to explore cancellation slots or tailored accommodations.",
    urgent: false,
  },
  {
    id: "confirmation",
    title: "Confirmation Notice",
    description:
      "After completing your booking, please wait for an official confirmation email or direct phone call from our team.",
    urgent: false,
  },
  {
    id: "reports",
    title: "Required Medical Records",
    description:
      "Please remember to bring along all previous medical reports, diagnostic test results, and prescription history when arriving for your in-person consultation.",
    urgent: false,
  },
  {
    id: "holidays",
    title: "National & Public Holidays",
    description:
      "Please avoid scheduling appointments on major national holidays, as outpatient departments and specialist consultation may be non-operational but our systems may still show them as available.",
    urgent: false,
  },
];
