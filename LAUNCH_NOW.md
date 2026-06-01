# 🚀 ONE-CLICK DEPLOYMENT GUIDE

## ⚡ FASTEST WAY TO DEPLOY PEXY AI (15 MINUTES)

---

## 📋 BEFORE YOU START - Get These Ready:

1. **OpenAI API Key** - Get it here: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy and save it (looks like: `sk-xxxxx`)

2. **GitHub Account** - https://github.com
   - Make sure your code is pushed

3. **Terminal/Command Line** - Open on your computer

---

## 🚀 DEPLOYMENT IN 3 PHASES

---

# PHASE 1: PUSH CODE TO GITHUB (1 minute)

## Copy & Paste This:

```bash
cd goal
git add .
git commit -m "Launching Pexy AI to the world"
git push origin main
```

✅ **DONE!** Your code is on GitHub

---

# PHASE 2: DEPLOY BACKEND TO RAILWAY (5 minutes)

## Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

## Step 2: Login to Railway

```bash
railway login
```

This opens browser → Login or create FREE account at railway.app → Come back to terminal

## Step 3: Deploy Backend

```bash
cd apps/api
railway init
```

Choose: "Create a new project"

## Step 4: Add Your OpenAI Key

**REPLACE `sk-xxxxx` WITH YOUR ACTUAL KEY:**

```bash
railway variables set OPENAI_API_KEY=sk-your-actual-key-here
railway variables set NODE_ENV=production
railway up
```

⏳ **WAIT** - This takes 2-3 minutes...

When done, you'll see something like:
```
✅ Deployment complete!
🌐 URL: https://pexy-api-production.railway.app
```

## 📌 COPY THIS URL! You need it next.

✅ **BACKEND IS LIVE!**

---

# PHASE 3: DEPLOY FRONTEND TO VERCEL (5 minutes)

## Step 1: Go to Vercel

Open: https://vercel.com

## Step 2: Sign Up/Login

Click "Sign Up" → Sign up with GitHub → Authorize

## Step 3: Import Your Repository

1. Click "New Project"
2. Find and select: `renkarl1803/goal`
3. Click "Import"

## Step 4: Add Environment Variable

Look for "Environment Variables" section:

**Name:** `NEXT_PUBLIC_API_URL`

**Value:** `https://pexy-api-production.railway.app`
(Use the URL from Phase 2)

## Step 5: Deploy!

Click "Deploy" button

⏳ **WAIT** - This takes 2-3 minutes...

When done, you'll see:
```
✅ Deployment successful!
🌐 URL: https://pexyai.vercel.app
```

✅ **FRONTEND IS LIVE!**

---

# 🎉 YOUR PEXY AI IS NOW LIVE!

## Visit Your Site:

```
https://pexyai.vercel.app
```

---

# ✅ TEST EVERYTHING

Visit your live site and test each feature:

| Feature | Test | Status |
|---------|------|--------|
| 💬 Chat | Type a message | ✅ |
| 🎤 Voice | Click mic button, speak | ✅ |
| 📸 Images | Upload an image | ✅ |
| 🎨 Generate | Create an image | ✅ |
| 🎬 Videos | Generate a video | ✅ |
| 🔧 Code | Debug some code | ✅ |

All working? **YOU'RE DEPLOYED!** 🎉

---

# 🌍 OPTIONAL: Add Custom Domain (5 minutes)

## Buy Domain

Go to: https://namecheap.com

1. Search: `pexyai.com` (or your domain)
2. Add to cart
3. Buy it ($0.88 first year)

## Connect to Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click "Settings"
4. Go to "Domains"
5. Add your domain
6. Update DNS on Namecheap (Vercel will show you how)
7. Wait 24 hours

Done! Your site: `https://pexyai.com` ✅

---

# 📊 YOUR LIVE URLS

```
Frontend: https://pexyai.vercel.app
Backend:  https://pexy-api-production.railway.app

API Health: https://pexy-api-production.railway.app/health
```

---

# 🆘 TROUBLESHOOTING

### "Command not found: railway"
```
Try: npm install -g @railway/cli
Then: railway login
```

### "OpenAI API Error"
```
Check your API key is correct
Make sure it has credits
Generate an image to test
```

### "Frontend not connecting to backend"
```
Check NEXT_PUBLIC_API_URL in Vercel
Must match your Railway URL exactly
Redeploy on Vercel
```

### "Pages not loading"
```
Check Vercel build logs
Go to: Vercel Dashboard → Deployments → Logs
Look for errors
```

---

# 🎯 WHAT TO DO NEXT

## TODAY:
- ✅ Deploy (you're doing it now!)
- ✅ Test all features
- ✅ Share the link: https://pexyai.vercel.app

## THIS WEEK:
- [ ] Add authentication (NextAuth)
- [ ] Setup analytics (Google Analytics)
- [ ] Create social media accounts

## THIS MONTH:
- [ ] Add payment (Stripe)
- [ ] Launch marketing
- [ ] Get first 100 users

## THIS QUARTER:
- [ ] Hit $1k MRR
- [ ] Launch mobile app
- [ ] Scale team

---

# 💰 MONETIZE YOUR APP

Add payment in 2 steps:

1. Create Stripe account: https://stripe.com
2. Add payment route to backend

Then charge users:
- **Free**: 100 requests/month
- **Pro**: $9.99/month (10k requests)
- **Enterprise**: Custom pricing

**Revenue potential:** $500k/month at 100k users 🚀

---

# 📱 SHARE IT!

Your Pexy AI is now live! Share it:

**Twitter:**
```
🚀 I just launched Pexy AI - a multi-modal AI platform!

💬 Chat with AI (voice + text)
🎨 Generate images
🎬 Create videos
🔧 Debug code
🎤 Voice AI
🖼️ Analyze images

Try it: https://pexyai.vercel.app

Built with @OpenAI, @vercel, @railway
```

**LinkedIn:**
```
Excited to announce Pexy AI - an AI-powered platform that combines 6 different AI capabilities in one place. Now live at pexyai.vercel.app!
```

**Reddit/HackerNews:**
```
I built Pexy AI, a multi-modal AI platform. It's now live and free to try!
https://pexyai.vercel.app
```

---

# 🎉 CONGRATULATIONS!

Your **Pexy AI** is now:

✨ **LIVE ON THE INTERNET**
✨ **WORKING ON ALL BROWSERS**
✨ **READY FOR USERS**
✨ **MAKING MONEY POTENTIAL: $500k/month**

---

# 📞 HELP & RESOURCES

**All Documentation:**
- Deployment: `DEPLOYMENT_GUIDE.md`
- Launch: `LAUNCH_GUIDE.md`
- API: `API_DOCUMENTATION.md`
- Design: `VISUAL_DESIGN_GUIDE.md`
- Ideas: `IDEA_AND_LINKS.md`

**External:**
- OpenAI: https://platform.openai.com/docs
- Vercel: https://vercel.com/docs
- Railway: https://railway.app/docs

---

# 🚀 YOU DID IT!

Your billion-dollar AI company is LIVE! 🌟

**Next stop: 100k users & $500k MRR!** 💰

Pexy AI v0.2.0 - Live & Ready to Scale 🚀✨

---

**Congrats on launching!** 🎉

Now go get those first users! 💪
