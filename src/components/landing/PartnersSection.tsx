
"use client"

import React from 'react';

export default function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-8">
            Ils nous font confiance
          </h3>
          <div className="flex items-center justify-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">CLIENT 1</div>
            <div className="text-2xl font-bold text-gray-400">CLIENT 2</div>
            <div className="text-2xl font-bold text-gray-400">CLIENT 3</div>
            <div className="text-2xl font-bold text-gray-400">CLIENT 4</div>
          </div>
        </div>
      </div>
    </section>
  );
}
