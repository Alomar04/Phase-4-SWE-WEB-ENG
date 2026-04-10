import { mockAuditLog } from "../../lib/mock-data";
import { Badge } from "../ui/badge";
import { ClipboardList } from "lucide-react";
const actionColors = {
  "User Deleted": "bg-red-100 text-red-700",
  "Password Reset": "bg-amber-100 text-amber-700",
  "Category Created": "bg-green-100 text-green-700",
  "Category Updated": "bg-blue-100 text-blue-700",
  "Ticket Resolved": "bg-green-100 text-green-700",
  "Issue Updated": "bg-amber-100 text-amber-700",
  "User Role Changed": "bg-purple-100 text-purple-700"
};
export function AuditLog() {
  return <div className="space-y-6">
      <div>
        <h1>Audit Log</h1>
        <p className="text-sm text-muted-foreground">Admin activity history</p>
      </div>

      {mockAuditLog.length === 0 ? <div className="text-center py-16 border rounded-xl">
          <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3>No audit entries</h3>
          <p className="text-sm text-muted-foreground">Activity will appear here.</p>
        </div> : <div className="border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left px-4 py-3 text-sm text-muted-foreground">Timestamp</th>
                  <th className="text-left px-4 py-3 text-sm text-muted-foreground">Actor</th>
                  <th className="text-left px-4 py-3 text-sm text-muted-foreground">Action</th>
                  <th className="text-left px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">Details</th>
                </tr>
              </thead>
              <tbody>
                {mockAuditLog.map((entry) => <tr key={entry.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(entry.timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}
                    </td>
                    <td className="px-4 py-3 text-sm">{entry.actor}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs ${actionColors[entry.action] || "bg-gray-100 text-gray-700"}`}>
                        {entry.action}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                      {entry.details}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>}
    </div>;
}
