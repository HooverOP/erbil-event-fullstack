"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Event, RegistrationForm } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { saveRegistered } from "@/lib/db";
export default function RegisterPage() {
  const searchParams = useSearchParams();
  const preSelectedEventId = searchParams.get("eventId");

  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<RegistrationForm>({
    fullName: "",
    email: "",
    eventId: preSelectedEventId || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (preSelectedEventId) {
      setFormData((prev) => ({ ...prev, eventId: preSelectedEventId }));
    }
  }, [preSelectedEventId]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from("events").select("*");
      if (error) throw error;
      setEvents(data);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await saveRegistered(formData); // ← direct DB insert
      setIsSuccess(true);
      setFormData({ fullName: "", email: "", eventId: "" });
    } catch (err: any) {
      const message =
        err.message?.includes("already registered") ||
        err.message?.includes("duplicate")
          ? "You have already registered for this event"
          : err.message || "Registration failed";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventSelect = (eventId: string) => {
    setFormData((prev) => ({
      ...prev,
      eventId,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for registering. You will receive a confirmation email
                shortly.
              </p>
              <Button onClick={() => setIsSuccess(false)} className="w-full">
                Register Another Person
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Event Registration
        </h1>
        <p className="text-gray-600">
          Fill out the form below to register for an event
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Register for Event</CardTitle>
            <CardDescription>
              Please provide your details to complete registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event">Select Event</Label>
                <Select
                  value={formData.eventId}
                  onValueChange={handleEventSelect}
                  required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title} -{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || !formData.eventId}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register for Event"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
