import { useState } from "react";
import { mockTickets } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Send, Headphones, MessageSquare, Clock } from "lucide-react";
import { toast } from "sonner";
const statusColors = {
  Open: "bg-red-100 text-red-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Closed: "bg-green-100 text-green-700"
};
const priorityColors = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-red-100 text-red-700"
};
export function SupportInbox() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const handleRespond = () => {
    if (!response.trim()) return;
    toast.success("Response sent!");
    setResponse("");
  };
  const handleStatusUpdate = (newStatus) => {
    setStatusUpdate(newStatus);
    toast.success(`Ticket status updated to ${newStatus}`);
  };
  if (selectedTicket) {
    return <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedTicket(null)} className="gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" /> Back to Inbox
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1>{selectedTicket.subject}</h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={statusColors[selectedTicket.status]}>{selectedTicket.status}</Badge>
              <Badge className={priorityColors[selectedTicket.priority]}>{selectedTicket.priority}</Badge>
              <span className="text-xs text-muted-foreground">by {selectedTicket.userName}</span>
            </div>
          </div>
          <Select value={statusUpdate || selectedTicket.status} onValueChange={handleStatusUpdate}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {
      /* Original message */
    }
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground mb-2">
              {selectedTicket.userName} · {new Date(selectedTicket.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">{selectedTicket.message}</p>
          </CardContent>
        </Card>

        {
      /* Responses */
    }
        {selectedTicket.responses.length > 0 && <div className="space-y-3">
            {selectedTicket.responses.map((r, i) => <Card key={i} className="border-blue-200">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-2">
                    {r.author} · {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm">{r.text}</p>
                </CardContent>
              </Card>)}
          </div>}

        {
      /* Response composer */
    }
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Reply
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
      placeholder="Write a response..."
      value={response}
      onChange={(e) => setResponse(e.target.value)}
      rows={4}
    />
            <div className="flex justify-end">
              <Button onClick={handleRespond} className="gap-1">
                <Send className="w-4 h-4" /> Send Response
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="space-y-6">
      <div>
        <h1>Support Inbox</h1>
        <p className="text-sm text-muted-foreground">{mockTickets.length} tickets</p>
      </div>

      {mockTickets.length === 0 ? <div className="text-center py-16 border rounded-xl">
          <Headphones className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3>No support tickets</h3>
          <p className="text-sm text-muted-foreground">All caught up!</p>
        </div> : <div className="space-y-3">
          {mockTickets.map((ticket) => <div
    key={ticket.id}
    onClick={() => setSelectedTicket(ticket)}
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-xl hover:bg-muted/30 cursor-pointer transition-colors"
  >
              <div className="flex-1 min-w-0">
                <p className="truncate">{ticket.subject}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{ticket.userName}</span>
                  <span>·</span>
                  <Clock className="w-3 h-3" />
                  <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className={`text-xs ${priorityColors[ticket.priority]}`}>{ticket.priority}</Badge>
                <Badge className={`text-xs ${statusColors[ticket.status]}`}>{ticket.status}</Badge>
              </div>
            </div>)}
        </div>}
    </div>;
}
