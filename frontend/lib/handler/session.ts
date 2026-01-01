/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getSession(cookieStore: any): Promise<User | null> {
  try {
    const token = cookieStore.get("accessToken");
    console.log("Token found in Next.js Server Side:", token);

    const allCookies = cookieStore
      .getAll()
      .map((c: any) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-user`,
      {
        headers: {
          Cookie: allCookies,
          "Content-Type": "application/json",
        },
        // สำคัญ: บน Server Component ไม่ต้องใช้ credentials: "include"
        // เพราะเราส่ง Header Cookie ไปเองแล้ว
        cache: "no-store", // ป้องกันการจำค่า Unauthorized เดิม
      }
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}
