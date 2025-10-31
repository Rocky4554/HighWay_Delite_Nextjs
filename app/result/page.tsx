// import Link from "next/link";
// import { Check, X } from "lucide-react";

// export const dynamic = "force-dynamic";

// interface OrderConfirmedProps {
//   searchParams: { [key: string]: string | undefined };
// }

// export default function OrderConfirmed({ searchParams }: OrderConfirmedProps) {
//   const success = searchParams.success === "1";
//   const id = searchParams.id || "HUF56&SO";

//   return (
//     <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4">
//       <div className="bg-white px-8 py-10 rounded-[12px] shadow-sm text-center w-full max-w-sm">
//         {success ? (
//           <>
//             <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-5">
//               <Check className="text-white w-8 h-8" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Booking Confirmed
//             </h2>
//             <p className="text-sm text-gray-500 mt-2">
//               Ref ID: <span className="font-medium">{id}</span>
//             </p>
//           </>
//         ) : (
//           <>
//             <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-5">
//               <X className="text-white w-8 h-8" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Booking Failed
//             </h2>
//             <p className="text-sm text-gray-500 mt-2">
//               Something went wrong. Please try again.
//             </p>
//           </>
//         )}

//         <Link
//           href="/"
//           className="mt-6 inline-block bg-[#EDEDED] text-gray-800 text-sm font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// }


import Link from "next/link";
import { Check, X } from "lucide-react";

export const dynamic = "force-dynamic";

interface OrderConfirmedProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function OrderConfirmed({ searchParams }: OrderConfirmedProps) {
  const params = await searchParams;
  const success = params.success === "1";
  const id = params.id || "HUF56&SO";

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4">
      <div className="bg-white px-8 py-10 rounded-[12px] shadow-sm text-center w-full max-w-sm">
        {success ? (
          <>
            <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-5">
              <Check className="text-white w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Booking Confirmed
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Ref ID: <span className="font-medium">{id}</span>
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-5">
              <X className="text-white w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Booking Failed
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Something went wrong. Please try again.
            </p>
          </>
        )}

        <Link
          href="/"
          className="mt-6 inline-block bg-[#EDEDED] text-gray-800 text-sm font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
