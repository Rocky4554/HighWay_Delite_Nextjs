"use client";

import React from "react";
import { Card } from "@/components/ui/card";

interface BillingSummaryStaticProps {
  title?: string;
  date?: string;
  time?: string;
  basePrice?: number;
  quantity?: number;
  subtotal?: number;
  taxes?: number;
  total?: number;
  promoCode?: string;
  discount?: number;
}

export default function BillingSummaryStatic({
  title,
  date,
  time,
  basePrice = 0,
  quantity = 1,
  subtotal = 0,
  taxes = 0,
  total = 0,
  promoCode,
  discount = 0,
}: BillingSummaryStaticProps) {
  return (
    <Card
      className="relative bg-[#EFEFEF] rounded-[12px] w-[387px] p-[24px] flex flex-col justify-between shadow-sm"
      style={{ opacity: 1, transform: "rotate(0deg)" }}
    >
      <div className="space-y-3">
        {/* Optional Info */}
        {(title || date || time) && (
          <div className="border-b border-gray-300 pb-2 mb-2">
            {title && <p className="text-[16px] font-medium text-black">{title}</p>}
            {date && <p className="text-[14px] text-gray-600">{date}</p>}
            {time && <p className="text-[14px] text-gray-600">{time}</p>}
          </div>
        )}

        {/* Starts at */}
        <div className="flex justify-between text-[14px] text-gray-700">
          <span>Starts at</span>
          <span className="text-black font-medium">
            ₹{Number(basePrice || 0).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Quantity (static) */}
        <div className="flex justify-between items-center text-[14px] text-gray-700">
          <span>Quantity</span>
          <span className="text-black">{quantity}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between text-[14px] text-gray-700">
          <span>Subtotal</span>
          <span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between text-[14px] text-gray-700">
          <span>Taxes</span>
          <span className="text-black">₹{taxes.toLocaleString("en-IN")}</span>
        </div>

        {/* Discount (optional) */}
        {discount > 0 && (
          <div className="flex justify-between text-[14px] text-green-600">
            <span>Discount {promoCode ? `(${promoCode})` : ""}</span>
            <span>-₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}

        <hr className="border-gray-300 my-2" />

        {/* Total */}
        <div className="flex justify-between text-[16px] font-semibold text-black">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </Card>
  );
}
