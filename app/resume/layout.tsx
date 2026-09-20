import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M. Manichandra Babu — Interactive Resume',
  description: 'Interactive HTML Curriculum Vitae of M. Manichandra Babu, Full-Stack Web Developer. Explore projects, technical skills, education, and download official PDF.',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
