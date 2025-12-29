import AuthHeader from "@/components/AuthHeader";
import SignUpForm from "@/components/SignUpForm";

const SignUpPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center size-full max-sm:px-6">
      <div className="flex w-full max-w-120 flex-col justify-center gap-4 py-5 md:gap-4 border p-8 rounded-xl shadow-xl">
        <AuthHeader />

        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPage;
