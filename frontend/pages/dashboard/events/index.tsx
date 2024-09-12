import { useEffect, useState } from "react";
import styles from "@styles/EventsPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getEvents } from "@hooks";
import { GetEventsProps } from "@types";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Events = () => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 48.8566,
    lng: 2.3522,
  };

  const router = useRouter();
  const [events, setEvents] = useState<GetEventsProps[]>();

  console.log(events);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.title}>
          <h1>Events</h1>
        </div>
        <button>
          <i className="fas fa-plus"></i>
          Add Event
        </button>
      </div>
      <div className="column">
        <div className={`box ${styles.calendarContainer}`}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events?.map((event) => ({
              title: event.name,
              date: event.date,
            }))}
          />
        </div>
      </div>
      <div className="column">
        <div className={`box ${styles.calendarContainer}`}>
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
            >
              {events?.map((event, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(event.location_x),
                    lng: parseFloat(event.location_y),
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Events;
