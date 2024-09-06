"use client";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

    if (!isAuthenticated) {
      router.push('/'); // Rediriger vers la page d'accueil si non authentifié
    }

  return <>{children}</>;
}
