import { Navigate, Route, Routes } from "react-router-dom";
import { AttendeeHomePage } from "./pages/AttendeeHomePage";
import { AttendeeSignupPage } from "./pages/AttendeeSignupPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { OrganizerPlaceholderPage } from "./pages/OrganizerPlaceholderPage";
import { RoleSelectionPage } from "./pages/RoleSelectionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<RoleSelectionPage />} />
      <Route path="/signup/attendee" element={<AttendeeSignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/attendee/home" element={<AttendeeHomePage />} />
      <Route path="/organizer/dashboard" element={<OrganizerPlaceholderPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
