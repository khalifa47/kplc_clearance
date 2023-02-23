import AdminTable from "@/app/components/AdminTable";

const getClearances = async (page: string = "1") => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/clearances?page=${page}`
  );
  const clearances: { clearanceCount: number; clearances: Clearance[] } =
    await res.json().catch((err) => console.log(err));
  return clearances;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const clearances = await getClearances(searchParams.page);
  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      <AdminTable
        clearances={clearances.clearances}
        startPage={parseInt(searchParams.page) | 1}
        count={clearances.clearanceCount}
      />
    </main>
  );
}

/**
 * HR
 * 1. office keys
 * 2. keycard
 *
 * Finance
 * 1. loans paid
 *
 * ICT
 * 1. Monitor
 * 2. IP phone
 * 3. Diconnected from network
 *
 *
 */
