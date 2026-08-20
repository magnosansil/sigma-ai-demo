import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <Container className="section"><Skeleton style={{ height: "60vh", width: "100%" }} /></Container>;
}
