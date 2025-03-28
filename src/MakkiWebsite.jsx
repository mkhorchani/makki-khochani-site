import { useEffect, useState } from "react";
import { Github, BookOpen, Globe, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

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
  const citationData = metrics?.citations_by_year || [];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-200 p-4 text-brown-800 relative bg-no-repeat bg-bottom bg-contain"
    >
      {/* Header with Profile Info */}
      <header className="flex items-start gap-6 mb-12">
        <div className="flex flex-col items-center">
          <img
            src={`${import.meta.env.BASE_URL}data/makki.jpg`}
            alt="Makki Khochani"
            className="w-28 h-28 rounded-full border-4 border-yellow-300 object-cover"
          />
          <div className="mt-4 flex flex-col items-start gap-2 text-sm">
            <a
              href="https://scholar.google.com/citations?user=btji37cAAAAJ"
              target="_blank"
              className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Google Scholar
            </a>
            <a
              href="https://www.researchgate.net/profile/Makki-Khorchani?ev=hdr_xprf"
              target="_blank"
              className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> ResearchGate
            </a>
            <a
              href="https://orcid.org/0000-0001-9379-7052"
              target="_blank"
              className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" /> ORCID
            </a>
            <a
              href="https://github.com/mkhorchani"
              target="_blank"
              className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://snr.unl.edu/aboutus/who/people/faculty-member.aspx?pid=2713"
              target="_blank"
              className="px-4 py-2 border rounded-lg shadow hover:bg-blue-100 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" /> UNL Profile
            </a>
          </div>
        </div>
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
          {citationData.length > 0 && (
            <div className="h-40 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={citationData}>
                  <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis
			label={{ value: 'Citations', angle: -90, position: 'insideLeft', offset: 5 }}
			ticks={[40, 80, 120, 160]}
  				domain={[0, 160]}
  				tick={{ fontSize: 10 }}
		  />
                  <Bar dataKey="citations" fill="#D97706" radius={[4, 4, 0, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Story Section */}
      <section className="mt-0 mb-2 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Story</h2>
        <p className="text-md">
          I am a Research Assistant Professor at the University of Nebraska–Lincoln, passionate about understanding how ecosystems and climate interact. My work aims to find sustainable, data-driven solutions that balance environmental health with human needs — particularly in arid and semi-arid regions. My research combines satellite remote sensing, field experiments, and environmental modeling to measure real evapotranspiration, estimate ecosystem productivity, and guide climate-smart decision-making.
        </p>
      </section>

      {/* Publications Preview Section */}
      <section className="mb-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Recent Publications</h2>
        {recentPublications.length > 0 ? (
          <ul className="space-y-4">
            {recentPublications.map((pub, index) => (
              <li key={index} className="bg-white p-4 rounded-xl shadow">
                <a
                  href={pub.publisher_url || pub.url}
                  target="_blank"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
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
            <a href="publications.html" className="text-blue-800 underline">
              View all publications
            </a>
          </div>
        )}
      </section>

      <footer className="text-center text-sm text-gray-600 mt-12">
        <p>© {new Date().getFullYear()} Makki Khochani</p>
      </footer>
    </div>
  );
}

