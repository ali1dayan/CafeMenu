# ☕️ Restaurant & Cafe Menu Website

A modern and responsive **restaurant & cafe menu platform** built with **Next.js 14** and **Sanity CMS**.

> 🧠 Sanity is used as the **main back-end** and **dashboard CMS** for managing all menu items, categories, and product submissions.

This project provides both:

- A fully designed **public-facing menu website**, and
- A dynamic **admin dashboard**, allowing restaurant owners to manage products and categories directly from Sanity.

---

## 🚀 Technologies Used

- **[Next.js 14](https://nextjs.org/)** – React-based framework with App Router and Server Components
- **[Sanity.io](https://www.sanity.io/)** – Full-featured headless CMS used as the back-end and dashboard system
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS for clean, responsive UI
- **[React Query](https://tanstack.com/query/latest)** – Smart data fetching and client-side caching
- **[Axios](https://axios-http.com/)** – For HTTP requests to the Sanity API
- **[Lucide Icons](https://lucide.dev/)** – Open-source icons
- **TypeScript** – For robust, type-safe development
- **Server Actions + useActionState** – For form handling in the dashboard (category/product management)

---

## ✨ Features

### 🌐 Public Website

- Responsive and modern homepage
- Hero section with call-to-action
- "Special Offers" section filtered via `isSpecial: true`
- Full menu view with category-based layout

### 🛠️ Admin Dashboard (Powered by Sanity)

- Add/edit **products** and **categories**
- Upload product images
- Custom `addCategory` and `saveProduct` actions via **Sanity backend**
- Forms handled using Next.js **Server Actions**

---

## 📁 Project Structure

```
.
├── app
│   ├── page.tsx                # Homepage with hero and special items
│   ├── menu/page.tsx           # Full menu
│   └── dashboard               # Admin panel for categories and products
│       ├── categories/form     # Add category
│       ├── products/form       # Add product
│       └── _actions            # Server actions (addCategory, saveProduct)
├── components/ui               # Reusable UI components (Button, Card, etc.)
├── lib
│   ├── types.ts                # TypeScript interfaces (MenuItem, Category)
│   └── sanity.ts               # Sanity client configuration
├── public                      # Static assets & images
└── README.md
```

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ali1dayan/CafeMenu.git
cd CafeMenu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and set the following:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔧 Future Improvements

- [ ] Authentication for admin dashboard
- [ ] Ability to edit & delete products
- [ ] Menu search & filters
- [ ] Add to cart & checkout flow
- [ ] Image optimization with Sanity CDN

---

## 📦 Deployment

Deployed easily via [Vercel](https://vercel.com/) with zero configuration for Next.js apps.

---

## 🤝 Contributing

Pull requests and suggestions are welcome. Please open an issue or submit a PR if you'd like to contribute.

---

## 📄 License

Licensed under the **MIT License**.

---

## 💬 Contact

- GitHub: [@ali1dayan](https://github.com/ali1dayan)
- Email: thisisdayan@gmail.com
