import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://xajqblsrovchobtvkzla.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhanFibHNyb3ZjaG9idHZremxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODkzMjYsImV4cCI6MjA4MDg2NTMyNn0.XJmVJJp1H9HAJpDlrHC1wkNXHvYTy9mIt8d09FJ1ZUc"
)