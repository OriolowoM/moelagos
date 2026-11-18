# Lagos State Ministry of the Environment and Water Resources (MOE&WR)

Official web portal for the Lagos State Ministry of the Environment and Water Resources (MOE&WR), built with **React 19**, **Vite**, and **Tailwind CSS** with a lightweight **PHP PDO MySQL** backend and automated CI/CD deployment to **cPanel**.

---

## 🌟 Architecture & Tech Stack

- **Frontend:** React 19, React Router v7, Lucide Icons, Tailwind CSS, Vite 8.
- **Backend API:** Native PHP PDO endpoints with UTF-8 JSON output (`/api/complaints.php`, `/api/posts.php`, etc.).
- **Database:** MySQL relational schema (`/database/moelagos_database.sql`).
- **Server Routing:** Apache `.htaccess` with HTTPS enforcement and Single Page Application rewrite rules.
- **CI/CD Pipeline:** GitHub Actions automated build runner with FTPS incremental delta sync to cPanel hosting.
- **Gatekeeper:** GitHub Environment Manual Approval required prior to production deployment.

---

## 🚀 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The local portal runs at `http://localhost:3002`.

3. **Compile production build:**
   ```bash
   npm run build
   ```

---

## 🔄 Automated Deployment Workflow

1. Make changes locally and test at `http://localhost:3002`.
2. Commit and push changes:
   ```bash
   git add .
   git commit -m "feat: description of update"
   git push origin main
   ```
3. GitHub Actions triggers the `Build Frontend & Backend Package` job on a cloud Ubuntu runner.
4. When the build passes, GitHub Actions halts at the **Manual Approval Gate** (`production` environment).
5. The designated administrator clicks **"Review deployments" -> "Approve and deploy"**.
6. GitHub Actions incrementally synchronizes only modified files directly to cPanel via encrypted FTPS.

---

## 🏛️ Key Directives & Compliance

- **Complaints Intake:** Automated dispatch notifications are routed to:
  - `lagosstateministryoftheenviron@gmail.com`
  - `env.wr@lagosstate.gov.ng`
- **Media Preservation:** Server-side `/uploads/` directory is preserved with `dangerous-clean-slate: false`.
- **Credential Protection:** Server hostnames, usernames, and passwords reside exclusively within encrypted GitHub Secrets (`CPANEL_*`).
