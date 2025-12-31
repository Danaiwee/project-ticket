import DataRenderer from "@/components/DataRenderer";
import HeaderBox from "@/components/HeaderBox";
import LocalSearchbar from "@/components/LocalSearchbar";
import LocationCard from "@/components/LocationCard";
import Pagination from "@/components/Pagination";
import { DEFAULT_EMPTY } from "@/constants/empty";
import { ROUTES } from "@/constants/routes";
import { api } from "@/lib/api";
import { getSession } from "@/lib/handler/session";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TicketSpace | Admin",
  description:
    "ดูรายการและจัดการการจองสถานทีท่องเที่ยวทั้งหมด",
};

const AdminPage = async ({ searchParams }: RouteParams) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { page, pageSize, query } = await searchParams;

  const authUser = await getSession(cookieHeader);
  if (!authUser) redirect(ROUTES.SIGN_IN);

  const isAdmin = authUser.role === "ADMIN";
  if (!isAdmin) redirect(ROUTES.HOME);

  const { success, data, error } = (await api.locations.getAll({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  })) as ActionResponse<PaginatedLocations>;
  const { locations, isNext } = data || {};

  return (
    <section className="w-full mx-auto max-w-7xl">
      <div className="flex h-full w-full flex-col gap-8 mt-14 font-kanit">
        <HeaderBox
          title="ยินดีต้อนรับ Admin"
          subtext="จัดการและดูรายละเอียดการจองทั้งหมด"
        />

        <div className="w-full max-w-4xl">
          <LocalSearchbar
            route={ROUTES.DASHBOARD}
            placeholder="ค้นหาชื่อสถานที่"
          />
        </div>

        <div className="mt-10 -space-y-4">
          <h1 className="font-kanit text-gray-500 text-2xl">
            สถานที่ท่องเที่ยวทั้งหมด
          </h1>

          <DataRenderer
            success={success}
            data={locations}
            empty={DEFAULT_EMPTY}
            error={error}
            render={(locations) => (
              <div className="mt-12 flex flex-wrap gap-5">
                {locations.map((location: LocationData) => (
                  <LocationCard key={location.id} location={location} isAdmin />
                ))}
              </div>
            )}
          />
        </div>

        <Pagination isNext={isNext || false} page={Number(page) || 1} />
      </div>
    </section>
  );
};

export default AdminPage;
