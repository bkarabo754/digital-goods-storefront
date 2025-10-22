import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/app/(bookstore)/components/theme-provider';
import { Toaster } from '@/app/(bookstore)/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Digital Bookstore - Your Digital Reading Collection',
  description:
    'Browse and purchase digital books from our curated collection. Find your next favorite read in EPUB, PDF, and MOBI formats.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
