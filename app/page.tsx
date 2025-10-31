import { connectDB } from "../lib/db";
import { Experience as ExperienceModel } from "../lib/model";
import { Experience } from "../lib/type";
import ExperienceList from "../components/ExperienceList";

async function getExperiences(): Promise<Experience[]> {
  try {
    await connectDB();
    const experiences = await ExperienceModel.find().select('-slots').lean();
    
    // Convert MongoDB documents to plain objects and ensure _id is a string
    const serializedExperiences = experiences.map((exp:any) => ({
      ...exp,
      _id: exp._id.toString(),
    }));
    
    return serializedExperiences as Experience[];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export default async function Home() {
  const experiences: Experience[] = await getExperiences();

  return (
    <div className="min-h-screen bg-white">
      <main className="p-6">
        <ExperienceList experiences={experiences} />
      </main>
    </div>
  );
}
