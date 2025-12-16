`npm install @supabase/supabase-js` command to install supabase  
Ab eik file banaalo root folder mein `supabase-client.ts/js` naam se  
Iske baad ye code likho: 
```
import { createClient } from "@supabase/supabase-js"
export const supabase = createClient(
  "https://supabaseProjectUrl",
  "supabaseAPIKey"
)
```
