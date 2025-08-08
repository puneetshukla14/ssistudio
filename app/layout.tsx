import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'SSI Studio',
  description: 'Protected admin layout',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
