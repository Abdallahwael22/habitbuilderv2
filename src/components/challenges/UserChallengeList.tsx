
import { useQuery } from "@tanstack/react-query";
import { getUserChallenges } from "@/application/services/challengeService";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Trophy } from "lucide-react";
import { format } from "date-fns";

interface UserChallengeListProps {
  userId: string;
}

const UserChallengeList = ({ userId }: UserChallengeListProps) => {
  const { data: userChallenges = [], isLoading, error } = useQuery({
    queryKey: ["userChallenges", userId],
    queryFn: () => getUserChallenges(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading your challenges...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading your challenges. Please try again.
      </div>
    );
  }

  if (userChallenges.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">You haven't joined any challenges yet.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {userChallenges.map(({ challenge, userChallenge }) => {
        const startDate = new Date(userChallenge.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + challenge.duration);
        const isCompleted = userChallenge.completed;
        const isActive = new Date() <= endDate && !isCompleted;

        return (
          <Card key={challenge.id} className="overflow-hidden">
            <CardHeader className={`pb-2 ${isCompleted ? "bg-green-100" : "bg-habit-blue/10"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    {isCompleted ? (
                      <Trophy className="mr-2 h-5 w-5 text-green-600" />
                    ) : (
                      <Flag className="mr-2 h-5 w-5 text-habit-blue" />
                    )}
                    {challenge.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {challenge.duration} days challenge
                  </CardDescription>
                </div>
                <Badge variant={isCompleted ? "success" : isActive ? "outline" : "secondary"}>
                  {isCompleted ? "Completed" : isActive ? "Active" : "Expired"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-gray-700 mb-4">{challenge.description}</p>
              <div className="text-sm text-gray-500">
                <p>
                  Started: {format(startDate, "MMM d, yyyy")}
                </p>
                <p>
                  Ends: {format(endDate, "MMM d, yyyy")}
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 pt-2">
              <div className="w-full text-center text-sm text-gray-600">
                {isCompleted ? (
                  <p className="text-green-600 font-medium">Challenge completed! 🎉</p>
                ) : isActive ? (
                  <p>Keep going, you're doing great!</p>
                ) : (
                  <p>This challenge has ended</p>
                )}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default UserChallengeList;
