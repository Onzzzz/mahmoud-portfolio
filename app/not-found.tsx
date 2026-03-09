export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#111318",
        color: "#e8e4de",
        fontFamily: "var(--font-outfit), sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 800,
          color: "#c9a84c",
          lineHeight: 1,
          margin: 0,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          color: "#c5c0b8",
          marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        Page not found
      </p>
      <p
        style={{
          fontSize: "1rem",
          color: "#908f97",
          marginBottom: "2rem",
          maxWidth: "400px",
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          background: "#c9a84c",
          color: "#111",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
