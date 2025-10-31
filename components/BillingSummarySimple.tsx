"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BillingSummarySimpleProps {
  title?: string;
  date?: string;
  time?: string;
  quantity?: number;
  price?: number;
  subtotal?: number;
  taxes?: number;
  total?: number;
  onConfirm?: () => void;
}

export default function BillingSummarySimple({
  title,
  date,
  time,
  quantity = 1,
  price = 0,
  subtotal = 0,
  taxes = 0,
  total = 0,
  onConfirm,
}: BillingSummarySimpleProps) {
  return (
    <Card className="bg-[#EFEFEF] rounded-[12px] p-6 w-full max-w-[380px] flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Experience</span>
          <span className="text-black font-medium">{title}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Date</span>
          <span className="text-black">{date}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Time</span>
          <span className="text-black">{time}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Price</span>
          <span className="text-black">₹{price.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Qty</span>
          <span className="text-black">{quantity}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-300 pb-2">
          <span>Taxes</span>
          <span className="text-black">₹{taxes.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-black pt-2">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <Button
        className="mt-4 bg-[#FFD700] hover:bg-[#f5cf00] text-black font-medium rounded-[8px] h-[45px]"
        onClick={onConfirm}
      >
        Pay and Confirm
      </Button>
    </Card>
  );
}
