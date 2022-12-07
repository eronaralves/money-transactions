import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../context/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../ultils/formatter";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable} from './styles'

export function Transactions() {
  const {transactions, filterTransactions} = useContext(TransactionsContext)

  return (
    <div>
      <Header/>
      <Summary/>

      <TransactionsContainer>
        <SearchForm/>
        <TransactionsTable>
          <tbody>
            {filterTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHightLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- ' }
                      {priceFormatter.format(transaction.price)}  
                    </PriceHightLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}