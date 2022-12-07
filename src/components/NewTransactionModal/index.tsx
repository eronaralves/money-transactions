import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import { ArrowCircleUp, X, ArrowCircleDown } from "phosphor-react";
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

// Styles
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { api } from "../../lib/axios";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: {
      isSubmitting
    },
    reset
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    const {category, description, price, type} = data

    await api.post('transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date()
    })

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay/>

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={20}/>
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input 
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input 
            type="number" 
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true})}
          />

          <input 
            type="text" 
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({field}) => {
            
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton value="income" variant="income" >
                    <ArrowCircleUp size={24}/>
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24}/>
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

        
      </Content>
    </Dialog.Portal>
  )
}