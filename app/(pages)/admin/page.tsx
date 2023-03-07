import AdminTable from "@/app/components/AdminTable";

const getClearances = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clearances`);
  const clearances: Clearance[] = await res
    .json()
    .catch((err) => console.log(err));
  return clearances;
};

const getItems = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items`);
  const items: Item[] = await res.json().catch((err) => console.log(err));
  return items;
};

export default async function Dashboard() {
  const clearances = await getClearances();
  const items = await getItems();

  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      {clearances.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: 60 }}>
          No clearances found
        </h1>
      ) : (
        <AdminTable clearances={clearances} items={items} />
      )}
    </main>
  );
}
