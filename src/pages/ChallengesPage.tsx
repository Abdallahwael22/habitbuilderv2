
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeList from "@/components/challenges/ChallengeList";
import UserChallengeList from "@/components/challenges/UserChallengeList";

const ChallengesPage = () => {
  const [activeTab, setActiveTab] = useState("available");
  const { user } = useAuth();
  
  return (
    <Layout>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Challenges</h1>
        
        <Tabs defaultValue="available" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="available">Available Challenges</TabsTrigger>
            <TabsTrigger value="joined">My Challenges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="py-2">
            <p className="mb-4 text-gray-600">Join a challenge to build consistent habits and earn achievements!</p>
            <ChallengeList userId={user?.id || ""} />
          </TabsContent>
          
          <TabsContent value="joined" className="py-2">
            <p className="mb-4 text-gray-600">Track your progress in ongoing challenges.</p>
            <UserChallengeList userId={user?.id || ""} />
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default ChallengesPage;
