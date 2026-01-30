-- Make user_id nullable in orders table to allow guest checkout
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- Make user_id nullable in course_access table (guests receive access via email/token)
ALTER TABLE course_access ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policy to allow anonymous users to insert orders
DROP POLICY IF EXISTS "Users can create orders" ON orders;

CREATE POLICY "Enable insert for authenticated users only" ON orders 
FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable insert for anonymous users" ON orders 
FOR INSERT TO anon 
WITH CHECK (true);

-- Ensure public access to create orders is allowed (sometimes needed depending on project setup)
GRANT INSERT ON TABLE orders TO anon;
GRANT INSERT ON TABLE orders TO authenticated;
