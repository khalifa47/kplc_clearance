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

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const clearance = await getClearance(session?.user.id!!);

  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      {clearance ? <ClearanceTable clearance={clearance} /> : <ClearanceForm />}
    </main>
  );
}
