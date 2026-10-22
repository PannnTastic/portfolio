# 🚀 CI/CD Setup Guide

Panduan lengkap setup CI/CD dengan GitHub Actions dan Vercel.

## 📋 Prerequisites

- Akun GitHub: https://github.com/signup
- Akun Vercel: https://vercel.com/signup
- Repository sudah di-commit secara lokal

## 🔧 Step 1: Create GitHub Repository

### Opsi A: Create via GitHub Website

1. Buka: https://github.com/new
2. **Repository name**: `portfolio`
3. **Description**: `Personal portfolio website with Next.js`
4. Pilih **Public** (agar CI/CD gratis)
5. Jangan centang "Add a README" (sudah ada)
6. Klik **Create repository**

### Opsi B: Create via GitHub CLI

```bash
# Install GitHub CLI jika belum ada
# https://cli.github.com/

# Login ke GitHub
gh auth login

# Create repository
gh repo create portfolio --public --source=. --remote=origin --push
```

## 🔧 Step 2: Push ke GitHub

Setelah repository dibuat, push code:

```bash
# Jika menggunakan opsi A (website)
git remote add origin https://github.com/PannnTastic/portfolio.git
git branch -M main
git push -u origin main
```

## 🔧 Step 3: Connect Vercel dengan GitHub

### Opsi 1: Via Vercel Dashboard (Recommended)

1. Buka: https://vercel.com/dashboard
2. Klik **Add New...** → **Project**
3. Pilih **Import Git Repository**
4. Cari dan pilih repository `portfolio`
5. Klik **Import**
6. Konfigurasi:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. Klik **Deploy**

Vercel akan otomatis:
- Deploy production dari branch `main`
- Buat preview deployment untuk setiap Pull Request

### Opsi 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project (pilih "Link to existing project")
vercel link

# Deploy production
vercel --prod
```

## 🔧 Step 4: Setup GitHub Secrets (Untuk CI/CD)

Agar GitHub Actions bisa deploy ke Vercel:

### 1. Dapatkan Vercel Token

```bash
vercel tokens create
# Copy token yang dihasilkan
```

Atau via website:
1. https://vercel.com/account/tokens
2. Klik **Create Token**
3. Copy token

### 2. Dapatkan Project Info

```bash
cat .vercel/project.json
```

Output:
```json
{
  "orgId": "your-org-id",
  "projectId": "your-project-id"
}
```

### 3. Add Secrets ke GitHub

1. Buka repository di GitHub
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Klik **New repository secret**
4. Add 3 secrets:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | Token dari step 1 |
| `VERCEL_ORG_ID` | orgId dari project.json |
| `VERCEL_PROJECT_ID` | projectId dari project.json |

## ✅ Verification

### Test CI/CD:

1. **Buat perubahan kecil**:
```bash
# Edit file apa saja, misalnya:
echo "// Test" >> src/lib/data.ts
git add .
git commit -m "test: CI/CD pipeline"
git push origin main
```

2. **Check GitHub Actions**:
   - Buka: `https://github.com/PannnTastic/portfolio/actions`
   - Lihat workflow berjalan

3. **Check Vercel**:
   - Buka: `https://vercel.com/dashboard`
   - Lihat deployment baru

## 📊 Workflow Overview

```
Push to main
    │
    ▼
GitHub Actions Triggered
    │
    ├─── Lint & Type Check
    │
    ├─── Build Test
    │
    └─── Deploy to Vercel (Production)
                │
                ▼
        🌐 Live Website Updated!
```

## 🔀 Pull Request Flow

```
Create PR
    │
    ▼
GitHub Actions
    │
    ├─── Lint & Type Check
    │
    ├─── Build Test
    │
    └─── Deploy Preview
                │
                ▼
        🔗 Preview URL Generated
                │
                ▼
        Merge PR
                │
                ▼
        Deploy to Production
```

## 🛠️ Troubleshooting

### Error: "Repository not found"
- Pastikan repository sudah dibuat di GitHub
- Check remote URL: `git remote -v`

### Error: "Permission denied"
- Pastikan sudah login: `gh auth login`
- Atau cek SSH key: `ssh -T git@github.com`

### Error: "Vercel token invalid"
- Buat token baru: https://vercel.com/account/tokens
- Update secret di GitHub

### Error: "Build failed"
- Check log di GitHub Actions
- Pastikan semua environment variables sudah di-set

## 📝 Catatan Penting

### Gratis Limits:
- **GitHub Actions**: 2000 menit/bulan (Free tier)
- **Vercel**: Unlimited deployments (Hobby tier)

### Best Practices:
1. Selalu buat PR untuk perubahan besar
2. Test preview deployment sebelum merge
3. Jangan commit file `.env`
4. Update README untuk dokumentasi

## 🎯 Next Steps

Setelah CI/CD berjalan:

1. ✅ **Custom Domain** (Opsional):
   - Beli domain (e.g., pannntastic.dev)
   - Setup di Vercel: Project → Domains

2. ✅ **Analytics**:
   - Enable Vercel Analytics
   - Atau tambah Google Analytics

3. ✅ **SEO**:
   - Update metadata di `layout.tsx`
   - Tambah sitemap.xml

4. ✅ **Monitoring**:
   - Setup Vercel Alerts
   - Monitor Core Web Vitals

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Selamat! Portfolio kamu sekarang auto-deploy!** 🚀
