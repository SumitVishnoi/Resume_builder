import {
  Target,
  FileText,
  Download,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export const STATS = [
  { value: "91", unit: "/100", label: "Avg ATS score" },
  { value: "< 2", unit: " min", label: "Time to first resume" },
  { value: "7", unit: " sections", label: "Dedicated editors" },
  { value: "100%", unit: "", label: "Free to download" },
];

export const FEATURES = [
  {
    icon: Target,
    title: "Live ATS scoring",
    body: "10 weighted checks score your resume in real time. Know exactly what to fix before you apply.",
  },
  {
    icon: FileText,
    title: "Split-pane editor",
    body: "Edit on the left, see a formatted document preview on the right. What you build is what recruiters read.",
  },
  {
    icon: Download,
    title: "One-click download",
    body: "Export a clean, print-ready file. No watermarks, no paywall — just your resume.",
  },
  {
    icon: Zap,
    title: "Auto-save",
    body: "Every keystroke is debounced and saved. Close the tab anytime — your work is safe.",
  },
  {
    icon: Shield,
    title: "Section-by-section",
    body: "Dedicated editors for personal info, summary, experience, education, projects, skills, and certifications.",
  },
  {
    icon: Clock,
    title: "Multiple resumes",
    body: "Create a tailored version for every role. Each one gets its own ATS score on your dashboard.",
  },
];

export const STEPS = [
  {
    n: "1",
    title: "Create an account",
    body: "Sign up free in under a minute. No credit card required.",
  },
  {
    n: "2",
    title: "Build your resume",
    body: "Fill each section at your pace. Watch the live preview and ATS score update as you go.",
  },
  {
    n: "3",
    title: "Download and apply",
    body: "Export a clean, formatted file and submit with confidence.",
  },
];

export const EDITOR_TABS = [
  "Personal",
  "Summary",
  "Experience",
  "Skills",
  "Projects",
];

export const TRUST_ITEMS = [
  "Free to start",
  "No credit card",
  "Download instantly",
];