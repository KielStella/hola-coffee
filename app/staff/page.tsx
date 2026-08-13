import type { Metadata } from "next";
import StaffExperience from "@/components/staff/StaffExperience";
import { staffMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: "Meet the warm, passionate people behind every cup and every welcome at HOLA Coffee.",
  alternates: { canonical: "/staff" },
};

export default function StaffPage() {
  return <StaffExperience members={staffMembers} />;
}
