import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transactions {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  filterTransactions: Transactions[]
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])
  const [filterTransactions, setFilterTransactions] = useState<Transactions[]>([])

  async function fetchTransactions(query?: string ) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    if(query) {
      return setFilterTransactions(response.data)
    }

    setFilterTransactions(response.data)
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [transactions])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      filterTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}