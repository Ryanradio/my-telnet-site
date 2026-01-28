# TERMINAL UNLOCK - SETUP INSTRUCTIONS

## 🎮 What This Does:
The SYSOP panel now has a QR code that unlocks a full terminal overlay on your PC when scanned with a phone!

## 📋 Supabase Setup (Required):

You need to create ONE new table in your Supabase database:

### Table: `terminal_unlock`

**Columns:**
- `id` (int8, primary key, auto-increment)
- `session_id` (text, not null)
- `unlocked` (boolean, default: false)
- `unlocked_at` (timestamptz, nullable)
- `created_at` (timestamptz, default: now())

**Row Level Security (RLS):**
1. Enable RLS on the table
2. Create policy for SELECT: "Allow public read"
   - Target roles: `public`
   - Using: `true`
3. Create policy for INSERT: "Allow public insert"
   - Target roles: `public`
   - With check: `true`

### SQL to Create Table:
```sql
CREATE TABLE terminal_unlock (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  unlocked BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE terminal_unlock ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read" ON terminal_unlock
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public insert" ON terminal_unlock
  FOR INSERT TO public
  WITH CHECK (true);
```

## 📁 Files to Upload:

1. **index.html** - Your main site (updated with terminal feature)
2. **unlock.html** - The unlock page (must be in same directory as index.html)

## 🎯 How to Use:

1. Visit your site
2. Type **"SYSOP"** anywhere to open admin panel
3. Scroll to **"REMOTE TERMINAL ACCESS"** section
4. Scan the QR code with your phone
5. Phone shows "✓ Terminal Unlocked!"
6. **PC screen shows full terminal overlay!**
7. Type **/help** in terminal to see all commands

## 💚 Available Terminal Commands:

### Navigation:
- `/? or /help` - Show help
- `/clear` - Clear screen
- `/exit` - Close terminal

### Effects:
- `/matrix` - Toggle matrix rain
- `/hack` - Hacker mode
- `/color [scheme]` - Change colors (green/amber/blue/red/white)
- `/stars` - Toggle stars
- `/scanlines` - Toggle CRT effect

### Info:
- `/whoami` - User info
- `/time` - Current time
- `/uptime` - System uptime
- `/users` - Who's online
- `/stats` - System stats

### Fun:
- `/broadcast [msg]` - Send message
- `/door [game]` - Show door game
- `/ascii` - Random game art
- `/chat` - BBS chat
- `/mail` - Check mail
- `/konami` - Trigger Konami code
- `/reboot` - Reboot system
- `/credits` - Show credits

## 🔧 Troubleshooting:

**QR code not generating?**
- Make sure you're opening the SYSOP panel (type "SYSOP")
- The QR is a simple visual pattern - it won't scan to a real URL unless you're hosting the site

**Terminal not unlocking?**
- Check that the `terminal_unlock` table exists in Supabase
- Verify RLS policies are set correctly
- Make sure `unlock.html` is uploaded to your server

**For testing without phone:**
- You can manually activate the terminal by opening browser console (F12) and typing:
  ```javascript
  activateTerminal()
  ```

## 🚀 That's It!

You now have a SECRET TERMINAL that's unlocked by scanning a QR code! This is the ultimate BBS easter egg! 🎮✨
