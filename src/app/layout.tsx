import type { Metadata } from "next"; import "./globals.css";
export const metadata: Metadata = { title:"Sub-ASMS | Quản lý tài sản", description:"Hệ thống quản lý linh kiện IT và văn phòng" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body>{children}</body></html>;}
