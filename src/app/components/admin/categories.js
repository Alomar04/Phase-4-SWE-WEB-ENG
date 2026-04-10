import { useState } from "react";
import { mockCategories } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../ui/dialog";
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
import { Plus, Edit, Trash2, Tags, AlertCircle } from "lucide-react";
import { toast } from "sonner";
export function CategoriesManagement() {
  const [categories] = useState(mockCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const openCreate = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setNameError("");
    setDialogOpen(true);
  };
  const openEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
    setNameError("");
    setDialogOpen(true);
  };
  const handleSave = () => {
    if (!name.trim()) {
      setNameError("Name is required.");
      return;
    }
    const existing = categories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== editingId
    );
    if (existing) {
      setNameError("A category with this name already exists.");
      return;
    }
    toast.success(editingId ? "Category updated!" : "Category created!");
    setDialogOpen(false);
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Categories</h1>
          <p className="text-sm text-muted-foreground">{categories.length} categories</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {categories.length === 0 ? <div className="text-center py-16 border rounded-xl">
          <Tags className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3>No categories yet</h3>
          <p className="text-sm text-muted-foreground">Create your first category to get started.</p>
        </div> : <div className="border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left px-4 py-3 text-sm text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">Description</th>
                  <th className="text-left px-4 py-3 text-sm text-muted-foreground">Usage</th>
                  <th className="text-right px-4 py-3 text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm">{cat.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                      {cat.description}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">{cat.usageCount} apps</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {cat.usageCount > 0 ? <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                  <AlertCircle className="w-5 h-5 text-amber-500" />
                                  Cannot Delete Category
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  "{cat.name}" is currently used by {cat.usageCount} application(s).
                                  Remove it from all applications before deleting.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Understood</AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog> : <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete "{cat.name}"?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
    onClick={() => toast.success("Category deleted")}
    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
  >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>}
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>}

      {
    /* Create/Edit Dialog */
  }
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Category" : "New Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="catName">Name *</Label>
              <Input id="catName" value={name} onChange={(e) => {
    setName(e.target.value);
    setNameError("");
  }} />
              {nameError && <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" /> {nameError}
                </p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="catDesc">Description</Label>
              <Input id="catDesc" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? "Save Changes" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}
