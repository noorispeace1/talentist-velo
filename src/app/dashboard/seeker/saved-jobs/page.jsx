import React from "react";
import { requireRole } from "@/lib/core/session";
import { getSavedJobs } from "@/lib/api/savedJobs";
import JobCard from "../../jobs/JobCard";
import { Bookmark, Search } from "lucide-react";
import Link from "next/link";

export default async function SavedJobsPage() {
  const user = await requireRole("seeker");
  const savedJobs = await getSavedJobs(user.id) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto mb-10 border-b border-zinc-800 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <Bookmark className="w-5 h-5" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Saved Jobs</h1>
        </div>
        <p className="text-zinc-400 mt-2 ml-[52px]">
          Review the roles you&apos;ve bookmarked and prepare your applications.
        </p>
      </div>

      {savedJobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center animate-in fade-in duration-700">
          {savedJobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto bg-zinc-900/30 animate-in fade-in duration-700">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50">
              <Bookmark className="w-8 h-8 text-zinc-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-zinc-200 mb-2">No Saved Jobs Yet</h3>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            You haven&apos;t bookmarked any jobs. Start exploring the job board to find exciting opportunities that match your skills.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 py-3 transition-colors text-sm shadow-md"
          >
            <Search className="w-4 h-4" />
            Browse Open Positions
          </Link>
        </div>
      )}
    </div>
  );
}
