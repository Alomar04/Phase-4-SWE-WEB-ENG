import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { mockApplications } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Archive,
  RotateCcw,
  Upload,
  Download,
  Eye,
  FileText,
  Clock,
  Bell,
  MessageSquare,
  Flag,
  AlertCircle,
  Plus,
  Send
} from "lucide-react";
import { toast } from "sonner";
const statusColors = {
  Draft: "bg-gray-100 text-gray-700",
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-amber-100 text-amber-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Other: "bg-purple-100 text-purple-700"
};
const flagColors = {
  concern: "bg-red-100 text-red-700",
  review: "bg-amber-100 text-amber-700",
  urgent: "bg-orange-100 text-orange-700",
  positive: "bg-green-100 text-green-700"
};
export function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = mockApplications.find((a) => a.id === id);
  const [status, setStatus] = useState(app?.status || "Draft");
  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  if (!app) {
    return <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h2>Application not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/applicant/applications")}>
          Back to Applications
        </Button>
      </div>;
  }
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    toast.success(`Status updated to ${newStatus}`);
  };
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    toast.success("Note added!");
    setNewNote("");
    setFollowUpDate("");
  };
  return <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1>{app.title}</h1>
            {app.archived && <Badge variant="outline" className="gap-1">
                <Archive className="w-3 h-3" /> Archived
              </Badge>}
          </div>
          <p className="text-muted-foreground">{app.organization}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline">{app.type}</Badge>
            <Badge className={statusColors[app.status]}>{app.status}</Badge>
            {app.flags.map((f) => <Badge key={f.id} className={`gap-1 ${flagColors[f.type]}`}>
                <Flag className="w-3 h-3" /> {f.type}
              </Badge>)}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => navigate(`/applicant/applications/${app.id}/edit`)} className="gap-1">
            <Edit className="w-4 h-4" /> Edit
          </Button>
          {!app.archived ? <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Archive className="w-4 h-4" /> Archive
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Archive this application?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will move the application to your archived list. You can restore it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
    toast.success("Application archived");
    navigate("/applicant/applications");
  }}>
                    Archive
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> : <Button variant="outline" size="sm" onClick={() => toast.success("Application restored")} className="gap-1">
              <RotateCcw className="w-4 h-4" /> Restore
            </Button>}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1">
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this application?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All associated notes, documents, and history will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
    toast.success("Application deleted");
    navigate("/applicant/applications");
  }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {
    /* Tabs */
  }
      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines & Reminders</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes & Follow-ups</TabsTrigger>
        </TabsList>

        {
    /* Overview Tab */
  }
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Organization</p>
                  <p className="text-sm">{app.organization}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="text-sm">{app.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                  <p className="text-sm">{new Date(app.deadline).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Quick Status Update</p>
                  <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Draft", "Applied", "Interview", "Accepted", "Rejected", "Other"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Created</p>
                <p className="text-sm">{new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {
    /* Recommendations */
  }
          {app.recommendations.length > 0 && <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <MessageSquare className="w-4 h-4" /> Advisor Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {app.recommendations.map((r) => <div key={r.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm">{r.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      — {r.advisorName}, {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>)}
              </CardContent>
            </Card>}

          {
    /* Status History */
  }
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Status History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {app.statusHistory.map((h, i) => <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="text-sm">
                        Status changed to <Badge className={`text-xs ${statusColors[h.status]}`}>{h.status}</Badge>
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()} · {h.actor}</p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {
    /* Deadlines & Reminders Tab */
  }
        <TabsContent value="deadlines" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Deadline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Current Deadline</p>
                <p className="text-lg">{new Date(app.deadline).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-4 h-4" /> Reminder Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
    { label: "7 days before deadline", key: "sevenDays" },
    { label: "1 day before deadline", key: "oneDay" },
    { label: "1 hour before deadline", key: "oneHour" }
  ].map((r) => <div key={r.key} className="flex items-center justify-between">
                  <Label htmlFor={r.key}>{r.label}</Label>
                  <Switch id={r.key} checked={app.reminders[r.key]} onCheckedChange={() => toast.success("Reminder updated")} />
                </div>)}
            </CardContent>
          </Card>
        </TabsContent>

        {
    /* Documents Tab */
  }
        <TabsContent value="documents" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Documents
              </CardTitle>
              <Button size="sm" variant="outline" className="gap-1" onClick={() => toast.success("File upload dialog would open")}>
                <Upload className="w-4 h-4" /> Upload
              </Button>
            </CardHeader>
            <CardContent>
              {app.attachments.length === 0 ? <div className="text-center py-8">
                  <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Supported: PDF, DOCX (max 10MB)</p>
                </div> : <div className="space-y-2">
                  {app.attachments.map((att) => <div key={att.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm">{att.name}</p>
                          <p className="text-xs text-muted-foreground">{att.type} · {att.size} · {att.uploadedAt}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title="View" onClick={() => toast("Opening file...")}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download" onClick={() => toast("Downloading...")}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>)}
                </div>}
            </CardContent>
          </Card>
        </TabsContent>

        {
    /* Notes & Follow-ups Tab */
  }
        <TabsContent value="notes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Note
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
    placeholder="Write a note or follow-up..."
    value={newNote}
    onChange={(e) => setNewNote(e.target.value)}
    rows={3}
  />
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="followUp" className="text-xs text-muted-foreground">Optional follow-up date</Label>
                  <Input id="followUp" type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
                </div>
                <Button onClick={handleAddNote} className="gap-1 self-end">
                  <Send className="w-4 h-4" /> Add Note
                </Button>
              </div>
            </CardContent>
          </Card>

          {
    /* Timeline */
  }
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              {app.notes.length === 0 ? <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">No notes yet</p>
                </div> : <div className="space-y-4">
                  {app.notes.map((note) => <div key={note.id} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">{note.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {note.author} · {new Date(note.createdAt).toLocaleDateString()}
                          </p>
                          {note.followUpDate && <Badge variant="outline" className="text-xs gap-1">
                              <Bell className="w-3 h-3" />
                              Follow-up: {new Date(note.followUpDate).toLocaleDateString()}
                            </Badge>}
                        </div>
                      </div>
                    </div>)}
                </div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
