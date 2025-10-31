// // app/experience/[id]/ExperienceClient.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Experience as ExperienceType } from '@/lib/types';

// interface Props {
//   experience: ExperienceType;
//   initialDate: string | null;
// }

// export default function ExperienceClient({ experience, initialDate }: Props) {
//   const dates = [...new Set(experience.slots.map(s => s.date))];
//   const [selectedDate, setSelectedDate] = useState(initialDate || dates[0]);
//   const [selectedTime, setSelectedTime] = useState('');

//   useEffect(() => {
//     // Sync hidden input
//     const hiddenTime = document.getElementById('hidden-time') as HTMLInputElement;
//     if (hiddenTime) hiddenTime.value = selectedTime;
//   }, [selectedTime]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <form action="/checkout" method="get">
//         <input type="hidden" name="id" value={experience._id} />
//         <input type="hidden" name="title" value={experience.title} />
//         <input type="hidden" name="price" value={experience.price} />
//         <input type="hidden" id="hidden-time" name="time" value={selectedTime} />

//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
//           <div className="relative h-96 rounded-lg overflow-hidden">
//             <Image src={experience.image} alt={experience.title} fill className="object-cover" />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold">{experience.title}</h1>
//             <p className="text-gray-600 mt-2">{experience.description}</p>

//             {/* Choose Date */}
//             <div className="mt-6">
//               <h3 className="font-semibold">Choose date</h3>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {dates.map(date => (
//                   <label key={date} className="cursor-pointer">
//                     <input
//                       type="radio"
//                       name="date"
//                       value={date}
//                       checked={selectedDate === date}
//                       onChange={() => {
//                         setSelectedDate(date);
//                         setSelectedTime(''); // Reset time
//                       }}
//                       className="peer sr-only"
//                       required
//                     />
//                     <span
//                       className={`inline-block px-4 py-2 rounded-full border peer-checked:bg-yellow-400 peer-checked:text-black peer-checked:border-yellow-400 border-gray-300`}
//                     >
//                       {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Choose Time */}
//             <div className="mt-6">
//               <h3 className="font-semibold">Choose time</h3>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {experience.slots
//                   .filter(s => s.date === selectedDate)
//                   .map(slot => (
//                     <label key={slot.time} className="cursor-pointer">
//                       <input
//                         type="radio"
//                         name="time-radio"
//                         value={slot.time}
//                         checked={selectedTime === slot.time}
//                         onChange={() => setSelectedTime(slot.time)}
//                         disabled={slot.soldOut}
//                         className="peer sr-only"
//                         required={!slot.soldOut}
//                       />
//                       <span
//                         className={`inline-block px-4 py-2 rounded-full border peer-checked:bg-yellow-400 peer-checked:text-black peer-checked:border-yellow-400 ${
//                           slot.soldOut
//                             ? 'bg-gray-200 text-gray-500 border-gray-300'
//                             : 'border-gray-300'
//                         }`}
//                       >
//                         {slot.time} {slot.soldOut ? 'Sold out' : `${slot.available} left`}
//                       </span>
//                     </label>
//                   ))}
//               </div>
//             </div>

//             {/* Price & Confirm */}
//             <div className="mt-8 bg-white p-4 rounded-lg">
//               <div className="flex justify-between">
//                 <span>Starts at</span>
//                 <span className="font-bold">₹{experience.price}</span>
//               </div>
//               <button
//                 type="submit"
//                 disabled={!selectedTime}
//                 className="mt-4 w-full bg-yellow-400 text-black py-3 rounded-full font-medium disabled:opacity-50"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Experience as ExperienceType } from "../../../lib/type";
import DateTimeSelector from "@/components/DateTimeSelector";
import BillingSummary from "@/components/BillingSummary";

interface Props {
  experience: ExperienceType;
  initialDate?: string | null;
}

export default function ExperienceClient({ experience, initialDate = null }: Props) {
  const router = useRouter();

  const availableDates = useMemo(
    () => [...new Set(experience.slots.map((s) => s.date))],
    [experience.slots]
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate || availableDates[0] || null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return experience.slots
      .filter((s) => s.date === selectedDate)
      .map((s) => ({
        time: s.time,
        available: s.soldOut ? 0 : s.available ?? 0,
      }));
  }, [experience.slots, selectedDate]);

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;

  const handleSelectionChange = (date: string | null, time: string | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time first");
      return;
    }

    // Calculate values
    const basePrice = experience.price;
    const calculatedSubtotal = basePrice * quantity;
    const calculatedTax = 59; // Fixed tax amount
    const calculatedTotal = calculatedSubtotal + calculatedTax;

    const params = new URLSearchParams({
      id: experience._id,
      title: encodeURIComponent(experience.title),
      date: selectedDate,
      time: encodeURIComponent(selectedTime),
      qty: String(quantity),
      price: String(basePrice),
      subtotal: String(calculatedSubtotal),
      tax: String(calculatedTax),
      total: String(calculatedTotal)
    });

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-6">
          {/* Product Image */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* DateTimeSelector BELOW the image */}
          <DateTimeSelector
            title={experience.title}
            description={experience.description}
            availableDates={availableDates}
            timeSlots={timeSlots}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectionChange={handleSelectionChange}
          />
        </div>

        {/* RIGHT SIDE (BillingSummary) */}
        <div className="lg:col-span-4">
          <BillingSummary
            basePrice={experience.price}
            quantity={quantity}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
            onQuantityChange={(qty) => setQuantity(qty)}
            onConfirm={handleConfirm}
            isDateTimeSelected={!!selectedDate && !!selectedTime}
          />
        </div>
      </div>
    </div>
  );
}
