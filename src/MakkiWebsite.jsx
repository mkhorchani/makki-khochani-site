import { useEffect, useState } from "react";
import { Github, Linkedin, BookOpen, Globe } from "lucide-react";

export default function MakkiWebsite() {
  const [metrics, setMetrics] = useState(null);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch("data/metrics.json")
      .then((res) => res.json())
      .then((data) => setMetrics(data));

    fetch("data/publications.json")
      .then((res) => res.json())
      .then((data) => setPublications(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-200 p-4 text-brown-800 relative">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">Makki Khochani</h1>
        <p className="mt-2 text-lg max-w-xl mx-auto">
          I work on the interaction between ecosystems and climate and I try to look for the best equilibrium between the two.
        </p>
      </header>

      {/* Citation Metrics Box in Top Right Corner */}
      {metrics && (
        <div className="absolute top-4 right-4 w-64 bg-white rounded-xl shadow-lg p-4 text-sm">
          <div className="text-center">
            <p className="font-bold">Citations</p>
            <p>All: {metrics.citations}</p>
            <p>Since 2019: {metrics.citations5y}</p>
          </div>
          <div className="text-center mt-2">
            <p className="font-bold">h-index</p>
            <p>{metrics.h_index}</p>
          </div>
          <div className="text-center mt-2">
            <p className="font-bold">i10-index</p>
            <p>{metrics.i10_index}</p>
          </div>
        </div>
      )}

      <section className="my-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Publications</h2>
        {publications.length > 0 ? (
          <ul className="space-y-4">
            {publications.map((pub, index) => (
              <li key={index} className="bg-white p-4 rounded-xl shadow">
                <a href={pub.url} target="_blank" className="text-lg font-semibold text-blue-700 hover:underline">
                  {pub.title}
                </a>
                <p className="text-sm text-gray-700 italic">{pub.authors}</p>
                <p className="text-sm text-gray-700">
                  {pub.journal} ({pub.year})
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading publications...</p>
        )}
      </section>

      <section className="my-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Code & Tools</h2>
        <p>
          You can explore and use code from my work on <a href="https://github.com" target="_blank" className="underline text-blue-700">GitHub</a>.
        </p>
      </section>

      <section className="my-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Profiles</h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://scholar.google.com/citations?user=btji37cAAAAJ" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Google Scholar
          </a>
          <a href="https://www.researchgate.net" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> ResearchGate
          </a>
          <a href="https://orcid.org" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <Globe className="w-4 h-4" /> ORCID
          </a>
          <a href="https://github.com" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="https://your-university.edu/profile" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <Globe className="w-4 h-4" /> University Profile
          </a>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-600 mt-12">
        <p>© {new Date().getFullYear()} Makki Khochani</p>
      </footer>
    </div>
  );
}

