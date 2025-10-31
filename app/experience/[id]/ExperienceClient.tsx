"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DateTimeSelector from "@/components/DateTimeSelector";
import BillingSummary from "@/components/BillingSummary";
import { Experience as ExperienceType } from "../../../lib/type";

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

  const [selectedDate, setSelectedDate] = useState<string | null>(
    initialDate || availableDates[0] || null
  );
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

    const basePrice = experience.price;
    const calculatedSubtotal = basePrice * quantity;
    const calculatedTax = 59;
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
      total: String(calculatedTotal),
    });

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      <div className="max-w-6xl mx-auto flex items-center gap-2 mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Details</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-6 relative">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <DateTimeSelector
            title={experience.title}
            description={experience.description}
            about={experience.about}   
            availableDates={availableDates}
            timeSlots={timeSlots}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectionChange={handleSelectionChange}
          />

        </div>

        {/* RIGHT SIDE */}
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
