import { useState } from "react";
import { mockIssues } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Clock, AlertTriangle, MessageSquare, Plus } from "lucide-react";
import { toast } from "sonner";
const statusColors = {
  New: "bg-blue-100 text-blue-700",
  Investigating: "bg-amber-100 text-amber-700",
  Resolved: "bg-green-100 text-green-700",
  Dismissed: "bg-gray-100 text-gray-700"
};
const priorityColors = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700"
};
export function ReportedIssues() {
  const [selected, setSelected] = useState(null);
  const [newNote, setNewNote] = useState("");
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    toast.success("Internal note added");
    setNewNote("");
  };
  if (selected) {
    return <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelected(null)} className="gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1>{selected.title}</h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={statusColors[selected.status]}>{selected.status}</Badge>
              <Badge className={priorityColors[selected.priority]}>{selected.priority}</Badge>
              <span className="text-xs text-muted-foreground">
                Reported by {selected.reportedBy} · {new Date(selected.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Select
      value={selected.status}
      onValueChange={(v) => toast.success(`Status updated to ${v}`)}
    >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Investigating">Investigating</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{selected.description}</p></CardContent>
        </Card>

        {
      /* Internal Notes */
    }
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Internal Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selected.internalNotes.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No internal notes yet.</p> : selected.internalNotes.map((note, i) => <div key={i} className="p-3 bg-muted/50 rounded-lg text-sm">{note}</div>)}
            <div className="flex gap-2">
              <Textarea
      placeholder="Add internal note..."
      value={newNote}
      onChange={(e) => setNewNote(e.target.value)}
      rows={2}
      className="flex-1"
    />
              <Button onClick={handleAddNote} className="self-end gap-1">
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {
      /* History */
    }
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selected.history.map((h, i) => <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-sm">{h.action}</p>
                    <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()} · {h.actor}</p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="space-y-6">
      <div>
        <h1>Reported Issues</h1>
        <p className="text-sm text-muted-foreground">{mockIssues.length} issues</p>
      </div>

      {mockIssues.length === 0 ? <div className="text-center py-16 border rounded-xl">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3>No reported issues</h3>
          <p className="text-sm text-muted-foreground">Everything looks good!</p>
        </div> : <div className="space-y-3">
          {mockIssues.map((issue) => <div
    key={issue.id}
    onClick={() => setSelected(issue)}
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-xl hover:bg-muted/30 cursor-pointer transition-colors"
  >
              <div className="flex-1 min-w-0">
                <p className="truncate">{issue.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Reported by {issue.reportedBy} · {new Date(issue.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className={`text-xs ${priorityColors[issue.priority]}`}>{issue.priority}</Badge>
                <Badge className={`text-xs ${statusColors[issue.status]}`}>{issue.status}</Badge>
              </div>
            </div>)}
        </div>}
    </div>;
}
