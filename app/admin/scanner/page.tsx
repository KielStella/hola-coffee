import ScannerPanel from "@/components/scanner/ScannerPanel";

export default function AdminScannerPage() {
  return (
    <div>
      <h1 className="text-2xl text-hola-brown">QR Scanner</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Scan an Order QR or Reward QR to process it.</p>
      <div className="mt-6">
        <ScannerPanel />
      </div>
    </div>
  );
}
