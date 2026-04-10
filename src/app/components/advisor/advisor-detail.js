import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { mockApplications } from "../../lib/mock-data";
import { useAuth } from "../../lib/auth-context";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  ArrowLeft,
  Clock,
  FileText,
  Download,
  Eye,
  Flag,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
const statusColors = {
  Draft: "bg-gray-100 text-gray-700",
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-amber-100 text-amber-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700"
};
const flagColors = {
  concern: "bg-red-100 text-red-700",
  review: "bg-amber-100 text-amber-700",
  urgent: "bg-orange-100 text-orange-700",
  positive: "bg-green-100 text-green-700"
};
export function AdvisorApplicationDetail() {
  const { userId, appId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const app = mockApplications.find((a) => a.id === appId);
  const [recommendation, setRecommendation] = useState("");
  const [flagType, setFlagType] = useState("review");
  const [flagNote, setFlagNote] = useState("");
  if (!app) {
    return <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h2>Application not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate(`/advisor/applicant/${userId}`)}>
          Back to Profile
        </Button>
      </div>;
  }
  const handleSubmitRecommendation = () => {
    if (!recommendation.trim()) return;
    toast.success("Recommendation sent! The applicant will be notified.");
    setRecommendation("");
  };
  const handleAddFlag = () => {
    toast.success(`Flag added: ${flagType}`);
    setFlagNote("");
  };
  return <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(`/advisor/applicant/${userId}`)} className="gap-2 -ml-2">
        <ArrowLeft className="w-4 h-4" /> Back to Profile
      </Button>

      {
    /* Header */
  }
      <div>
        <h1>{app.title}</h1>
        <p className="text-muted-foreground">{app.organization}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="outline">{app.type}</Badge>
          <Badge className={statusColors[app.status]}>{app.status}</Badge>
          {app.flags.map((f) => <Badge key={f.id} className={`gap-1 ${flagColors[f.type]}`}>
              <Flag className="w-3 h-3" /> {f.type}
              {f.note && <span className="ml-1">· {f.note}</span>}
            </Badge>)}
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="actions">Advisor Actions</TabsTrigger>
        </TabsList>

        {
    /* Overview */
  }
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Badge className={statusColors[app.status]}>{app.status}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="text-sm">{app.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Organization</p>
                  <p className="text-sm">{app.organization}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                  <p className="text-sm">{new Date(app.deadline).toLocaleString()}</p>
                </div>
              </div>
              {
    /* Progress indicator */
  }
              <div>
                <p className="text-xs text-muted-foreground mb-2">Progress</p>
                <div className="flex gap-1">
                  {["Draft", "Applied", "Interview", "Accepted"].map((s, i) => {
    const idx = ["Draft", "Applied", "Interview", "Accepted"].indexOf(app.status);
    return <div
      key={s}
      className={`h-2 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`}
    />;
  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Draft</span><span>Applied</span><span>Interview</span><span>Accepted</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {
    /* Deadlines */
  }
        <TabsContent value="deadlines" className="mt-4">
          <Card>
            <CardContent className="p-5">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="text-lg">{new Date(app.deadline).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Reminders: {app.reminders.sevenDays ? "7d" : ""} {app.reminders.oneDay ? "1d" : ""} {app.reminders.oneHour ? "1h" : ""}
                  {!app.reminders.sevenDays && !app.reminders.oneDay && !app.reminders.oneHour && "None set"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {
    /* Documents */
  }
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {app.attachments.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No documents uploaded.</p> : <div className="space-y-2">
                  {app.attachments.map((att) => <div key={att.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{att.name}</p>
                          <p className="text-xs text-muted-foreground">{att.type} · {att.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => toast("Opening...")}><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => toast("Downloading...")}><Download className="w-4 h-4" /></Button>
                      </div>
                    </div>)}
                </div>}
            </CardContent>
          </Card>
        </TabsContent>

        {
    /* History */
  }
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {app.statusHistory.map((h, i) => <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="text-sm">
                        Status: <Badge className={`text-xs ${statusColors[h.status]}`}>{h.status}</Badge>
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()} · {h.actor}</p>
                    </div>
                  </div>)}
                {app.notes.map((n) => <div key={n.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm">{n.text}</p>
                      <p className="text-xs text-muted-foreground">{n.author} · {new Date(n.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {
    /* Advisor Actions */
  }
        <TabsContent value="actions" className="space-y-4 mt-4">
          {
    /* Flag Item */
  }
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="w-4 h-4" /> Flag Item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Flag Type</Label>
                  <Select value={flagType} onValueChange={setFlagType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concern">Concern</SelectItem>
                      <SelectItem value="review">Needs Review</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="positive">Positive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Note (optional)</Label>
                  <Input placeholder="Brief note..." value={flagNote} onChange={(e) => setFlagNote(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleAddFlag} size="sm" className="gap-1">
                <Flag className="w-4 h-4" /> Add Flag
              </Button>
            </CardContent>
          </Card>

          {
    /* Recommendation Composer */
  }
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <MessageSquare className="w-4 h-4" /> Write Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
    placeholder="Write actionable guidance for the applicant..."
    value={recommendation}
    onChange={(e) => setRecommendation(e.target.value)}
    rows={4}
  />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">The applicant will be notified when you submit.</p>
                <Button onClick={handleSubmitRecommendation} className="gap-1">
                  <Send className="w-4 h-4" /> Submit
                </Button>
              </div>
            </CardContent>
          </Card>

          {
    /* Existing recommendations */
  }
          {app.recommendations.length > 0 && <Card>
              <CardHeader>
                <CardTitle className="text-sm">Previous Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {app.recommendations.map((r) => <div key={r.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{r.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">— {r.advisorName}, {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>)}
              </CardContent>
            </Card>}

          {
    /* Notification banner simulation */
  }
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            <p className="text-sm text-green-700">Applicant notifications are enabled. They will see your flags and recommendations.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
}
