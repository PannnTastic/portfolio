# 🔐 Setup Vercel Secrets untuk GitHub Actions

Panduan lengkap mendapatkan dan setup Vercel secrets.

## 📋 Prerequisites

- Project sudah deploy di Vercel
- Akses ke Vercel Dashboard
- Akses ke GitHub Repository Settings

---

## 🔑 Step 1: Get Vercel Token

### Via Vercel CLI:
```bash
# Login (kalau belum)
npx vercel login

# Buat token
npx vercel tokens create

# Masukkan nama token: github-actions
# Copy token yang muncul (contoh: abc123xyz789)
```

### Via Vercel Website:
1. Buka: https://vercel.com/account/tokens
2. Klik **"Create Token"**
3. Name: `github-actions`
4. Klik **"Create"**
5. **COPY TOKEN SEBELUM DITUTUP!**

> ⚠️ **WARNING**: Token hanya ditampilkan sekali!

---

## 📁 Step 2: Get Project Info

### Via CLI:
```bash
cd my-portfolio
cat .vercel/project.json
```

Output:
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxx"
}
```

### Via Vercel Dashboard:
1. Buka: https://vercel.com/dashboard
2. Klik project **my-portfolio**
3. Klik tab **Settings**
4. Scroll ke **General** → **Project ID** dan **Team ID**

---

## ⚙️ Step 3: Add Secrets ke GitHub

### Buka GitHub Repository Settings:

1. Buka: `https://github.com/PannnTastic/portfolio/settings/secrets/actions`
   
   Atau manual:
   - Buka repository GitHub
   - Klik **Settings** (tab)
   - Sidebar kiri: **Secrets and variables** → **Actions**

2. Klik tombol **"New repository secret"** (hijau)

3. Add 3 secrets satu per satu:

### Secret 1: VERCEL_TOKEN
```
Name: VERCEL_TOKEN
Secret: <token dari step 1>
```
Klik **Add secret**

### Secret 2: VERCEL_ORG_ID
```
Name: VERCEL_ORG_ID
Secret: <orgId dari step 2>
```
Klik **Add secret**

### Secret 3: VERCEL_PROJECT_ID
```
Name: VERCEL_PROJECT_ID
Secret: <projectId dari step 2>
```
Klik **Add secret**

---

## ✅ Step 4: Verify

Setelah semua secrets di-add, seharusnya muncul:

| Name | Updated |
|------|---------|
| VERCEL_ORG_ID | Just now |
| VERCEL_PROJECT_ID | Just now |
| VERCEL_TOKEN | Just now |

---

## 🧪 Step 5: Test Deployment

Trigger deployment dengan push ke main:

```bash
# Buat perubahan kecil
echo "// CI/CD Test" >> README.md

git add .
git commit -m "test: verify CI/CD pipeline"
git push origin main
```

Check GitHub Actions:
1. Buka: `https://github.com/PannnTastic/portfolio/actions`
2. Lihat workflow "CI/CD Pipeline" berjalan
3. Tunggu sampai ✅ hijau

---

## 🛠️ Troubleshooting

### Error: "No existing credentials found"
**Penyebab**: `VERCEL_TOKEN` belum di-set atau salah

**Fix**:
1. Pastikan token di-copy dengan benar
2. Cek apakah token expired: https://vercel.com/account/tokens
3. Buat token baru kalau perlu

### Error: "Project not found"
**Penyebab**: `VERCEL_PROJECT_ID` atau `VERCEL_ORG_ID` salah

**Fix**:
1. Cek ulang project.json: `cat .vercel/project.json`
2. Pastikan project sudah di-link: `npx vercel link`
3. Re-deploy manual: `npx vercel --prod`

### Error: "Unauthorized"
**Penyebab**: Token tidak punya akses ke project

**Fix**:
1. Pastikan token dibuat di account yang sama dengan project
2. Check project ownership di Vercel dashboard
3. Coba buat token baru dengan scope "Full Account"

---

## 📸 Screenshots Referensi

### Vercel Token Creation:
```
Vercel Dashboard → Account Settings → Tokens → Create Token
```

### GitHub Secrets Page:
```
Repository → Settings → Secrets and variables → Actions → New repository secret
```

### Expected Secrets List:
```
Repository secrets (3)
├── VERCEL_ORG_ID       team_xxxxxxxxxxx
├── VERCEL_PROJECT_ID   prj_xxxxxxxxxxx
└── VERCEL_TOKEN        abc123xyz789...
```

---

## 🎯 Quick Checklist

- [ ] Vercel Token created
- [ ] Token copied (hanya sekali!)
- [ ] Project ID dari .vercel/project.json
- [ ] Org ID dari .vercel/project.json
- [ ] 3 secrets added ke GitHub
- [ ] Test push ke main
- [ ] GitHub Actions sukses

---

## 🚀 Setelah Setup

Workflow akan otomatis:
1. ✅ Lint & type check
2. ✅ Build test
3. ✅ Deploy ke Vercel (Production)

**Selamat mencoba!** 🎉
