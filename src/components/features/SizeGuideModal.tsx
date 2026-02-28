"use client";

import { useState } from "react";
import { Modal, Toggle } from "@/components/ui";
import type { SizeGuideRow } from "@/lib/types";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeGuide: SizeGuideRow[];
}

export function SizeGuideModal({
  isOpen,
  onClose,
  sizeGuide,
}: SizeGuideModalProps) {
  const [useCm, setUseCm] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Size Guide" size="lg">
      <div className="mb-4 flex items-center justify-end gap-3">
        <span className="text-sm text-stone-600 dark:text-stone-400">
          Inches
        </span>
        <Toggle checked={useCm} onChange={setUseCm} />
        <span className="text-sm text-stone-600 dark:text-stone-400">
          Centimeters
        </span>
      </div>

      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-700">
              <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Size
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Chest
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Waist
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Hips
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Length
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {sizeGuide.map((row) => (
              <tr
                key={row.size}
                className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
              >
                <td className="px-6 py-3 font-medium text-stone-900 dark:text-stone-100">
                  {row.size}
                </td>
                <td className="px-4 py-3 text-center text-stone-600 dark:text-stone-400">
                  {useCm ? `${row.chest.cm} cm` : `${row.chest.inches}″`}
                </td>
                <td className="px-4 py-3 text-center text-stone-600 dark:text-stone-400">
                  {useCm ? `${row.waist.cm} cm` : `${row.waist.inches}″`}
                </td>
                <td className="px-4 py-3 text-center text-stone-600 dark:text-stone-400">
                  {useCm ? `${row.hips.cm} cm` : `${row.hips.inches}″`}
                </td>
                <td className="px-4 py-3 text-center text-stone-600 dark:text-stone-400">
                  {useCm ? `${row.length.cm} cm` : `${row.length.inches}″`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-stone-400 dark:text-stone-500 text-center">
        Measurements are approximate. For the best fit, we recommend comparing
        these measurements to a garment that fits you well.
      </p>
    </Modal>
  );
}
