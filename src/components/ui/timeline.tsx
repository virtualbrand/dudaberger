"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Clock } from "lucide-react";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  status?: "completed" | "active" | "pending";
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items = [], className }: TimelineProps) {
  return (
    <div className={cn("relative max-w-2xl mx-auto", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.id} className="relative flex gap-4 pb-8">
            {/* Linha vertical */}
            {!isLast && (
              <div className="absolute left-[13px] top-7 h-full w-[2px] bg-gray-200" />
            )}
            
            {/* Ícone */}
            <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
              {item.status === "completed" ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500">
                  <Check className="h-4 w-4 text-white" />
                </div>
              ) : item.status === "active" ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#D65B58] bg-white">
                  <Clock className="h-4 w-4 text-[#D65B58]" />
                </div>
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 pb-2">
              <h3 className="font-semibold text-[#703535] text-left">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm text-[#703535] text-left whitespace-pre-line">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
