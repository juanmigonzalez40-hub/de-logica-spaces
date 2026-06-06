ALTER TABLE contact_submissions
ADD COLUMN cargo TEXT,
ADD COLUMN project_types TEXT[],
ADD COLUMN presupuesto_estimado TEXT,
ADD COLUMN num_centros TEXT,
ADD COLUMN aperturas_previstas TEXT,
ADD COLUMN plazo_previsto TEXT;
