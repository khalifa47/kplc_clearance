import AdminTable from "@/app/components/AdminTable";

const getClearances = async (page: string = "1") => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/clearances?page=${page}`
  );
  const clearances: { clearanceCount: number; clearances: Clearance[] } =
    await res.json().catch((err) => console.log(err));
  return clearances;
};

const getItems = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items`);
  const items: Item[] = await res.json().catch((err) => console.log(err));
  return items;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const clearances = await getClearances(searchParams.page);
  const items = await getItems();

  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      {clearances.clearanceCount === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: 60 }}>
          No clearances found
        </h1>
      ) : (
        <AdminTable
          clearances={clearances.clearances}
          startPage={parseInt(searchParams.page) | 1}
          count={clearances.clearanceCount}
          items={items}
        />
      )}
    </main>
  );
}
