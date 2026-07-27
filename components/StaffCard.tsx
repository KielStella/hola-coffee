import { Quote } from "lucide-react";
import type { StaffMember } from "@/lib/data";

export default function StaffCard({ member }: { member: StaffMember }) {
  return (
    <div className="group h-full rounded-hola-lg bg-white p-8 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-hola-blue to-hola-blue-dark text-2xl font-display text-white shadow-inner">
        {member.initials}
      </div>
      <h3 className="mt-5 text-xl text-hola-brown">{member.name}</h3>
      <p className="text-sm font-semibold uppercase tracking-wide text-hola-blue-dark">{member.position}</p>
      <div className="mt-4 flex items-start justify-center gap-2 text-hola-brown-soft">
        <Quote className="mt-0.5 h-4 w-4 shrink-0 text-hola-yellow" aria-hidden="true" />
        <p className="text-sm italic leading-relaxed">{member.quote}</p>
      </div>
    </div>
  );
}
