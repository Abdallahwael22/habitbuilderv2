
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChallenges, joinChallenge } from "@/application/services/challengeService";
import { Challenge } from "@/domain/models/habit";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChallengeListProps {
  userId: string;
}

const ChallengeList = ({ userId }: ChallengeListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const { data: challenges = [], isLoading, error } = useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });

  const joinMutation = useMutation({
    mutationFn: ({ userId, challengeId }: { userId: string; challengeId: string }) => 
      joinChallenge(userId, challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChallenges"] });
      toast({
        title: "Challenge joined!",
        description: "You've successfully joined the challenge. Good luck!",
      });
      setJoiningId(null);
    },
    onError: () => {
      toast({
        title: "Failed to join",
        description: "Could not join the challenge. Please try again.",
        variant: "destructive",
      });
      setJoiningId(null);
    },
  });

  const handleJoinChallenge = (challenge: Challenge) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please log in to join a challenge.",
        variant: "destructive",
      });
      return;
    }

    setJoiningId(challenge.id);
    joinMutation.mutate({ userId, challengeId: challenge.id });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading challenges...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading challenges. Please try again.
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No challenges available at the moment.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="overflow-hidden">
          <CardHeader className="bg-habit-blue/10 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Flag className="mr-2 h-5 w-5 text-habit-blue" />
                  {challenge.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {challenge.duration} days
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <p className="text-gray-700">{challenge.description}</p>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-2">
            <Button 
              className="w-full bg-habit-green hover:bg-habit-lightGreen"
              onClick={() => handleJoinChallenge(challenge)}
              disabled={joiningId === challenge.id}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {joiningId === challenge.id ? "Joining..." : "Join Challenge"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ChallengeList;
