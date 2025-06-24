import { getUserById, getRecommendationsForUser, getAssignedJobsForUser } from "@/lib/data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "./profil-form";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;

  if (!userId) {
    redirect('/login');
  }

  const user = getUserById(userId);
  const recommendations = getRecommendationsForUser(userId);
  const assignedJobs = getAssignedJobsForUser(userId);

  if (!user) {
    // This case might happen if the cookie is stale
    redirect('/login?message=User not found, please log in again.');
  }

  // The user object from getUserById already contains the email
  const userWithEmail = {
    ...user,
    email: user.email 
  };

  return <ProfileForm user={userWithEmail} profile={userWithEmail} recommendations={recommendations} assignedJobs={assignedJobs} />;
} 