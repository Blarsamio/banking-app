import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: { category: string }) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles["default"];
  return (
    <div className={cn("category-badge dark:bg-black-3 dark:border-neutral-700", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full dark:bg-neutral-400", backgroundColor)}></div>
      <p className={cn("text-[12px] font-medium dark:text-neutral-200 truncate", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb] dark-bg dark-header">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => {
          const status = getTransactionStatus(new Date(transaction.date));
          const amount = formatAmount(transaction.amount);
          const isDebit = transaction.type === "debit";
          const isCredit = transaction.type === "credit";

          return (
            <TableRow
              key={transaction.id}
              className={`${
                isDebit || amount[0] === "-"
                  ? "bg-[#FFFBFA] dark:bg-[#ed254e] dark:bg-opacity-10"
                  : "bg-[#F6FEF9] dark:bg-neutral-800"
              } !over:bg-none !border-b-DEFAULT dark:border-neutral-700`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054] dark:text-neutral-300">
                    {removeSpecialCharacters(transaction.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={`pl-2 pr-12 font-semibold ${
                  isDebit || amount[0] === "-"
                    ? "text-[#f04438] dark:text-white"
                    : "text-[#039855] dark:text-white"
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? `+${amount}` : amount}
              </TableCell>
              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className="pl-2 pr-10 min-w-24 dark:text-neutral-300">
                {formatDateTime(new Date(transaction.date)).dateTime}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-32 dark:text-neutral-300">
                {transaction.paymentChannel}
              </TableCell>
              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge category={transaction.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
