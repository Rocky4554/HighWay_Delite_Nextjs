"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BillingSummaryProps {
  basePrice?: number;
  quantity?: number;
  subtotal?: number;
  taxes?: number;
  total?: number;
  onQuantityChange?: (quantity: number) => void;
  onConfirm: () => void;
  isDateTimeSelected?: boolean;
}

export default function BillingSummary({
  basePrice = 0,
  quantity = 1,
  subtotal = 0,
  taxes = 0,
  total = 0,
  onQuantityChange = () => {},
  onConfirm,
  isDateTimeSelected = false,
}: BillingSummaryProps) {
  return (
    <Card
      className="relative bg-[#EFEFEF] rounded-[12px] w-[387px] h-[303px] p-[24px] flex flex-col justify-between shadow-sm"
      style={{
        opacity: 1,
        transform: "rotate(0deg)",
      }}
    >
      <div className="space-y-3">
        {/* Starts at */}
        <div className="flex justify-between text-[14px] text-gray-700">
          <span>Starts at</span>
          <span className="text-black font-medium">
            ₹{Number(basePrice || 0).toLocaleString('en-IN')}
          </span>
        </div>

        {/* Quantity */}
        <div className="flex justify-between items-center text-[14px] text-gray-700">
          <span>Quantity</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onQuantityChange(Math.max(1, (quantity || 1) - 1))}
            >
              −
            </Button>
            <span className="min-w-[24px] text-center text-black">{quantity || 1}</span>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onQuantityChange((quantity || 0) + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between text-[14px] text-gray-700">
          <span>Subtotal</span>
          <span className="text-black">₹{Number(subtotal || 0).toLocaleString('en-IN')}</span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between text-[14px] text-gray-700">
          <span>Taxes</span>
          <span className="text-black">₹{Number(taxes || 0).toLocaleString('en-IN')}</span>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-2" />

        {/* Total */}
        <div className="flex justify-between text-[16px] font-semibold text-black">
          <span>Total</span>
          <span>₹{Number(total || 0).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <Button
        className={`w-full h-[48px] text-[16px] rounded-[8px] mt-3 ${
          !isDateTimeSelected
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-yellow-400 text-black hover:bg-yellow-500"
        }`}
        disabled={!isDateTimeSelected}
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </Card>
  );
}