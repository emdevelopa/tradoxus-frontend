import ModulePreviewShowcase from "@/components/education/ModulePreviewShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Module Preview Showcase - Tradoxus",
  description: "Interactive showcase of all module preview card components",
};

export default function ModuleShowcasePage() {
  return <ModulePreviewShowcase />;
}
