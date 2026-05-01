import AuthSideImage from '../components/auth/AuthSideImage';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <AuthSideImage />

      <section className="relative flex min-h-screen items-center justify-center bg-white px-6">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />

        <div className="relative z-10 w-full max-w-[400px]">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
