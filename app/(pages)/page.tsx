import ClearanceTable from "@/app/components/ClearanceTable";
import ClearanceForm from "@/app/components/ClearanceForm";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const hasClearance = true;

const getClearances = async (uid: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clearances/${uid}`);
  const clearance: { id: string; clearance: Clearance } = await res.json();
  return clearance;
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const clearance = await getClearances(session?.user.id!!);

  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      {hasClearance ? (
        <ClearanceTable userType="employee" clearance={clearance.clearance} />
      ) : (
        <ClearanceForm />
      )}
    </main>
  );
}
