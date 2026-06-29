export const prerender = false;

export async function GET() {
  try {
    const token = import.meta.env.GITHUB_TOKEN;
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'GITHUB_TOKEN environment variable is not configured.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://api.github.com/user/repos?type=owner&sort=updated&per_page=100', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'Astro-Portfolio-App'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch repositories from GitHub.' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const repos = await response.json();

    // Map GitHub repos to portfolio projects structure
    const projects = repos.map((repo: any, index: number) => {
      // Determine layout span based on index/properties
      let span = 'small';
      if (index === 0) {
        span = 'large';
      } else if (index === 3) {
        span = 'wide';
      }

      // Collect tags (language + topics)
      const tags = [];
      if (repo.language) {
        tags.push(repo.language);
      }
      if (repo.topics && Array.isArray(repo.topics)) {
        tags.push(...repo.topics.slice(0, 2));
      }
      if (tags.length === 0) {
        tags.push('Repository');
      }

      return {
        title: repo.name,
        category: repo.language || 'Project',
        description: repo.description || 'No description provided.',
        tags,
        span,
        img: `https://picsum.photos/seed/${repo.name}/800/500`,
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        private: repo.private
      };
    });

    return new Response(JSON.stringify({ success: true, projects }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600' // cache for 1 hour
      }
    });
  } catch (err) {
    console.error('Projects API error:', err);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
