import { Link } from "react-router-dom";
import PhotoBlock from "../components/PhotoBlock";
import ProductCard from "../components/ProductCard";
import GarmentIcon from "../components/GarmentIcon";
import { PRODUCTS } from "../data/products";

const CATEGORIES = [
  {
    name: "Jackets",
    icon: "jacket",
    copy: "Shells & insulation",
    photo:
      "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=800&q=70",
    alt: "Storm light over dramatic sea cliffs",
  },
  {
    name: "Base Layers",
    icon: "base",
    copy: "Merino & synthetic",
    photo:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=70",
    alt: "Sunlight through a quiet pine forest trail",
  },
  {
    name: "Pants",
    icon: "pants",
    copy: "Softshell & trail",
    photo:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=70",
    alt: "Narrow desert slot canyon carved from red rock",
  },
  {
    name: "Packs",
    icon: "pack",
    copy: "22L to 32L",
    photo:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70",
    alt: "Turquoise water along a tropical beach coastline",
  },
];

export default function Home() {
  // Pull a broad, evenly-spread set of products so the home page reads as a
  // real catalog rather than 4 items floating in a lot of scenery.
  const featured = PRODUCTS.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="hero hero--short">
        <PhotoBlock
          className="hero__photo"
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80"
          alt="Climber traversing an exposed alpine ridge at sunrise"
        />
        <div className="hero__scrim" />
        <div className="wrap hero__content">
          <p className="eyebrow hero__eyebrow">RZV / FIELD-TESTED APPAREL</p>
          <h1 className="display-1 hero__title">
            Built for the line
            <br />
            between trail and summit
          </h1>
          <p className="body-lg hero__sub">
            Technical shells, insulation, and packs designed in the shoulder season —
            when the weather can't decide what it wants to be.
          </p>
          <div className="hero__ctas">
            <Link to="/shop" className="btn btn-primary">
              Shop the collection
            </Link>
            <Link to="/shop?activity=Alpine" className="btn btn-outline-dark">
              Shop Alpine
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products, right below the hero */}
      <section className="featured">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">New &amp; bestselling</p>
            <Link to="/shop" className="btn-ghost btn" style={{ padding: 0 }}>
              View all →
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Category rail */}
      <section className="cat-rail">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Shop by category</p>
          </div>
          <div className="cat-rail__grid">
            {CATEGORIES.map((c) => (
              <Link key={c.name} to={`/shop?category=${encodeURIComponent(c.name)}`} className="cat-card">
                <PhotoBlock className="cat-card__photo" src={c.photo} alt={c.alt} />
                <div className="cat-card__scrim" />
                <div className="cat-card__icon-wrap">
                  <GarmentIcon type={c.icon} size={26} />
                </div>
                <div className="cat-card__name display-3" style={{ fontSize: 18 }}>
                  {c.name}
                </div>
                <div className="cat-card__copy mono">{c.copy}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial / Inform */}
      <section className="editorial">
        <div className="wrap editorial__grid">
          <PhotoBlock
            className="editorial__photo"
            src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1400&q=80"
            alt="Waterfall running through a dense green forest"
          />
          <div className="editorial__copy">
            <p className="eyebrow">Material philosophy</p>
            <h2 className="display-2" style={{ fontSize: 40 }}>
              We build to the conditions, not the season
            </h2>
            <p className="body-lg">
              Every RZV shell runs through the same test: eight hours in weather that's
              actively trying to get inside it. We use 3-layer Gore-Tex where sustained
              exposure demands it, and drop to softshell and merino where breathability
              matters more than a fully sealed membrane. Nothing is insulated for the
              sake of looking warm.
            </p>
            <Link to="/shop" className="btn btn-outline-light" style={{ marginTop: 24 }}>
              See the full range
            </Link>
          </div>
        </div>
      </section>

      {/* Engage in connection: survey teaser */}
      <section className="survey-teaser">
        <div className="wrap survey-teaser__inner">
          <div>
            <p className="eyebrow" style={{ color: "var(--mist)" }}>
              We're still figuring some of this out
            </p>
            <h2 className="display-2" style={{ fontSize: 32, maxWidth: "18ch" }}>
              Tell us about your last trip out
            </h2>
          </div>
          <p className="survey-teaser__copy">
            Two minutes, three questions. What you tell us decides what we build next season.
          </p>
          <Link to="/survey" className="btn btn-primary">
            Share feedback
          </Link>
        </div>
      </section>
    </>
  );
}