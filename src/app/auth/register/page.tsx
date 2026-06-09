"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    number: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <div className="grid min-h-screen lg:grid-cols-2">
        
        {/* LEFT SECTION */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 lg:flex">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10" />

          <div className="relative z-10 flex h-full flex-col justify-center px-16 text-white">
            <span className="mb-6 w-fit rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
              Resume Builder
            </span>

            <h1 className="max-w-xl text-6xl font-bold leading-tight">
              Create Job Winning Resumes
            </h1>

            <p className="mt-6 max-w-lg text-lg text-white/80">
              Build professional ATS-friendly resumes,
              download instantly and land your dream job.
            </p>

            
          </div>
        </section>

        {/* RIGHT SECTION */}
        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to continue building resumes.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className=""
            >

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="h-14 w-full px-5 rounded-2xl border border-slate-200 bg-white outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                  <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="number"
                  required
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Sign up
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm text-slate-500">
                OR
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button className="h-14 w-full rounded-2xl border border-slate-200 bg-white font-medium transition hover:bg-slate-50">
              Continue with Google
            </button>

            <p className="mt-8 text-center text-slate-600">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="font-semibold text-indigo-600"
              >
                login
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}