import HeaderBox from "@/components/HeaderBox"
import PaymentTransferForm from "@/components/PaymentTransferForm"
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn?.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;
  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfer" subtext="Transfer money between accounts" />

      <section className="size-full pt-5">
        <PaymentTransferForm
          accounts={accountsData}
        />
      </section>
    </section>
  )
}

export default Transfer
