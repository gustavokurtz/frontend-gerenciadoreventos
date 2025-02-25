import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventsList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import Ranking from "./components/Ranking";
import Subscription from "./components/Subscription"; // Importando a nova página
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/subscription" element={<Subscription />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
}

export default App;
