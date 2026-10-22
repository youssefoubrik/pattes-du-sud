import { ButtonLink } from "@/components/ui/button-link";
import { localizedRoute, routePaths } from "@/lib/routes";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main-content" className="flex-1 py-20">
      <Container className="max-w-xl text-center">
        <h1 className="text-4xl text-heading">Page not found</h1>
        <p className="mt-4">
          This page may have moved or the animal profile may no longer be
          available.
        </p>
        <ButtonLink
          href={localizedRoute("en", routePaths.home)}
          variant="secondary"
          className="mt-6"
        >
          Go home
        </ButtonLink>
      </Container>
    </main>
  );
}
