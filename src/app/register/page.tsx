import { RegisterForm } from "@/components/form/register-form";
import { Logo } from "@/components/logo";

export default function RegisterPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-10 w-auto text-2xl" withUrl={false} />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registro de usuario
          </h2>
        </div>

        <RegisterForm />
      </div>
    </>
  );
}
