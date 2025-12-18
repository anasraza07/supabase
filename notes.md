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
realtime in supabase = iske liye sbse pehle ham us table ke liye enable realtime krte hain aur phr eik channel banaate hain code mein jahan ham apne msgs broadcast krwayenge
aur phr us channel mein event save krwaate hain eik callback func ke sth jis mein wo code hota hai jo ham execute krwaane chahte hain us event ke hone pr
us change ki information hamein payload mein milti hai in callback parameter

