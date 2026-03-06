import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Image
        src="/images/logo.webp"
        alt="Oriental Labs logo"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
      {!iconOnly && (
        <span className="text-xl font-bold tracking-tight text-white">
          Oriental{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-cyan-400">
            Labs
          </span>
        </span>
      )}
    </div>
  );
}
