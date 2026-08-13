import { Download, ShoppingBag, Users, Gift, MessageSquare, TrendingUp } from "lucide-react";

const reports = [
  { type: "orders", label: "Orders", description: "Every order, guest or customer, with status and totals.", icon: ShoppingBag },
  { type: "customers", label: "Customers", description: "Customer accounts with points, tier, and activity.", icon: Users },
  { type: "rewards", label: "Reward Redemptions", description: "Every reward redemption and its approval status.", icon: Gift },
  { type: "messages", label: "Contact Messages", description: "All inquiries submitted through the Contact Us form.", icon: MessageSquare },
  { type: "sales", label: "Sales", description: "Completed orders only — revenue and items sold.", icon: TrendingUp },
];

export default function AdminReportsPage() {
  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Reports</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Export data as CSV for spreadsheets or bookkeeping.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {reports.map((report) => (
          <div key={report.type} className="flex items-center justify-between gap-4 rounded-hola-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hola-blue/10">
                <report.icon className="h-5 w-5 text-hola-blue-dark" />
              </div>
              <div>
                <p className="font-display text-hola-brown">{report.label}</p>
                <p className="text-xs text-hola-brown-soft">{report.description}</p>
              </div>
            </div>
            <a
              href={`/api/admin/export/${report.type}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hola-brown/15 px-4 py-2 text-sm font-semibold text-hola-brown transition hover:bg-hola-beige"
            >
              <Download className="h-4 w-4" /> CSV
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
