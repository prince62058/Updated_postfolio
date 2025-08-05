import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: Date;
}

export default function Admin() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact-submissions');
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-accent">Contact Submissions</h1>
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Back to Portfolio
          </Button>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No contact submissions yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="glassmorphic p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-light text-accent">{submission.name}</h3>
                    <p className="text-muted-foreground">{submission.email}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Subject:</h4>
                  <p className="text-muted-foreground">{submission.subject}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Message:</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`mailto:${submission.email}?subject=Re: ${submission.subject}`, '_blank')}
                  >
                    Reply via Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}