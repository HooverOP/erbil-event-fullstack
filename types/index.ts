export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface Registered {
  id: string;
  fullName: string;
  email: string;
  eventId: string;
  registrationDate: string;
}

export interface RegistrationForm {
  fullName: string;
  email: string;
  eventId: string;
}

// basic way to define types throughout the whole project
