import BlogEntry from "./blogspace/BlogEntry";

const blogEntries = [
];

export default function BlogSpace() {
    return <main style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
            <h1>Neue Beiträge</h1>
            <section>
                {blogEntries.map((entry, idx) => (
                    <BlogEntry
                        key={idx}
                        title={entry.title}
                        author={entry.author}
                        thumbnail={entry.thumbnail}
                    />
                ))}
            </section>
        </main>;
}