export function AppFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {currentYear} Meu Portfólio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
