import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, BookOpen, Globe } from "lucide-react";

export default function MakkiWebsite() {
  const [metrics, setMetrics] = useState(null);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch("/data/metrics.json")
      .then((res) => res.json())
      .then((data) => setMetrics(data));

    fetch("/data/publications.json")
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
        <div className="absolute top-4 right-4 w-64">
          <Card className="shadow-lg">
            <CardContent className="grid grid-cols-1 gap-2 text-center p-4 text-sm">
              <div>
                <p className="font-bold">Citations</p>
                <p>All: {metrics.citations}</p>
                <p>Since 2019: {metrics.citations5y}</p>
              </div>
              <div>
                <p className="font-bold">h-index</p>
                <p>{metrics.h_index}</p>
              </div>
              <div>
                <p className="font-bold">i10-index</p>
                <p>{metrics.i10_index}</p>
              </div>
            </CardContent>
          </Card>
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
        <div className="flex gap-4 flex-wrap">
          <Button variant="outline" asChild>
            <a href="https://scholar.google.com/citations?user=btji37cAAAAJ" target="_blank">
              <BookOpen className="mr-2" /> Google Scholar
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://www.researchgate.net" target="_blank">
              <BookOpen className="mr-2" /> ResearchGate
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://orcid.org" target="_blank">
              <Globe className="mr-2" /> ORCID
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com" target="_blank">
              <Github className="mr-2" /> GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://your-university.edu/profile" target="_blank">
              <Globe className="mr-2" /> University Profile
            </a>
          </Button>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-600 mt-12">
        <p>© {new Date().getFullYear()} Makki Khochani</p>
      </footer>
    </div>
  );
}
