"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CancelBookingProps {
  bookingId: string;
}

const CancelBooking = ({ bookingId }: CancelBookingProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteBooking = async () => {
    setIsLoading(true);
    try {
      const res = (await api.booking.cancelBooking(
        bookingId
      )) as ActionResponse;

      if (res.success) {
        toast("Success", { description: "ยกเลิกการจองสำเร็จ" });

        router.refresh();
        return;
      }

      throw new Error(
        res.error?.message || "มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่ภายหลัง"
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast("เกิดข้อผิดพลาด", {
        description:
          error?.message || "ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองใหม่ภายหลัง",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="p-ภ bg-red-400 hover:bg-red-500 text-white rounded-lg text-md font-bold"
      onClick={handleDeleteBooking}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : "ยกเลิกการจอง"}
    </Button>
  );
};

export default CancelBooking;
