import AuthHeader from "@/components/AuthHeader";
import SignInForm from "@/components/SignInForm";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "TicketSpace | เข้าสู่ระบบ",
  description: "เข้าสู่ระบบเพื่อจัดการการจองสถานที่ของคุณกับ TicketSpace",
};

const SignInPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center size-full max-sm:px-6">
      <div className="flex w-full max-w-120 flex-col justify-center gap-4 py-5 md:gap-4 border p-8 rounded-xl shadow-xl">
        <AuthHeader />

        <Suspense fallback={<Loader2 className="size-3 animate-spin" />}>
          <SignInForm />
        </Suspense>
      </div>
    </section>
  );
};

export default SignInPage;
