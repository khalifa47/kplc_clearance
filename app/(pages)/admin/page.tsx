import AdminTable from "@/app/components/AdminTable";

const getClearances = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clearances`);
  const clearances: Clearance[] = await res
    .json()
    .catch((err) => console.log(err));
  return clearances;
};

export default async function Dashboard() {
  const clearances = await getClearances();
  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      <AdminTable clearances={clearances} />
    </main>
  );
}
