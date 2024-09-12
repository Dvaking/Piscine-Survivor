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

const Events = () => {
  const router = useRouter();
  const [events, setEvents] = useState<GetEventsProps[]>();

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
    </div>
  );
};

export default Events;
