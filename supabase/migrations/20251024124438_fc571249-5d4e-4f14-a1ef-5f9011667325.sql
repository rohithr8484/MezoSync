-- Create transactions table for tracking user activities
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('send', 'receive', 'save')),
  amount NUMERIC NOT NULL,
  recipient_address TEXT,
  sender_address TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions
FOR SELECT
USING (
  wallet_address = ANY(
    ARRAY[
      (SELECT wallet_address FROM user_balances WHERE wallet_address = transactions.wallet_address),
      recipient_address,
      sender_address
    ]
  )
);

-- Create policy for users to insert their own transactions
CREATE POLICY "Users can insert their own transactions"
ON public.transactions
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_transactions_wallet_address ON public.transactions(wallet_address);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);