import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { addRecommendation, getJobsByCompany, profiles } from "@/lib/data";
import { revalidatePath } from "next/cache";
import QrScanner from "./QrScanner";

// Hardcode the company ID for this dashboard
const COMPANY_ID = 'company-a';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { scannedData: string };
}) {
  const scannedId = searchParams.scannedData;
  const scannedUser = scannedId ? profiles.find(p => p.id === scannedId) : null;
  const jobs = getJobsByCompany(COMPANY_ID);

  async function handleRecommendation(formData: FormData) {
    'use server';
    const selectedJobIds = formData.getAll('jobId') as string[];
    const userId = formData.get('userId') as string;

    if (selectedJobIds.length > 0 && userId) {
      addRecommendation(userId, selectedJobIds);
      revalidatePath('/admin/dashboard');
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>QR Code Scanner</CardTitle>
            </CardHeader>
            <CardContent>
              <QrScanner />
            </CardContent>
          </Card>
        </div>
        <div>
          {scannedUser ? (
            <Card>
              <CardHeader>
                <CardTitle>Applicant Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Name:</strong> {scannedUser.nama}</p>
                <p><strong>Pendidikan:</strong> {scannedUser.pendidikan}</p>
                <p><strong>Pengalaman:</strong> {scannedUser.pengalaman}</p>
                <form action={handleRecommendation} className="mt-4">
                  <input type="hidden" name="userId" value={scannedUser.id} />
                  <h3 className="font-semibold mb-2">Recommend Jobs:</h3>
                  <div className="space-y-2">
                    {jobs.map((job) => (
                      <div key={job.id} className="flex items-center space-x-2">
                        <Checkbox id={job.id} name="jobId" value={job.id} />
                        <label
                          htmlFor={job.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {job.title}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button type="submit" className="mt-4">
                    Submit Recommendation
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Scan a QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Please scan an applicant&apos;s QR code to see their details and recommend jobs.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
} 