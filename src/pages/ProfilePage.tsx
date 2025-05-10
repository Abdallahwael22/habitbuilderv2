
import Layout from "@/components/layout/Layout";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfilePage = () => {
  return (
    <Layout>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <ProfileForm />
      </section>
    </Layout>
  );
};

export default ProfilePage;
