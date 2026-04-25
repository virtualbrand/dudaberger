'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GaleriaRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/galeria'); }, [router]);
  return null;
}
