# Replit में Environment Variables कैसे Add करें

## 🔑 Step by Step Guide - Hindi में

### आपको ये Environment Variables add करने हैं:

```
GMAIL_USER = princekumar5252@gmail.com
GMAIL_APP_PASSWORD = आपका 16-character app password
```

## Method 1: Replit Secrets (Recommended)

### Step 1: Secrets Panel खोलें
1. **Left sidebar** में **"Tools"** देखें
2. **"Secrets"** पर click करें (🔐 icon के साथ)
3. या फिर **Search bar** में "Secrets" type करें

### Step 2: पहला Variable Add करें
1. **"NAME_OF_VARIABLE"** field में type करें: `GMAIL_USER`
2. **"value"** field में type करें: `princekumar5252@gmail.com`
3. **"Add Environment Variable"** button पर click करें

### Step 3: दूसरा Variable Add करें
1. **"NAME_OF_VARIABLE"** field में type करें: `GMAIL_APP_PASSWORD`
2. **"value"** field में आपका Gmail App Password paste करें
3. **"Add Environment Variable"** button पर click करें

## Gmail App Password कैसे बनाएं:

### Step 1: Google Account में जाएं
1. **myaccount.google.com** खोलें
2. **Security** tab पर click करें

### Step 2: 2-Factor Authentication Enable करें
1. **2-Step Verification** पर click करें
2. अपना phone number verify करें
3. Setup complete करें

### Step 3: App Password Generate करें
1. **App passwords** section ढूंढें
2. **Select app**: "Mail" choose करें
3. **Select device**: "Other" choose करें
4. Name में "Portfolio Website" type करें
5. **Generate** button पर click करें
6. **16-character password** copy करें (जैसे: abcd efgh ijkl mnop)

## Method 2: .env File (Alternative)

अगर Secrets काम नहीं कर रहा तो:

### Step 1: .env File बनाएं
```bash
# Root directory में .env file बनाएं
GMAIL_USER=princekumar5252@gmail.com
GMAIL_APP_PASSWORD=your-16-char-password
```

### Step 2: .gitignore में Add करें
```
.env
node_modules/
```

## ✅ कैसे Check करें कि Variables Set हैं:

### Step 1: Console में Check करें
Terminal में ये command run करें:
```bash
echo $GMAIL_USER
echo $GMAIL_APP_PASSWORD
```

### Step 2: Code में Test करें
```javascript
console.log('Gmail User:', process.env.GMAIL_USER);
console.log('Password Set:', process.env.GMAIL_APP_PASSWORD ? 'Yes' : 'No');
```

## 🔧 Troubleshooting:

### अगर Variables Show नहीं हो रहे:
1. **Replit restart** करें
2. **Workflow restart** करें
3. **Page refresh** करें

### अगर Gmail App Password काम नहीं कर रहा:
1. **2-Factor Authentication** enable है?
2. **App Password** सही से copy किया है?
3. **Spaces** तो नहीं हैं password में?

## 📧 Test करने के लिए:

### Step 1: Variables Set करने के बाद
1. **Workflow restart** करें
2. **Contact form** test करें
3. **Console logs** check करें

### Step 2: Email Test भेजें
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "subject": "Testing Variables",
    "message": "Testing if environment variables are working."
  }'
```

## 🎯 Expected Result:

Variables set होने के बाद:
- ✅ Contact form से email send होगी
- ✅ Console में "Email sent successfully" message आएगा
- ✅ princekumar5252@gmail.com में professional email आएगी

## Screenshot Guide:

```
Replit Interface:
├── Left Sidebar
│   ├── Files 📁
│   ├── Tools 🔧
│   │   ├── Secrets 🔐  ← यहाँ click करें
│   │   ├── Database
│   │   └── ...
```

### Secrets Panel में:
```
🔐 Secrets
┌─────────────────────────────────┐
│ NAME_OF_VARIABLE                │
│ [GMAIL_USER                   ] │
│                                 │
│ value                           │
│ [princekumar5252@gmail.com    ] │
│                                 │
│ [Add Environment Variable]      │
└─────────────────────────────────┘
```

बस इतना करना है! Environment Variables set हो जाएं तो आपका contact form perfect काम करेगा।