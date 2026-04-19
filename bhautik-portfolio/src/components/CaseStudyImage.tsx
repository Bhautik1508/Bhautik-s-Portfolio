export default function CaseStudyImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure>
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: "0.5px solid #DDD8D2",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      {caption && (
        <figcaption
          className="font-sans text-center mt-3"
          style={{ fontSize: 13, color: "#9B9590" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
