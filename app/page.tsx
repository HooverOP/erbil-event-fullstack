"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types";
import { Loader2 } from "lucide-react";
import EventCard from "@/components/events/event-card";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchEvents}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Try Again
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="py-12 text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Erbil Event Registration System
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Welcome! Easily browse, explore, and register for the latest events
          happening in Erbil and the Kurdistan Region.
        </p>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Events Available
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and register for exciting events. Browse through our curated
          selection of conferences, workshops, and networking opportunities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events available at the moment.</p>
        </div>
      )}
    </div>
  );
}
