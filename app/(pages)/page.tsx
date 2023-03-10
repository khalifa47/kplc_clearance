import ClearanceTable from "@/app/components/ClearanceTable";
import ClearanceForm from "@/app/components/ClearanceForm";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const getClearance = async (uid: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clearances/${uid}`);
  const clearance: { id: string; clearance: Clearance } = await res
    .json()
    .catch((err) => console.log(err));
  return clearance?.clearance;
};

const getItemsByUser = async (uid: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items/${uid}`);
  const items: Item[] = await res.json().catch((err) => console.log(err));
  return items;
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const clearance = await getClearance(session?.user.id!!);
  const items = await getItemsByUser(session?.user.id!!);

  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      {clearance ? (
        <ClearanceTable clearance={clearance} items={items} />
      ) : (
        <ClearanceForm
          uid={session?.user.id!}
          name={`${session?.user.firstName} ${session?.user.lastName}`}
          roleId={session?.user.roleId!}
        />
      )}
    </main>
  );
}
