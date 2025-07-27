export default function BlogEntry({ title, author, thumbnail }) {
    return (
        <article className="blog-entry" style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            borderBottom: "1px solid #eee",
            paddingBottom: "1rem"
        }}>
            {thumbnail && (
                <img
                    src={thumbnail}
                    alt={`Thumbnail für ${title}`}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                />
            )}
            <div>
                <h2 style={{ margin: "0 0 0.3em 0" }}>{title}</h2>
                <div style={{ fontSize: "0.95em", color: "#666" }}>von {author}</div>
            </div>
        </article>
    );
}