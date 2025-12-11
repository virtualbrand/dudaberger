import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guirlanda de Natal - Duda Berger',
  description: 'Aprenda a fazer uma linda guirlanda de natal com a Duda Berger',
  robots: {
    index: false,
    follow: false,
  },
};

export default function GuirlandaNatalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
