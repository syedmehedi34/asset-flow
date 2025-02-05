# Asset Flow [Asset Management System (AMS)]

<img src="https://i.ibb.co.com/Mxkn3vRm/asset-flow.png" alt="AMS Screenshot" style="width: 100%; display: block; margin: 0 auto;">

## 📌 Overview

**Asset Flow** is a web-based platform designed to help businesses efficiently manage and track company assets. Developed by **Syed Mehedi Hasan**, AMS enables HR Managers to oversee both **returnable and non-returnable assets** assigned to employees.  

The system ensures seamless **asset distribution, maintenance, and retrieval**, helping companies **minimize asset loss and optimize resource utilization**. AMS operates as a **subscription-based** platform where companies can register, track their assets, and generate reports.

📌 **Live Demo:** [Asset Flow](https://asset-flow.netlify.app/)  
📄 **Project Requirements:** [Google Docs](https://docs.google.com/document/d/1lEOV-lqLKOEfGFN6QTJBAUCHxU5kpSw6TMDuDYiz9uc/edit?tab=t.0)  

## 📖 Table of Contents

- [Overview](#-overview)
- [Technologies Used](#-technologies-used)
- [Core Features](#-core-features)
- [Installation & Setup](#-installation--setup)
- [Dependencies](#-dependencies)
- [Live Demo & Resources](#-live-demo--resources)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Technologies Used

AMS is built using modern web technologies:

- **Frontend:** React, Vite, TailwindCSS, DaisyUI, MUI
- **State Management & Queries:** React Query
- **Authentication:** Firebase
- **Payment Integration:** Stripe
- **Database & Storage:** Firebase Firestore & Cloud Storage
- **PDF Generation:** React-PDF Renderer
- **Additional Libraries:** Axios, Recharts, SweetAlert2, React Router, and more.

## 🚀 Core Features

- **Asset Tracking:** Monitor both returnable and non-returnable assets.
- **User Management:** HR managers can assign assets to employees.
- **Subscription Model:** Businesses can subscribe to different plans.
- **Report Generation:** Generate PDF reports of asset distribution.
- **Payment Integration:** Secure payments via Stripe.
- **Authentication:** Firebase-based login & authorization.
- **Responsive UI:** Built with Material UI & TailwindCSS for a seamless experience.

## 🏗️ Installation & Setup

Follow these steps to set up AMS locally:

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repository/asset-management-system.git
cd asset-management-system
```





## 🏗️ Installation & Setup

Follow these steps to set up AMS locally:

### 2️⃣ Install Dependencies

Run the following command to install all required dependencies:

```sh
npm install
```








3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and add the following:

```plaintext
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_IMAGE_HOSTING_KEY=YOUR_IMAGE_HOSTING_KEY
VITE_Payment_Gateway_PK=YOUR_STRIPE_PUBLIC_KEY
```
Replace YOUR_FIREBASE_API_KEY, YOUR_STRIPE_PUBLIC_KEY, and other values with your actual credentials.



4️⃣ Start the Development Server
Run the following command to start the development server:
```sh
npm run dev
The app should now be running at http://localhost:5173/.
```





## 📦 Dependencies

Here are some of the major dependencies used in this project:

- **UI & Styling:** TailwindCSS, DaisyUI, MUI, Emotion
- **State Management:** React Query
- **Data Fetching:** Axios
- **Authentication & Backend:** Firebase
- **Payments:** Stripe
- **Icons & Animations:** React Icons, Lucide React, Lottie React
- **Utilities:** React Hook Form, Recharts, SweetAlert2

For a complete list, check [`package.json`](./package.json).




## 🌐 Live Demo & Resources

- **Live Project:** [Asset Flow](https://asset-flow.netlify.app/)
- **Project Requirements:** [Google Docs](https://docs.google.com/document/d/1lEOV-lqLKOEfGFN6QTJBAUCHxU5kpSw6TMDuDYiz9uc/edit?tab=t.0)
- **Backend API:** [API Docs](https://your-api-docs-url.com)
- **Design Mockups:** [Figma](https://your-figma-link.com)



## 🤝 Contributing

Contributions are welcome! If you’d like to contribute:

1. **Fork** the repository.
2. **Create** a new branch (`feature-xyz`).
3. **Commit** your changes.
4. **Push** to your branch and submit a **pull request**.

##
## Developed with ❤️ by Syed Mehedi Hasan.


