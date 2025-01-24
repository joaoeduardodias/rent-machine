export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-yellow-50 flex items-center justify-center">
      {children}
    </main>
  );
}
