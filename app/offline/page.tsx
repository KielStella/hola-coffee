import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-hola-beige px-4 py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
        <WifiOff className="h-10 w-10 text-hola-blue-dark" strokeWidth={1.5} />
      </div>
      <h1 className="mt-6 text-3xl text-hola-brown sm:text-4xl">You&apos;re offline.</h1>
      <p className="mt-3 max-w-md text-hola-brown-soft">
        It looks like you&apos;ve lost your internet connection. Reconnect and try again — your cart and
        account will be right where you left them.
      </p>
    </section>
  );
}
