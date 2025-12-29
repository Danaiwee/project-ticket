import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const AuthHeader = () => {
  return (
    <Link href={ROUTES.HOME} className="flex items-center gap-1">
      <Image src="/icons/logo.png" alt="Logo icon" width={60} height={60} />
      <div className="flex">
        <h1 className="font-roboto text-2xl sm:text-3xl font-bold text-gray-900">
          Ticket
        </h1>
        <h1 className="font-roboto text-2xl sm:text-3xl font-bold text-sky-500">
          Space
        </h1>
      </div>
    </Link>
  );
};

export default AuthHeader;
