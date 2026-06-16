import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = "https://fqnjwmuoaedurvmozfvc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmp3bXVvYWVkdXJ2bW96ZnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MzM2MzcsImV4cCI6MjA5NzEwOTYzN30.QOmXBGRHXh7Frhw4Bh6mlYVMjHynWPC4ouDW20HS5sA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    fs.writeFileSync('dummy.txt', 'hello world');
    const fileData = fs.readFileSync('dummy.txt');
    
    console.log("Attempting upload...");
    const { data, error } = await supabase.storage
      .from('cafes')
      .upload('test.txt', fileData, { upsert: true });

    if (error) {
      console.error("Upload Error:", error);
    } else {
      console.log("Upload Success:", data);
    }
  } catch (e) {
    console.error("Exception:", e);
  }
}

test();
