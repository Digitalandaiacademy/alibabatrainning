-- Add first_name and last_name columns to orders table if they don't exist
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS first_name TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN IF NOT EXISTS last_name TEXT NOT NULL DEFAULT 'Unknown';

-- Update existing records (if any) to have default values
UPDATE orders 
SET first_name = COALESCE(first_name, 'Unknown'),
    last_name = COALESCE(last_name, 'Unknown')
WHERE first_name IS NULL OR first_name = '' OR last_name IS NULL OR last_name = '';
