// Smart Contract Exports for Mezo Sync
// These contracts handle payments and bills on the Mezo network

export { PAYMENTS_CONTRACT_ABI, PAYMENTS_CONTRACT_ADDRESSES } from './payments-abi';
export { 
  BILLS_CONTRACT_ABI, 
  BILLS_CONTRACT_ADDRESSES, 
  BillType, 
  BillStatus 
} from './bills-abi';

// Contract documentation
export const CONTRACT_INFO = {
  payments: {
    name: 'MezoSyncPayments',
    description: 'Handles MUSD payments for Mezo Sync platform',
    functions: {
      sendPayment: 'Send MUSD to a recipient with optional note',
      getPayment: 'Get payment details by ID',
      getUserPayments: 'Get all payments for a user',
      getUserPaymentCount: 'Get total payment count for a user',
    },
  },
  bills: {
    name: 'MezoSyncBills',
    description: 'Handles bill payments (Rent, SaaS, Utilities) for Mezo Sync',
    types: {
      RENT: 'Monthly rent payments',
      SAAS: 'Software as a Service subscriptions',
      UTILITIES: 'Utility bill payments',
    },
    statuses: {
      DRAFT: 'Bill created but not yet sent',
      PENDING: 'Bill sent, awaiting payment',
      PAID: 'Bill has been paid',
      OVERDUE: 'Bill is past due date',
    },
    functions: {
      createBill: 'Create a new bill for a payer',
      payBill: 'Pay a bill in MUSD',
      getBill: 'Get bill details by ID',
      getCreatorBills: 'Get all bills created by a user',
      getPayerBills: 'Get all bills assigned to a payer',
      markOverdue: 'Mark a pending bill as overdue',
    },
  },
};
