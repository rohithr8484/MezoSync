-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table to store user balances by wallet address
CREATE TABLE public.user_balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  savings_balance DECIMAL(20, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_balances ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read and write their own balance
CREATE POLICY "Anyone can view balances" 
ON public.user_balances 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert their own balance" 
ON public.user_balances 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their own balance" 
ON public.user_balances 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_balances_updated_at
BEFORE UPDATE ON public.user_balances
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();