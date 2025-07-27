// lib/db.ts
import { supabase } from "./supabase";
import { Registered } from "@/types";

// ✅ Fetch all events
export async function getEvents() {
  const { data, error } = await supabase.from("events").select("*");
  if (error) {
    console.error("Error fetching events:", error.message);
    return [];
  }
  return data;
}

// ✅ Fetch all registrations
export async function getRegistered() {
  const { data, error } = await supabase
    .from("registrations")
    .select("id, full_name, email, event_id, registration_date");

  if (error) {
    console.error("Error fetching registrations:", error.message);
    return [];
  }

  console.log("Fetched registrations:", data); // 👈 add this
  return data;
}

// ✅ Save registration (auto handles duplicate via DB constraint)
export async function saveRegistered(
  registered: Omit<Registered, "id" | "registrationDate">
): Promise<Registered> {
  const { data, error } = await supabase
    .from("registrations")
    .insert([
      {
        full_name: registered.fullName,
        email: registered.email.toLowerCase(),
        event_id: registered.eventId,
      },
    ])
    .select()
    .single(); // Return the inserted row

  if (error) {
    if (error.message.includes("duplicate key")) {
      throw new Error("You have already registered for this event.");
    }
    console.error("Error saving registration:", error.message);
    throw new Error("Failed to save registration.");
  }

  return {
    id: data.id,
    fullName: data.full_name,
    email: data.email,
    eventId: data.event_id,
    registrationDate: data.registration_date,
  };
}
