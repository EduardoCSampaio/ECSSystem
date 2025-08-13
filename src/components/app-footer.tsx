'use client';
import { useEffect, useState } from 'react';

export function AppFooter() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-6 border-t bg-background">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {year} E&S Business and Software. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
