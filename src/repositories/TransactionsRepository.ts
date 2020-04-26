import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (acc, cur) => {
        if (cur.type === 'income') {
          acc.income += cur.value;
        } else {
          acc.outcome += cur.value;
        }
        acc.total = acc.income - acc.outcome;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = { id: uuid(), title, value, type };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
