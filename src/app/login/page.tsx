'use client';

import Image from 'next/image';
import { LoginForm } from '@/components/pages/login';

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-[#d4c4b2] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Shadow Background Overlay - Desktop */}
      <div className="absolute inset-0 z-0 opacity-50 hidden lg:block" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>
      
      {/* Shadow Background Overlay - Mobile */}
      <div className="absolute inset-0 z-0 opacity-30 lg:hidden" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg-mobile.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>

      <div className="w-full max-w-[500px] mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-unbounded text-[#703535]">
            Duda Berger
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
