import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowCircleUp, X, ArrowCircleDown } from "phosphor-react";

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay/>

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={20}/>
        </CloseButton>
        <form>
          <input type="text" placeholder="Descrição"/>
          <input type="number" placeholder="Preço"/>
          <input type="text" placeholder="Categoria"/>

          <TransactionType>
            <TransactionTypeButton value="income" variant="income">
              <ArrowCircleUp size={24}/>
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton value="outcome" variant="outcome">
              <ArrowCircleDown size={24}/>
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">
            Cadastrar
          </button>
        </form>

        
      </Content>
    </Dialog.Portal>
  )
}