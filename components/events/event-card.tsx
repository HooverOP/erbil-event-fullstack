import { Event } from "@/types";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

const eventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-gray-900">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            {event.location}
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          {event.description}
        </p>

        <Link href={`/register?eventId=${event.id}`} passHref>
          <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-900">
            Register Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default eventCard;
