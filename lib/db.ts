import path from "path";
import fs from "fs";
import { Registered } from "@/types";

const eventsPath = path.join(process.cwd(), "data", "events.json");
const registeredPath = path.join(process.cwd(), "data", "registered.json");

// simple way to fetch data
export function getEvents() {
  try {
    const data = fs.readFileSync(eventsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading events file:", error);
    return [];
  }
}

export function getRegistered() {
  try {
    const data = fs.readFileSync(registeredPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading registered file:", error);
    return [];
  }
}

// advanced way to save data (checks for dupes)
export function saveRegistred(
  registered: Omit<Registered, "id" | "registrationDate">
): Registered {
  try {
    const registeredData = getRegistered();
    const newRegistration = {
      ...registered,
      id: crypto.randomUUID(),
      registrationDate: new Date().toISOString(),
    };
    const existingRegistered = registeredData.find(
      (reg: { email: string; eventId: string }) =>
        reg.email === newRegistration.email.toLocaleLowerCase() &&
        reg.eventId === newRegistration.eventId
    );
    if (existingRegistered) {
      throw new Error("You have already registered for this event.");
    }
    registeredData.push(newRegistration);
    fs.writeFileSync(registeredPath, JSON.stringify(registeredData, null, 2));
    return newRegistration;
  } catch (error) {
    console.error("Error saving registration:", error);
    throw new Error("Failed to save registration");
  }
}
