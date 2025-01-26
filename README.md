# Project Name : _AssetFlow - A Asset Management website_

## Project Requirements : https://docs.google.com/document/d/1lEOV-lqLKOEfGFN6QTJBAUCHxU5kpSw6TMDuDYiz9uc/edit?tab=t.0

## Live Link - https://asset-flow.netlify.app/

## Overview

**Asset Management System (AMS)** is a web application developed by **Syed Mehedi Hasan** that aims to streamline the management and tracking of company assets. Designed specifically for businesses of all sizes, AMS enables **HR Managers** to efficiently manage both **returnable** and **non-returnable** assets issued to employees. This system is a subscription-based platform where companies can register, track assets, and generate reports to ensure that assets are appropriately distributed, maintained, and returned.

## Features

### 1. **User Registration & Authentication**

- **Company Registration**: Each company can register and create an account.
- **Admin Login**: The system allows HR managers to log in securely and manage their assets.
- **Employee Authentication**: Employees can log in to request or return assets and view their allocated resources.

### 2. **Asset Categorization**

- **Returnable Assets**: Items such as laptops, cell phones, desks, chairs, keyboards, etc., that need to be returned to the company at the end of employment.
- **Non-returnable Assets**: Consumables like pens, paper, diaries, and other office supplies.

### 3. **Asset Allocation**

- HR managers can assign assets to employees.
- Employees can view their allocated assets.
- Record the date when the asset was issued and the expected return date (for returnable assets).
- Notification reminders for returnable assets approaching the return date.

### 4. **Asset Tracking & Status Updates**

- Track the status of each asset (issued, returned, damaged, or pending).
- Real-time updates of asset status for HR managers.
- Option to update asset status and history.

### 5. **Subscription Management**

- Businesses can subscribe to different plans based on the number of employees or assets.
- Manage subscription renewals and cancellations.
- Admin can view invoices and payment history.

### 6. **Reporting and Analytics**

- Generate detailed reports for asset usage.
- Insights into assets usage trends, return rates, and employee allocations.
- Export reports as PDFs or CSV for record-keeping.

### 7. **Notifications & Alerts**

- Email or in-app notifications for asset return deadlines.
- Alerts for overdue returnable assets or damaged items.
- Notification system for HR managers about any updates regarding assets.

### 8. **Admin Dashboard**

- Overview of all assets, employees, and their status.
- Manage users, assets, and subscription plans.
- View usage statistics and generate reports.

### 9. **Employee Dashboard**

- View and manage the assets assigned to them.
- Request new assets or return existing ones.
- Track the status of their assets and receive notifications.

## Technology Stack

The Asset Management System is built using the **MERN stack**:

- **MongoDB**: NoSQL database for storing asset and user data.
- **Express.js**: Web framework for building the backend API.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for running the backend services.

### Additional Technologies

- **JWT Authentication**: Secure user login and access control.
- **Cloud Storage**: For storing documents and reports.
- **Stripe**: Payment gateway for handling subscriptions.
- **Email Services**: For sending notifications and reminders to users.

## Target Audience

- **HR Managers**: Who need an efficient way to allocate and track assets across multiple employees.
- **Employees**: Who will use the platform to request and return assets.
- **Business Owners**: Who need insights into asset management across their organization.

## Benefits

- **Easy Asset Tracking**: Provides a simple yet effective way to track both returnable and non-returnable assets.
- **Improved Efficiency**: Streamlines HR operations by automating asset allocation and return processes.
- **Cost Management**: Helps businesses manage and monitor the usage of office supplies and returnable items, reducing losses and damages.
- **Subscription Model**: Businesses can scale the software based on their size and needs with flexible subscription options.

## Technologies Used:

- **React**: Building the user interface with reusable components.
- **Tailwind CSS & DaisyUI**: Styling the website with a modern, responsive design and pre-styled components.
- **React Router**: Enabling seamless navigation across different pages.
- **React Awesome Components**: Adding interactive UI elements for an engaging user experience.
- **React Icons**: Enhancing visuals with a variety of scalable icons.
- **Context API**: Managing global state efficiently across the application.
- **Firebase Authentication**: Used firebase authentication for register and login. Used firebase google authentication also.
- **MongoDB**: MongoDB as the database to store review data and other informations.
- **React Icons**: To add scalable vector icons to the user interface.
- **React Toastify**: For displaying toast notifications (e.g., for subscription confirmations).
- **React Sweet Alert**: For creating alert pop-ups with customizable styles and messages.
- **Axios**: For making HTTP requests to fetch and submit data from the server.
- **Framer Motion**: For adding animations to elements on the home page.
- **JWT Authentication**: Secure access control for private routes.
- **Framer Motion**: Adding animations and transitions to various components for a smooth and visually appealing user experience.
- **Stripe Payment Gateway**: Integrating a secure and reliable payment method for subscriptions or transactions.
- **React Helmet**: Managing the document head, including dynamic updates for page titles and metadata for better SEO.
- **React Tooltip**: Displaying informative tooltips to improve user understanding and enhance the interface.
- **TanStack Query (React Query)**: Managing server state efficiently with powerful features like caching, synchronizing, and background updates.

## React Fundamental and Advanced Concepts Used

1.  **JSX (JavaScript XML)**: Enables writing HTML-like syntax directly within JavaScript, making the UI more readable and declarative.

2.  **Conditional Rendering**: Dynamically displays components based on specific conditions, such as displaying loading indicators or product details based on availability.
3.  **Lists and Keys**: Efficiently renders lists of items (like products) with unique keys for optimised rendering and identification.
4.  **Context API**: Provides a way to share global state across multiple components, avoiding prop drilling (useful for shared data like user authentication and cart data).
5.  **React Router**:

    - **useLocation**: Retrieves the current location object, helpful for conditional rendering based on the current route or page.
    - **useNavigate**: Allows programmatic navigation between pages (e.g., redirecting to the checkout page after adding items to the cart).
    - **useLoaderData** (if using React Router v6): Fetches data for a particular route before rendering, ensuring that essential data is loaded ahead of time.

6.  **Lifecycle Methods with Hooks**: Utilize `useEffect` to handle side effects such as data fetching, updating the DOM, or subscribing to external events.
7.  **Axios**: A promise-based HTTP client used for making API requests to interact with the server and fetch or send data. Axios is used for getting blog data, posting user comments, and handling authentication-related requests. It simplifies the process of handling HTTP requests and responses, making it more efficient and scalable.
8.  **Stripe Payment Gateway**: Integrated for secure and seamless online payment processing. Used to handle subscriptions, product purchases, and payment confirmation with real-time feedback.
9.  **Custom Hooks**: Developed reusable hooks to simplify and encapsulate logic for tasks like API calls, authentication status, and form validation.
10. **Form Handling with Validation**: Built interactive forms using React's controlled components to manage inputs, with real-time validation for user convenience.
11. **Error Handling**: Implemented global error handling for API requests and route transitions, providing meaningful feedback via alerts or toast notifications.
12. **Optimized Rendering**: Used memoization (`React.memo` and `useCallback`) to optimize performance by preventing unnecessary renders of components.

### Data Handling and Management

1.  **Context API**: Manages global state for data like user authentication and shopping cart, accessible across components.
2.  **Local Storage**: Local storage used for locally store some users information for the best user experience.

## NPM Packages Used

Here’s the complete list of **NPM packages** used in your project, categorized for clarity:

### **Core Dependencies**

- **react**: Core React library for building user interfaces.
- **react-dom**: Allows React to interact with the DOM.
- **react-router-dom**: Routing for navigation between pages.

### **Styling and UI Components**

- **daisyui**: Tailwind CSS-based UI components for faster development.
- **@mui/material**: Material-UI library for pre-built UI components.
- **@emotion/react** and **@emotion/styled**: For adding custom CSS-in-JS styling to Material-UI components.
- **@material-tailwind/react**: Tailwind CSS-based Material Design components.
- **lucide-react**: Icon library for lightweight and customizable icons.
- **react-icons**: Icon package providing a variety of icon libraries.
- **@heroicons/react**: A set of beautiful icons for React projects.

### **Animations and Effects**

- **framer-motion**: Powerful animation library for transitions and interactions.
- **lottie-react**: For rendering Lottie animations seamlessly.
- **react-parallax**: Adds parallax effects to components.

### **Forms and Validation**

- **react-hook-form**: Lightweight library for managing forms and validations.
- **react-google-recaptcha**: Adds Google reCAPTCHA for bot protection.
- **react-simple-captcha**: Easy-to-use text captcha for forms.

### **Data Handling**

- **axios**: HTTP client for API requests.
- **@tanstack/react-query**: Data fetching and state management for APIs.
- **firebase**: Backend-as-a-service for authentication and data storage.
- **localforage**: Local storage library for caching data offline.

### **Date, Time, and Calendar**

- **react-datepicker**: For implementing date pickers in forms.
- **react-moment**: For formatting and displaying dates and times.

### **Charts and Visualizations**

- **recharts**: Charting library for creating responsive data visualizations.

### **Payment Integration**

- **@stripe/react-stripe-js** and **@stripe/stripe-js**: Stripe library for secure payment integration.

### **Utilities**

- **sweetalert2**: For customizable alert popups.
- **react-toastify**: For toast notifications.
- **react-tabs**: Simple tab navigation components.
- **react-modal**: Easily customizable modal dialogs.
- **react-responsive-carousel**: Responsive carousel slider.
- **match-sorter**: Utility for filtering and ranking data.
- **sort-by**: Utility to sort arrays based on properties.

### **Advanced Features**

- **@react-pdf/renderer**: Allows generating PDF documents dynamically.
- **@smastrom/react-rating**: Provides rating components (e.g., star ratings).

### **Development Dependencies**

- **vite**: Development server and build tool for React projects.
- **@vitejs/plugin-react**: Vite plugin for React support.
- **eslint**, **eslint-plugin-react**, **eslint-plugin-react-hooks**, **eslint-plugin-react-refresh**: Tools for maintaining code quality and enforcing React-specific best practices.
- **tailwindcss**: Utility-first CSS framework for designing responsive layouts.
- **postcss** and **autoprefixer**: Tools for processing and optimizing CSS.
- **@types/react** and **@types/react-dom**: TypeScript types for React.

## Contributor

- **Name** - Syed Meehdi Hasan
- **Email** - syedmehedi34@gmail.com
