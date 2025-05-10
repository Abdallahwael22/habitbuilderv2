
import { useState } from "react";
import { useHabits } from "@/context/HabitContext";
import { getSuggestedHabits } from "@/application/services/habitService";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface AddHabitFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddHabitForm = ({ isOpen, onClose }: AddHabitFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goalDuration, setGoalDuration] = useState(30);
  const { addHabit, loading } = useHabits();
  const suggestedHabits = getSuggestedHabits();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    await addHabit({
      name,
      description,
      goalDuration,
    });

    resetForm();
    onClose();
  };

  const handleSuggestedHabit = async (habit: any) => {
    await addHabit({
      name: habit.name,
      description: habit.description,
      goalDuration: habit.goalDuration,
    });
    onClose();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setGoalDuration(30);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>
            Create a new habit to track or choose from our suggestions.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="custom" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="custom">Create Custom</TabsTrigger>
            <TabsTrigger value="suggested">Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="custom">
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Habit Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Drink water"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your habit..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goalDuration">Goal Duration (Days)</Label>
                <Input
                  id="goalDuration"
                  type="number"
                  min={1}
                  max={365}
                  value={goalDuration}
                  onChange={(e) => setGoalDuration(parseInt(e.target.value))}
                  required
                />
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !name}>
                  {loading ? "Adding..." : "Add Habit"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="suggested">
            <div className="grid gap-3 py-2">
              {suggestedHabits.map((habit, index) => (
                <Card key={index} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="py-3 px-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{habit.name}</h4>
                        <p className="text-sm text-gray-500">{habit.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {habit.goalDuration} days
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSuggestedHabit(habit)}
                        disabled={loading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitForm;
