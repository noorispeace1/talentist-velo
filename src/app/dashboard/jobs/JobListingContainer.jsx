"use client";

import React, { useState, useEffect, useRef } from "react";
import JobFilters from "./JobFilter";
import JobCard from "./JobCard";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";


/**
 * Generate an array of page numbers & ellipsis markers for display.
 * Always shows first, last, current, and 1 sibling on each side.
 */
function getPageRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total]);
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }

  return result;
}


export default function JobListingContainer({ Jobs, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedType, setSelectedType] = useState(filters.jobType || "all");
  const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory || "all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);
  const [currentPage, setCurrentPage] = useState(filters.page ? parseInt(filters.page, 10) : 1);
  const jobsPerPage = 10;
  const filterRef = useRef({ searchQuery, selectedType, selectedCategory, isRemoteOnly });

  const router = useRouter();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let newPage = currentPage;

    // Check if filters have changed (excluding page)
    if (
      filterRef.current.searchQuery !== searchQuery ||
      filterRef.current.selectedType !== selectedType ||
      filterRef.current.selectedCategory !== selectedCategory ||
      filterRef.current.isRemoteOnly !== isRemoteOnly
    ) {
      newPage = 1;
      setCurrentPage(1);
      filterRef.current = { searchQuery, selectedType, selectedCategory, isRemoteOnly };
    }

    const sp = new URLSearchParams();
    if (searchQuery) {
      sp.set("search", searchQuery);
    }
    if (selectedType !== "all") {
      sp.set("jobType", selectedType);
    }
    if (selectedCategory !== "all") {
      sp.set("jobCategory", selectedCategory);
    }
    if (isRemoteOnly) {
      sp.set("isRemote", true);
    }
    if (newPage > 1) {
      sp.set("page", newPage);
    }

    const path = `?${sp.toString()}`;
    router.push(path, { scroll: false });
  }, [router, selectedType, selectedCategory, isRemoteOnly, searchQuery, currentPage]);

  const totalPages = Math.ceil(Jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = Jobs.slice(startIndex, startIndex + jobsPerPage);
  const pageRange = getPageRange(currentPage, totalPages);

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500 font-medium">
        Showing {Jobs.length > 0 ? Math.min(startIndex + 1, Jobs.length) : 0} -{" "}
        {Math.min(startIndex + jobsPerPage, Jobs.length)} of {Jobs.length} position
        {Jobs.length !== 1 && "s"}
      </div>

      {Jobs.length > 0 ? (
        <div className="flex flex-col items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {currentJobs.map((jobItem) => (
              <JobCard key={jobItem._id?.$oid || jobItem._id} job={jobItem} />
            ))}
          </div>

          {/* ── Beautiful Pagination using HeroUI v3 compound API ── */}
          {totalPages > 1 && (
            <div className="mt-16 mb-8 flex justify-center">
              <Pagination size="lg">
                <Pagination.Content className="flex items-center gap-1.5 p-2.5 rounded-2xl border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  {/* Previous Button */}
                  <Pagination.Item>
                    <Pagination.Previous
                      onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
                      isDisabled={currentPage === 1}
                      className={`flex items-center gap-1.5 px-3.5 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                        currentPage === 1
                          ? "text-zinc-600 cursor-not-allowed opacity-40"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white active:scale-95"
                      }`}
                    >
                      <Pagination.PreviousIcon>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Pagination.PreviousIcon>
                      <span className="hidden sm:inline">Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {/* Separator */}
                  <div className="w-px h-6 bg-zinc-700/50 mx-1 hidden sm:block" />

                  {/* Page Numbers */}
                  {pageRange.map((item, idx) =>
                    item === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${idx}`}>
                        <Pagination.Ellipsis className="w-10 h-10 flex items-center justify-center text-zinc-500 text-lg tracking-widest select-none" />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={item}>
                        <Pagination.Link
                          isActive={item === currentPage}
                          onPress={() => handlePageChange(item)}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                            item === currentPage
                              ? "bg-gradient-to-br from-white to-zinc-200 text-zinc-900 shadow-[0_2px_12px_rgba(255,255,255,0.15)] scale-105"
                              : "text-zinc-400 hover:bg-zinc-800 hover:text-white active:scale-95"
                          }`}
                        >
                          {item}
                        </Pagination.Link>
                      </Pagination.Item>
                    )
                  )}

                  {/* Separator */}
                  <div className="w-px h-6 bg-zinc-700/50 mx-1 hidden sm:block" />

                  {/* Next Button */}
                  <Pagination.Item>
                    <Pagination.Next
                      onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      isDisabled={currentPage === totalPages}
                      className={`flex items-center gap-1.5 px-3.5 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                        currentPage === totalPages
                          ? "text-zinc-600 cursor-not-allowed opacity-40"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white active:scale-95"
                      }`}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <Pagination.NextIcon>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Pagination.NextIcon>
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">No positions match your search criteria.</p>
        </div>
      )}
    </>
  );
}