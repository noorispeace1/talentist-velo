"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Link } from "@heroui/react";
import { MapPin, Briefcase, CircleDollar, ArrowRight, Bookmark, TrashBin, Pencil } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import { toggleSavedJob, deleteJob } from "@/lib/actions/jobs";
import { toast } from "@heroui/react";

export default function JobCard({ job }) {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(job?.isSaved || false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Guard clause in case the prop isn't passed or is loading
  if (!job) return null;

  const handleToggleSave = async () => {
    if (!session?.user?.id) return;
    const previousState = isSaved;
    setIsSaved(!isSaved); // Optimistic UI update
    
    try {
      const jobId = job._id?.$oid || job._id;
      const res = await toggleSavedJob(session.user.id, jobId);
      if (res && res.saved !== undefined) {
        setIsSaved(res.saved);
      }
    } catch (error) {
      console.error("Failed to toggle save job", error);
      setIsSaved(previousState); // Revert on failure
    }
  };

  // Format salary string safely (e.g., "160000" becomes "160k")
  const formatSalary = (amount) => {
    if (!amount) return "0";
    const numericAmount = parseInt(amount, 10);
    return numericAmount >= 1000 ? `${numericAmount / 1000}k` : amount;
  };

  const salaryRange = job.minSalary && job.maxSalary
    ? `$${formatSalary(job.minSalary)}–$${formatSalary(job.maxSalary)} / year`
    : "Salary Negotiable";

  // Safely extract the ID string depending on your MongoDB data hydration setup
  const jobId = job._id?.$oid || job._id;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteJob(jobId);
      if (res && res.deletedCount > 0) {
        toast.success("Job deleted successfully");
        setIsDeleted(true);
      } else {
        toast.error("Failed to delete job");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Failed to delete job", error);
      toast.error("An error occurred while deleting the job");
      setIsDeleting(false);
    }
  };

  const isOwner = session?.user?.id && job.recruiterId && session.user.id === job.recruiterId;

  if (isDeleted) return null; // Hide the card from UI after successful deletion

  return (
    <Card className="p-6 w-full max-w-[440px] border-none bg-zinc-900 text-zinc-100 rounded-[32px] shadow-2xl relative">
      
      {/* Save / Bookmark Button */}
      {mounted && session?.user && (
        <button 
          onClick={handleToggleSave}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-800 transition-colors z-10"
          aria-label="Save Job"
        >
          <Bookmark 
            className={`w-6 h-6 transition-colors ${isSaved ? "text-purple-500 fill-purple-500" : "text-zinc-500"}`} 
          />
        </button>
      )}

      {/* Card Header: Company Info & Job Title */}
      <Card.Header className="flex flex-col items-start gap-4 p-0 pb-3">
        <div className="flex items-center gap-3">
          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt={`${job.companyName || "Company"} logo`}
              className="w-8 h-8 object-contain rounded-md"
            />
          )}
          <span className="text-lg font-medium text-zinc-300 pr-10">
            {job.companyName || "Confidential"}
          </span>
        </div>
        
        <Card.Title className="text-3xl font-semibold tracking-tight text-white leading-tight pr-8">
          {job.jobTitle}
        </Card.Title>
        
        {job.responsibilities && (
          <Card.Description className="text-base text-zinc-400 line-clamp-2">
            {job.responsibilities}
          </Card.Description>
        )}
      </Card.Header>

      {/* Card Content: Badges/Tags & Technical Details */}
      <Card.Content className="flex flex-col gap-5 p-0 py-4">
        {/* Badge Grid matching your reference layout */}
        <div className="flex flex-wrap gap-2">
          {/* Location Tag */}
          {job.location && (
            <div className="flex items-center gap-2 bg-zinc-800/60 px-4 py-2 rounded-full border border-zinc-800">
              <MapPin className="text-purple-400 w-4 h-4" />
              <span className="text-sm font-medium text-zinc-200">
                {job.location} {job.isRemote && "(Remote)"}
              </span>
            </div>
          )}

          {/* Job Type Tag */}
          {job.jobType && (
            <div className="flex items-center gap-2 bg-zinc-800/60 px-4 py-2 rounded-full border border-zinc-800">
              <Briefcase className="text-purple-400 w-4 h-4" />
              <span className="text-sm font-medium text-zinc-200 capitalize">
                {job.jobType}
              </span>
            </div>
          )}

          {/* Salary Tag */}
          <div className="flex items-center gap-2 bg-zinc-800/60 px-4 py-2 rounded-full border border-zinc-800 w-fit">
            <div className="flex justify-center items-center bg-purple-500/20 rounded-full w-5 h-5">
              <CircleDollar className="text-purple-400 w-3 h-3" />
            </div>
            <span className="text-sm font-medium text-zinc-200">{salaryRange}</span>
          </div>
        </div>

        {/* Supplemental info strings */}
        {(job.requirements || job.benefits) && (
          <div className="text-xs text-zinc-500 space-y-1 border-t border-zinc-800/60 pt-3">
            {job.requirements && (
              <p><strong className="text-zinc-400">Requirements:</strong> {job.requirements}</p>
            )}
            {job.benefits && (
              <p><strong className="text-zinc-400">Benefits:</strong> {job.benefits}</p>
            )}
          </div>
        )}
      </Card.Content>

      {/* Card Footer: Action Button */}
      <Card.Footer className="p-0 pt-4 flex items-center justify-between">
        <Link
          href={`/jobs/${jobId}`}
          className="group flex justify-start items-center gap-2 bg-transparent hover:bg-zinc-800/40 p-2 rounded-lg text-base font-medium text-white transition-all duration-200"
          variant="light"
          disableRipple
        >
          Apply Now
          <ArrowRight className="group-hover:translate-x-1 text-zinc-400 group-hover:text-white w-4 h-4 transition-transform duration-200" />
        </Link>

        {mounted && isOwner && (
          <div className="flex items-center gap-2">
            <Button
              as={Link}
              href={`/dashboard/recruiter/edit-job/${jobId}`}
              isIconOnly
              size="sm"
              className="bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-lg"
              aria-label="Edit Job"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              isLoading={isDeleting}
              onPress={handleDelete}
              className="bg-zinc-800 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg"
              aria-label="Delete Job"
            >
              <TrashBin className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card.Footer>

    </Card>
  );
}