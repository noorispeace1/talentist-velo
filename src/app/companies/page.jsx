import React from "react";
import { getCompanies } from "@/lib/api/companies";
import { Card } from "@heroui/react";
import { Factory, Globe, MapPin, Persons, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

export default async function CompaniesPage() {
  // Fetch all companies from our public API endpoint
  const allCompanies = await getCompanies() || [];
  // Only display approved companies to the public
  const companies = allCompanies.filter((company) => company.status === "Approved");

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto mb-12 border-b border-zinc-800/60 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Factory className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Top Companies
          </h1>
        </div>
        <p className="text-lg text-zinc-400 max-w-2xl ml-[64px] leading-relaxed">
          Discover industry-leading organizations actively hiring. Explore their culture, mission, and available opportunities.
        </p>
      </div>

      {/* Companies Grid */}
      {companies.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
          {companies.map((company) => (
            <Card 
              key={company._id?.$oid || company._id} 
              className="p-6 bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 text-zinc-100 rounded-[32px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              
              <Card.Header className="flex items-start gap-4 p-0 pb-4">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 object-contain bg-white rounded-2xl p-2 border border-zinc-700/50 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 shadow-sm">
                    <Factory size={28} className="text-zinc-500" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0 pt-1">
                  <h2 className="text-xl font-bold tracking-tight text-white truncate">
                    {company.name}
                  </h2>
                  <span className="text-sm font-medium text-purple-400 block mt-0.5">
                    {company.industry || "Technology"}
                  </span>
                </div>
              </Card.Header>

              <Card.Content className="flex-grow p-0 py-4 flex flex-col gap-4">
                {company.description ? (
                  <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                    {company.description}
                  </p>
                ) : (
                  <p className="text-sm text-zinc-500 italic">No description provided.</p>
                )}
                
                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/60">
                  {company.location && (
                    <div className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                      <MapPin className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">{company.location}</span>
                    </div>
                  )}
                  {company.employeeCount && (
                    <div className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                      <Persons className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">{company.employeeCount}</span>
                    </div>
                  )}
                  {company.websiteUrl && (
                    <div className="flex items-center gap-2 text-zinc-300 text-xs font-medium col-span-2">
                      <Globe className="w-4 h-4 text-zinc-500" />
                      <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="truncate hover:text-purple-400 hover:underline transition-colors">
                        {company.websiteUrl.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </Card.Content>

              <Card.Footer className="p-0 pt-5 mt-2">
                <Link
                  href={`/jobs?companyId=${company._id?.$oid || company._id}`}
                  className="group flex justify-center items-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                >
                  View Open Jobs
                  <ArrowRight className="group-hover:translate-x-1 text-zinc-400 group-hover:text-white w-4 h-4 transition-transform duration-200" />
                </Link>
              </Card.Footer>

            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto bg-zinc-900/30 animate-in fade-in duration-700">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50 shadow-inner">
              <Factory className="w-10 h-10 text-zinc-500" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-zinc-200 mb-3">No Companies Found</h3>
          <p className="text-zinc-500 text-base max-w-md mx-auto leading-relaxed">
            There are currently no approved companies listed on the platform. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
}
