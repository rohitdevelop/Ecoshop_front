// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'EcoShop',
  description: 'Eco-Friendly E-Commerce Website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
