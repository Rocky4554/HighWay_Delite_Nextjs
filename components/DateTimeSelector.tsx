"use client";

import { useState, useEffect } from "react";

interface DateTimeSelectorProps {
  title?: string;
  description?: string;
  availableDates: string[]; // ISO date strings like '2025-10-22'
  timeSlots: { time: string; available: number }[];
  selectedDate?: string | null;
  selectedTime?: string | null;
  onSelectionChange?: (date: string | null, time: string | null) => void;
}

export default function DateTimeSelector({
  title = "Kayaking",
  description = "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
  availableDates,
  timeSlots,
  selectedDate: parentSelectedDate,
  selectedTime: parentSelectedTime,
  onSelectionChange,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(parentSelectedDate || null);
  const [selectedTime, setSelectedTime] = useState<string | null>(parentSelectedTime || null);

  // Sync with parent props
  useEffect(() => {
    if (parentSelectedDate !== undefined) setSelectedDate(parentSelectedDate);
  }, [parentSelectedDate]);

  useEffect(() => {
    if (parentSelectedTime !== undefined) setSelectedTime(parentSelectedTime);
  }, [parentSelectedTime]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    onSelectionChange?.(date, null);
  };

  const handleTimeSelect = (time: string, soldOut: boolean) => {
    if (soldOut || !selectedDate) return;
    setSelectedTime(time);
    onSelectionChange?.(selectedDate, time);
  };

  // Helper: format ISO date → "OCT 22"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    })
      .format(date)
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-[12px] p-8 w-full max-w-3xl space-y-6 shadow-sm">
      {/* Title & Description */}
      <div>
        <h2 className="text-[28px] font-semibold text-black">{title}</h2>
        <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{description}</p>
      </div>

      {/* Choose Date */}
      <div>
        <h3 className="text-[18px] font-semibold text-gray-800 mb-3">Choose date</h3>
        <div className="flex flex-wrap gap-3">
          {availableDates.map((date) => (
            <button
              key={date}
              onClick={() => handleDateSelect(date)}
              className={`w-[117px] h-[34px] rounded-[6px] text-sm font-medium border transition-all
                ${
                  selectedDate === date
                    ? "bg-[#FFD643] text-black border-transparent"
                    : "bg-white text-[#838383] border border-[#DADADA] hover:bg-gray-50"
                }`}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
      </div>

      {/* Choose Time */}
      <div>
        <h3 className="text-[18px] font-semibold text-gray-800 mb-3">Choose time</h3>
        <div className="flex flex-wrap gap-3">
          {timeSlots.map(({ time, available }) => {
            const soldOut = available <= 0;
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                onClick={() => handleTimeSelect(time, soldOut)}
                className={`w-[117px] h-[34px] rounded-[6px] text-sm font-medium border px-3 flex items-center justify-between transition-all
                  ${
                    soldOut
                      ? "bg-[#F5F5F5] text-gray-400 border border-[#E0E0E0] cursor-not-allowed"
                      : isSelected
                      ? "bg-[#FFD643] text-black border-transparent"
                      : "bg-white text-[#838383] border border-[#DADADA] hover:bg-gray-50"
                  }`}
              >
                <span className="text-[14px] font-semibold">{time}</span>
                {!soldOut && (
                  <span className="text-[12px] font-medium text-[#FF5C00] whitespace-nowrap">
                    {available} left
                  </span>
                )}
                {soldOut && (
                  <span className="text-[12px] text-gray-500 whitespace-nowrap">Sold out</span>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">All times are in IST (GMT +5:30)</p>
      </div>

      {/* About Section */}
      <div>
        <h3 className="text-[18px] font-semibold text-gray-800 mb-2">About</h3>
        <div className="bg-[#EFEFEF] rounded-[8px] p-3 text-sm text-gray-600">
          Scenic routes, trained guides, and safety briefing. Minimum age 10.
        </div>
      </div>
    </div>
  );
}
