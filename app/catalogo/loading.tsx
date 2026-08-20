import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogLoading() {
  return (
    <Container>
      <div className="page-hero"><Skeleton style={{ height: 100, width: "60%" }} /></div>
      <div className="product-grid" aria-label="Carregando produtos">
        {Array.from({ length: 8 }, (_, index) => <Skeleton key={index} style={{ aspectRatio: "4/5" }} />)}
      </div>
    </Container>
  );
}
