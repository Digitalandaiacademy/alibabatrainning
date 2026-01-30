-- Fix missing columns in orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS access_granted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMP WITH TIME ZONE;

-- Ensure download_tokens table exists (just in case)
CREATE TABLE IF NOT EXISTS download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for download_tokens if created
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;

-- Create index for download tokens
CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON download_tokens(token);

-- Allow public access to download_tokens (or restrict as needed)
-- For now, allow service role to manage it fully
CREATE POLICY "Service role can manage download tokens" ON download_tokens
  USING (true)
  WITH CHECK (true);
