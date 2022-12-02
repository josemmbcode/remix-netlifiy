import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { Link, useLoaderData } from "@remix-run/react";
import { getExpenses } from "~/data/expenses.server";
import Error from "~/components/util/Error";
import { json } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      {
        message: "No expenses found to analyze",
      },
      {
        status: 404,
        statusText: "Expenses not found",
      }
    );
  }

  return expenses;
}

export function CatchBoundary() {
  return (
    <Error title="An error occurred.">
      <main>
        <p>No expenses found to analyze.</p>
        <p>
          Start <Link to="/expenses/add">adding</Link> expenses.
        </p>
      </main>
    </Error>
  );
}
