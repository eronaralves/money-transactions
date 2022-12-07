import { createContext, ReactNode, useEffect, useState } from "react";

interface Transactions {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transactions[]
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
    console.log(data)
    
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{transactions: transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}