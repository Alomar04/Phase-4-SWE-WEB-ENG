import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../lib/auth-context";
import { mockApplications } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
export function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isEditing = !!id && id !== "new";
  const existing = isEditing ? mockApplications.find((a) => a.id === id) : null;
  const [title, setTitle] = useState(existing?.title || "");
  const [organization, setOrganization] = useState(existing?.organization || "");
  const [type, setType] = useState(existing?.type || "Job");
  const [status, setStatus] = useState(existing?.status || "Draft");
  const [deadline, setDeadline] = useState(existing?.deadline?.slice(0, 16) || "");
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!organization.trim()) errs.organization = "Organization is required.";
    if (!deadline) errs.deadline = "Deadline is required.";
    else if (new Date(deadline) < /* @__PURE__ */ new Date()) errs.deadline = "Deadline cannot be in the past.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success(isEditing ? "Application updated!" : "Application added!");
    navigate("/applicant/applications");
  };
  return <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Application" : "Add New Application"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="title">Opportunity Title *</Label>
              <Input
    id="title"
    placeholder="e.g., Software Engineer Intern"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    aria-invalid={!!errors.title}
  />
              {errors.title && <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" /> {errors.title}
                </p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="org">Organization *</Label>
              <Input
    id="org"
    placeholder="e.g., Google"
    value={organization}
    onChange={(e) => setOrganization(e.target.value)}
    aria-invalid={!!errors.organization}
  />
              {errors.organization && <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" /> {errors.organization}
                </p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select value={type} onValueChange={(v) => setType(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Job">Job</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Organization">Organization</SelectItem>
                    <SelectItem value="Program">Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="deadline">Deadline *</Label>
              <Input
    id="deadline"
    type="datetime-local"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    aria-invalid={!!errors.deadline}
  />
              {errors.deadline && <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" /> {errors.deadline}
                </p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                {isEditing ? "Save Changes" : "Add Application"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>;
}
