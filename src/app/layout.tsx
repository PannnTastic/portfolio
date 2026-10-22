import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Alfan — Software & Research', description: 'Ahmad Alfan Alfian Irfan. Software development, AI research, and selected work from Yogyakarta, Indonesia.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
