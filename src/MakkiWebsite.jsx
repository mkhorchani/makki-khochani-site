import { useEffect, useState } from "react";
import { Github, BookOpen, Globe, BarChart2, Calendar } from "lucide-react";

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

  const recentPublications = publications.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-200 p-4 text-brown-800 relative">
      {/* Header with Profile Info */}
      <header className="flex items-center gap-4 mb-12">
        <img
          src="/data/makki.jpg"
          alt="Makki Khochani"
          className="w-20 h-20 rounded-full border-4 border-yellow-300 object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">Makki Khochani</h1>
          <p className="text-sm">Research Assistant Professor</p>
          <p className="text-sm">School of Natural Resources, University of Nebraska-Lincoln</p>
          <p className="text-sm text-blue-800">mkhorchani2@unl.edu</p>
        </div>
      </header>

      {/* Citation Metrics Box */}
      {metrics && (
        <div className="absolute top-4 right-4 w-72 bg-white rounded-xl shadow-lg border border-yellow-300 p-4 text-sm space-y-2">
          <h3 className="text-center font-bold text-md mb-1 flex items-center justify-center gap-1">
            <BarChart2 className="w-4 h-4" /> Citation Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-semibold">Citations</p>
              <p>All time: {metrics.citations}</p>
              <p>Since 2019: {metrics.citations5y}</p>
            </div>
            <div>
              <p className="font-semibold">h-index</p>
              <p>{metrics.h_index}</p>
              <p className="font-semibold mt-2">i10-index</p>
              <p>{metrics.i10_index}</p>
            </div>
          </div>
        </div>
      )}

      {/* Story Section */}
      <section className="my-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Story</h2>
        <p className="text-md">
          I work on the interaction between ecosystems and climate, and I try to find the best equilibrium between the two.
        </p>
      </section>

      {/* Publications Preview Section */}
      <section className="my-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Recent Publications</h2>
        {recentPublications.length > 0 ? (
          <ul className="space-y-4">
            {recentPublications.map((pub, index) => (
              <li key={index} className="bg-white p-4 rounded-xl shadow">
                <a href={pub.publisher_url || pub.url} target="_blank" className="text-lg font-semibold text-blue-700 hover:underline">
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
        {publications.length > 5 && (
          <div className="mt-4 text-right">
            <a href="publications.html" className="text-blue-800 underline">View all publications</a>
          </div>
        )}
      </section>

      {/* Code Section */}
      <section className="my-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Code & Tools</h2>
        <p>
          You can explore and use code from my work on <a href="https://github.com/mkhorchani" target="_blank" className="underline text-blue-700">GitHub</a>.
        </p>
      </section>

      {/* Profile Links Section */}
      <section className="my-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Profiles</h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://scholar.google.com/citations?user=btji37cAAAAJ" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Google Scholar
          </a>
          <a href="https://www.researchgate.net/profile/Makki-Khorchani?ev=hdr_xprf" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> ResearchGate
          </a>
          <a href="https://orcid.org/0000-0001-9379-7052" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <Globe className="w-4 h-4" /> ORCID
          </a>
          <a href="https://github.com/mkhorchani" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="https://snr.unl.edu/aboutus/who/people/faculty-member.aspx?pid=2713" target="_blank" className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2">
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

