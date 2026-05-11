import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: "website" | "article";
  schema?: object | object[];
  noindex?: boolean;
}

const SITE_URL = "https://погода-вдоме.рф";
const DEFAULT_IMAGE = "https://cdn.poehali.dev/projects/07a5d9ed-123e-4e5d-ac16-a8eb7a7551b8/files/og-image-1778432498580.jpg";
const SITE_NAME = "Погода в доме";

export default function SEO({
  title,
  description,
  keywords,
  url = SITE_URL,
  image = DEFAULT_IMAGE,
  type = "website",
  schema,
  noindex = false,
}: SEOProps) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
