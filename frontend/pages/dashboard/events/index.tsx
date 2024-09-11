import { useEffect, useState } from "react";
import { getEvents } from "@hooks";
import { GetEventsProps } from "@types";
import styles from "@styles/EventsPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Scheduler } from "@aldabil/react-scheduler";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { LatLngTuple, Map as LeafletMap } from 'leaflet';
import { useMap } from 'react-leaflet';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Component to update map view
function MapViewControl({ center, zoom }: { center: LatLngTuple; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function Events() {
  const [events, setEvents] = useState<GetEventsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const formattedSchedulerEvents = events.map((event) => ({
    event_id: event.id,
    title: event.name,
    start: new Date(event.date),
    end: new Date(event.date),
    location: event.location_name,
    maxParticipants: event.max_participants,
    eventType: event.type,
  }));

  const defaultCenter: LatLngTuple = [51.505, -0.09];
  const center: LatLngTuple =
    events.length > 0
      ? [events[0].location_x, events[0].location_y]
      : defaultCenter;

  const zoom = 13;

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>Events</h1>
        <button className="button is-primary" disabled>
          <i className="fas fa-plus" /> Add Event
        </button>
      </div>

      <div className={styles.containerBg}>
        <div className={styles.calendarContainer}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Scheduler view="month" events={formattedSchedulerEvents} />
          )}
        </div>

        <div className={styles.mapContainer}>
          <MapContainer style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // The attribution information is included within the URL itself
            />
            <MapViewControl center={center} zoom={zoom} />
            {events.map((event) => (
              <Marker
                key={event.id}
                position={[event.location_x, event.location_y]}
              >
                <Popup>
                  <strong>{event.name}</strong>
                  <br />
                  Location: {event.location_name}
                  <br />
                  Type: {event.type}
                  <br />
                  Max Participants: {event.max_participants}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </main>
  );
}



// npm i @aldabil/react-scheduler
// npm install leaflet react-leaflet
// npm install @emotion/react @emotion/styled
// npm install @types/leaflet --save-dev

