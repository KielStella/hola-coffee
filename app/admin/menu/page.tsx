import { prisma } from "@/lib/prisma";
import MenuManager from "@/components/dashboard/MenuManager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({ orderBy: { sortOrder: "asc" }, include: { category: true } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Menu Management</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Add, edit, or retire products across every category.</p>
      <div className="mt-6">
        <MenuManager categories={categories} products={products} />
      </div>
    </div>
  );
}
