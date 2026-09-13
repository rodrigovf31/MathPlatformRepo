
-- Create resources table for PDF metadata
CREATE TABLE public.resources (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    year INTEGER NOT NULL CHECK (year IN (10, 11, 12)),
    topic TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('ficha', 'guia')),
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Public read access (students can view all resources)
CREATE POLICY "Anyone can view resources"
ON public.resources FOR SELECT
USING (true);

-- Only authenticated users (admin) can insert
CREATE POLICY "Authenticated users can insert resources"
ON public.resources FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users (admin) can delete
CREATE POLICY "Authenticated users can delete resources"
ON public.resources FOR DELETE
TO authenticated
USING (true);

-- Create storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', true);

-- Public read access for PDFs
CREATE POLICY "Anyone can view PDFs"
ON storage.objects FOR SELECT
USING (bucket_id = 'pdfs');

-- Authenticated users can upload PDFs
CREATE POLICY "Authenticated users can upload PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'pdfs');

-- Authenticated users can delete PDFs
CREATE POLICY "Authenticated users can delete PDFs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'pdfs');
