import { useState, useEffect, useRef } from "react";
import "./Semaine.css";
import EventModal from "./EventModal";

// ----------------------------------------

// --COMPONENTS WEEK DAY AND HOUR SLOT--

function Heure({ h, jour, event, onSlotClick }) {
  return (
    <div className="flex items-start border-b border-white/10 w-full h-14 p-1 gap-1 transition-colors">
      <div className="w-8 flex flex-col items-center justify-center text-slate-400 text-sm font-medium">
        <p>{h}h</p>
      </div>
      <div
        onClick={() => onSlotClick(jour, h)}
        className={`w-full h-full flex items-center rounded-lg backdrop-blur-md px-3 text-slate-100 border transition-all cursor-pointer ${
          event
            ? "bg-indigo-500/30 border-indigo-500/50 hover:bg-indigo-500/40"
            : "bg-white/5 border-transparent hover:bg-indigo-500/20 hover:border-indigo-500/30"
        }`}
      >
        {event && (
          <span className="text-sm font-medium truncate">{event.titre}</span>
        )}
      </div>
    </div>
  );
}

function Jour({ j, events, onSlotClick }) {
  const heures = [];
  for (let i = 0; i < 12; i++) {
    const heure = i + 8;
    const event = events.find((e) => e.heure === heure);
    heures.push(
      <Heure
        key={i}
        h={heure}
        jour={j}
        event={event}
        onSlotClick={onSlotClick}
      />
    );
  }

  return (
    <div className="isolate flex flex-col min-w-[160px] w-44 md:w-56 flex-shrink-0 border border-white/20 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30">
      <h3 className="text-center font-semibold capitalize sticky top-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md py-3 px-2 text-slate-100 border-b border-white/20">
        {j}
      </h3>
      <div className="flex flex-col overflow-y-auto">{heures}</div>
      <div className="flex items-center justify-center w-full px-2 py-2 bg-white/5 border-t border-white/10 text-slate-400 text-sm">
        <p>20:00</p>
      </div>
    </div>
  );
}

function Semaine() {
  const jours = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  // State pour les événements (persisté dans localStorage)
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("schedule-events");
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem("schedule-events");
      return [];
    }
  });

  // State pour le modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ jour: null, heure: null });

  // Persister les événements à chaque changement
  useEffect(() => {
    localStorage.setItem("schedule-events", JSON.stringify(events));
  }, [events]);

  // Ouvrir le modal au clic sur un créneau
  const handleSlotClick = (jour, heure) => {
    setSelectedSlot({ jour, heure });
    setModalOpen(true);
  };

  // Créer ou modifier un événement
  const handleSave = (eventData) => {
    const existingIndex = events.findIndex((e) => e.id === eventData.id);
    if (existingIndex >= 0) {
      // Modification
      const updated = [...events];
      updated[existingIndex] = eventData;
      setEvents(updated);
    } else {
      // Création
      setEvents([...events, eventData]);
    }
    setModalOpen(false);
  };

  // Supprimer un événement
  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    setModalOpen(false);
  };

  // Trouver l'événement du créneau sélectionné
  const selectedEvent = events.find(
    (e) => e.jour === selectedSlot.jour && e.heure === selectedSlot.heure
  );

  return (
    <>
      <div className="min-h-screen w-full px-4 md:px-6 py-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white flex gap-3 md:gap-4 overflow-x-auto justify-start">
        {jours.map((jour) => (
          <Jour
            key={jour}
            j={jour}
            events={events.filter((e) => e.jour === jour)}
            onSlotClick={handleSlotClick}
          />
        ))}
      </div>

      {modalOpen && (
        <EventModal
          jour={selectedSlot.jour}
          heure={selectedSlot.heure}
          event={selectedEvent}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default Semaine;
