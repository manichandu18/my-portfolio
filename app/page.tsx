import type { Metadata } from 'next';
import GlassHero from '@/components/glass-hero';

export const metadata: Metadata = {
  title: 'M. Manichandra Babu — Full-Stack Web Developer',
  description: 'Hi, I\'m M. Manichandra Babu, a Full-Stack Web Developer and B.Tech (ECE) student skilled in HTML, CSS, JavaScript, React.js, Python, and Django. Explore my projects, technical skills, and experience.',
};

export default function Home() {
  return <GlassHero />;
}
