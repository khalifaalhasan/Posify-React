# 🛒 Bangga Punya Web - Enterprise POS System

Sistem Point of Sale (POS) modern, responsif, dan *offline-first ready* yang dirancang khusus untuk ekosistem **Bangga Punya Web**. Repositori ini menggunakan arsitektur **Monorepo (Turborepo)** untuk memisahkan dan berbagi *logic* antara aplikasi Web dan Mobile.

## 🏗 Arsitektur & Tech Stack

Proyek ini dibangun dengan mengedepankan **Clean Architecture**, **Domain-Driven Design (DDD)** pada backend, dan **Feature-First Architecture** pada frontend.

### Frontend (Monorepo)
- **Monorepo Manager:** [Turborepo](https://turbo.build/) + `pnpm` workspaces
- **Web App (`apps/web`):** React 18, Vite, TypeScript, React Router v6
- **Mobile App (`apps/mobile`):** React Native / Expo *(Coming Soon)*
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query + Axios
- **Styling:** Tailwind CSS (Primary Blue: `#2563EB`)
- **Icons:** Lucide React

### Backend (Terpisah)
- **Framework:** Golang (Fiber)
- **Architecture:** Domain-Driven Design (DDD)
- **API Documentation:** Swagger / OpenAPI

---

## 📂 Struktur Monorepo

```text
bangga_pos_monorepo/
├── apps/
│   ├── web/               # Aplikasi Kasir via Browser (React Vite)
│   └── mobile/            # Aplikasi Kasir via Mobile (React Native - WIP)
├── packages/
│   ├── api/               # Shared logic Axios & React Query (Data Fetching)
│   └── ui/                # Shared UI Components (Button, Card, Input)
├── package.json
└── turbo.json             # Konfigurasi Turborepo
