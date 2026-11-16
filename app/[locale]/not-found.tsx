import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const tn = useTranslations("notFound");
  return (
    <section className="texture-grain">
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p aria-hidden="true" className="font-heading text-gold text-8xl font-semibold sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl">{tn("title")}</h1>
        <p className="text-stone mt-4 max-w-md text-lg">{tn("text")}</p>
        <Link href="/" className="btn btn-brown mt-8">
          {tn("cta")}
        </Link>
      </div>
    </section>
  );
}
