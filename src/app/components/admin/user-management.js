import { useState } from "react";
import { mockUsers, mockApplications } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
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
import { Search, Trash2, KeyRound, Mail, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";
const roleColors = {
  applicant: "bg-blue-100 text-blue-700",
  advisor: "bg-amber-100 text-amber-700",
  admin: "bg-purple-100 text-purple-700"
};
export function UserManagement() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const filtered = search ? mockUsers.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  ) : mockUsers;
  return <div className="space-y-6">
      <div>
        <h1>User Management</h1>
        <p className="text-sm text-muted-foreground">{mockUsers.length} registered users</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {
    /* Users Table */
  }
      <div className="border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left px-4 py-3 text-sm text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-sm text-muted-foreground">Role</th>
                <th className="text-left px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">Joined</th>
                <th className="text-right px-4 py-3 text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => <tr key={user.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedUser(user)} className="text-sm hover:underline cursor-pointer text-left">
                      {user.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs capitalize ${roleColors[user.role]}`}>{user.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{user.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <Button
    variant="ghost"
    size="icon"
    title="Reset Password"
    onClick={() => toast.success(`Password reset email sent to ${user.email}`)}
  >
                        <KeyRound className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" title="Delete User">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete {user.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the user account and all associated data. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
    onClick={() => toast.success(`User ${user.name} deleted`)}
    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
  >
                              Delete User
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {
    /* User Profile Drawer */
  }
      <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>User Profile</SheetTitle>
          </SheetHeader>
          {selectedUser && <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary">
                    {selectedUser.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3>{selectedUser.name}</h3>
                  <Badge className={`text-xs capitalize mt-1 ${roleColors[selectedUser.role]}`}>
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  {selectedUser.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Joined {selectedUser.createdAt}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  {mockApplications.filter((a) => a.applicantId === selectedUser.id).length} applications
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1" onClick={() => toast.success("Password reset sent")}>
                  <KeyRound className="w-4 h-4" /> Reset Password
                </Button>
              </div>
            </div>}
        </SheetContent>
      </Sheet>
    </div>;
}
