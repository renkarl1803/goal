# 🚀 Complete Deployment Guide for Pexy AI

## Phase 1: Prepare Your Code (2 minutes)

### Step 1: Push to GitHub
```bash
# Navigate to your project
cd goal

# Add all files
git add .

# Commit changes
git commit -m "Add voice and image features to Pexy AI"

# Push to GitHub
git push origin main
```

✅ Your code is now on GitHub!

---

## Phase 2: Deploy Backend (5 minutes)

### Option A: Railway (EASIEST - Recommended) ⭐

**1. Install Railway CLI**
```bash
npm install -g @railway/cli
```

**2. Login to Railway**
```bash
railway login
```
This opens your browser. Login with your account (or create free account at railway.app)

**3. Create New Project**
```bash
cd apps/api
railway init
```

**4. Add Environment Variables**
```bash
railway variables set OPENAI_API_KEY=sk-your-actual-key-here
railway variables set NODE_ENV=production
railway variables set PORT=3001
```

**5. Deploy**
```bash
railway up
```

**Done!** You'll get a URL like:
```
https://pexy-api-production.railway.app
```

✅ Save this URL! You'll need it for the frontend.

---

### Option B: Heroku (Alternative)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create pexy-api

# Add OpenAI key
heroku config:set OPENAI_API_KEY=sk-your-key

# Deploy
git push heroku main
```

You'll get a URL like:
```
https://pexy-api.herokuapp.com
```

---

### Option C: AWS (Professional)

```bash
# Create EC2 instance on AWS
# - Ubuntu 22.04
# - Open ports: 3001, 80, 443

# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone your repo
git clone https://github.com/yourusername/goal.git
cd goal/apps/api

# Setup environment
cp .env.example .env
nano .env  # Add your OPENAI_API_KEY

# Start server
npm install
npm run build
npm start
```

Your URL:
```
https://your-instance-ip:3001
```

---

## Phase 3: Deploy Frontend (5 minutes)

### Best Option: Vercel ⭐

**1. Go to Vercel**
- Visit https://vercel.com
- Click "Sign Up" (free account)
- Sign up with GitHub

**2. Import Your Repository**
- Click "New Project"
- Select your GitHub repo: `renkarl1803/goal`
- Click "Import"

**3. Configure Environment Variables**
- Look for "Environment Variables" section
- Add variable:
  ```
  NEXT_PUBLIC_API_URL=https://pexy-api-production.railway.app
  ```
  (Replace with your actual backend URL from Phase 2)

**4. Click Deploy**
- Vercel automatically deploys
- Wait 2-3 minutes

**Done!** Your frontend is live! 🎉

You'll get a URL like:
```
https://pexy-ai.vercel.app
```

---

### Alternative: Deploy Frontend Locally

If you want to keep it simple:

```bash
cd apps/web

# Build production version
npm run build

# Start production server
npm start
```

Frontend runs on: `http://localhost:3000`

---

## Phase 4: Test Your Deployment (3 minutes)

### Test Backend
```bash
curl https://pexy-api-production.railway.app/health
```

Should return: `OK` ✅

### Test Frontend
1. Go to: `https://pexy-ai.vercel.app`
2. Try each feature:
   - 💬 Chat with AI
   - 🎨 Generate image
   - 🎬 Create video
   - 🔧 Debug code
   - 🎤 Voice chat
   - 📸 Upload image

All working? ✅ You're deployed!

---

## Phase 5: Get Custom Domain (Optional - 5 minutes)

### Buy Domain

**Option 1: Namecheap** (Cheapest)
```
1. Go to https://namecheap.com
2. Search for domain: pexyai.com
3. Buy for $0.88 first year (usually ~$10/year after)
4. Complete purchase
```

**Option 2: GoDaddy**
```
1. Go to https://godaddy.com
2. Search domain
3. Buy it
```

### Connect Domain to Vercel

**1. Go to Vercel Project Settings**
- Visit https://vercel.com/dashboard
- Select your project
- Click "Settings"
- Go to "Domains"

**2. Add Domain**
- Click "Add"
- Enter your domain (e.g., pexyai.com)
- Click "Add Domain"

**3. Update DNS on Namecheap/GoDaddy**
- Vercel will show you DNS records
- Go to your domain registrar
- Update nameservers to Vercel's
- Wait 24 hours for DNS to propagate

**Done!** Your domain is live! 🎉

Now your site is at: `https://pexyai.com`

---

## Phase 6: Launch Day Checklist

✅ **Backend Deployed**
- [ ] Railway/Heroku/AWS running
- [ ] Environment variables set
- [ ] Health check passing

✅ **Frontend Deployed**
- [ ] Vercel live
- [ ] Environment variables set
- [ ] All pages loading

✅ **Domain Connected**
- [ ] Domain purchased
- [ ] DNS configured
- [ ] HTTPS working

✅ **Testing Complete**
- [ ] All 6 features working
- [ ] Chat with text works
- [ ] Voice chat works
- [ ] Image upload works
- [ ] Image generation works
- [ ] Code tools work
- [ ] Video generation works

✅ **Launch**
- [ ] Share on Twitter/LinkedIn
- [ ] Post on Product Hunt
- [ ] Email friends
- [ ] Tell family

---

## 🎯 Quick Reference URLs

After deployment:

```
Frontend: https://pexyai.vercel.app
Backend:  https://pexy-api-production.railway.app

Or with custom domain:

Frontend: https://pexyai.com
Backend:  https://api.pexyai.com (if configured)
```

---

## 📊 Complete Deployment Timeline

| Step | Time | Status |
|------|------|--------|
| Prepare code | 2 min | ✅ |
| Deploy backend | 5 min | 🚀 |
| Deploy frontend | 5 min | 🚀 |
| Test everything | 3 min | ✅ |
| Buy domain | 5 min | Optional |
| Connect domain | 2 min | Optional |
| **TOTAL** | **22 min** | ✅ |

---

## 🆘 Troubleshooting

### "Backend not connecting"
```
Check NEXT_PUBLIC_API_URL in Vercel matches your Railway URL
Go to Vercel Dashboard → Settings → Environment Variables
Update the URL
Redeploy
```

### "OpenAI API Error"
```
Check OPENAI_API_KEY is set correctly in Railway
Make sure key has credits
Try generating an image to test
```

### "Pages not loading"
```
Check Vercel build logs
Go to Vercel Dashboard → Deployments
Click "View Logs"
Look for errors
```

### "Domain not working"
```
DNS can take 24-48 hours to propagate
Try clearing browser cache
Check nameservers are correct
Wait and retry
```

---

## 📱 Post-Deployment

### Monitor Your App
- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard

### View Logs
```bash
# Railway logs
railway logs

# Vercel logs
# View in dashboard → Deployments → Logs
```

### Update Code
```bash
# Make changes locally
git add .
git commit -m "Fix bug"
git push origin main

# Auto-deploys to Vercel!
# For Railway, run: railway up
```

---

## 🎉 SUCCESS!

Your Pexy AI is now:

✅ **Live on the internet**
✅ **Available worldwide**
✅ **Working on all browsers**
✅ **Ready for users**
✅ **Making money** (add payment next!)

---

## 💰 Next Steps

1. **Add Authentication** (Users login)
2. **Add Payment** (Stripe integration)
3. **Add Analytics** (Google Analytics)
4. **Promote** (Twitter, Product Hunt)
5. **Get Users** (Growth hacking)
6. **Make Money** (Subscription model)

---

## 🚀 Summary

**To Deploy Pexy AI:**

1. Push code to GitHub ✅
2. Deploy backend to Railway (5 min)
3. Deploy frontend to Vercel (5 min)
4. Test everything ✅
5. Optional: Buy domain + connect
6. Launch! 🎉

**Total Time: 15-20 minutes**

---

**Your Pexy AI is NOW LIVE!** 🌟

Share it with the world! 🚀

---

**Pexy AI v0.2.0 - Deployed & Live** ✨
