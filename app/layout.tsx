import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ChatbotProvider } from '@/components/chatbot-provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ari - Modern Property Management System',
  description: 'Discover your dream property with Ari. Explore premium properties in prime locations. Modern living spaces designed for your lifestyle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${playfair.variable}`}>
        {children}
        <ChatbotProvider />
      </body>
    </html>
  );
}
