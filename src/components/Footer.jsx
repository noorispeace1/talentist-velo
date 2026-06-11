"use client";

import Link from "next/link";
import {
  Facebook,
  Linkedin,
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
} from "@gravity-ui/icons";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* TOP SECTION */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND INFO */}
          <div className="space-y-6">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
  <Image
    src="/logo.jpg"
    alt="Talentist-Velo Logo"
    width={44}
    height={44}
    className="h-full w-full object-contain p-1"
    priority
  />
</div>

              <div className="leading-4">
                <h2 className="text-xl font-bold">
             Talentist-Velo
                </h2>

                <p className="text-xs text-gray-400">
                  Hiring Platform
                </p>
              </div>
            </Link>

            {/* DESCRIPTION */}
            <p className="max-w-sm text-sm leading-7 text-gray-400">
              The AI-native career platform. Built for people
              who take their work seriously.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-purple-400">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-400 transition hover:text-white"
                >
                  Job discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/ai-tools"
                  className="text-gray-400 transition hover:text-white"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-gray-400 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary"
                  className="text-gray-400 transition hover:text-white"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-purple-400">
              Navigations
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 transition hover:text-white"
                >
                  Help center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="text-gray-400 transition hover:text-white"
                >
                  Career library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-purple-400">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/brand"
                  className="text-gray-400 transition hover:text-white"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="text-gray-400 transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-6 md:flex-row">
          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-purple-600"
            >
              <LogoFacebook className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white"
            >
              <LogoGithub className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-purple-600"
            >
              <LogoLinkedin className="h-5 w-5" />
            </Link>
          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-col items-center gap-2 text-center text-sm text-gray-400 md:flex-row">
            <p>
              Copyright 2026 — Talentist-Velo
            </p>

            <span className="hidden md:block">•</span>

            <div className="flex items-center gap-3">
              <Link
                href="/terms"
                className="transition hover:text-white"
              >
                Terms & Policy
              </Link>

              <span>-</span>

              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;