import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { AiTools } from "./pages/AiTools";
import { CheckIn } from "./pages/CheckIn";
import { Checkout } from "./pages/Checkout";
import { EventDetails } from "./pages/EventDetails";
import { Home } from "./pages/Home";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { Success } from "./pages/Success";
import { UserDashboard } from "./pages/UserDashboard";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/success/:id" element={<Success />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/ai" element={<AiTools />} />
      </Routes>
    </AppLayout>
  );
}
