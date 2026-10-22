# Site content

The site is maintained in English. The active navigation is Home, Projects,
Repositories, and CV. Personal details and project descriptions come from the
existing biography and CV; no publications, teaching activities, or news have
been invented.

## Content sources

- `_pages/about.md`: biography, affiliation, address, and profile image.
- `_config.yml`: metadata, university email, and social profiles.
- `assets/json/resume.json`: primary CV data.
- `_data/cv.yml`: fallback CV; keep it consistent with the JSON resume.
- `_projects/smspp.md`, `_projects/urban-air-mobility.md`, and
  `_projects/network-flow.md`: real research and thesis projects.
- `_data/repositories.yml`: repositories displayed on the site.
- `_includes/repository/gitlab_user.liquid` and `assets/js/gitlab-stats.js`:
  live GitLab statistics for `_config.yml`'s `gitlab_username`. The card uses
  unauthenticated public API requests, paginates results, and falls back to a
  profile link on failure. Personal project and star counts cover the user's
  personal namespace; contributed projects cover the past year, including groups.
- `_pages/cv.md`: downloadable PDF selection. Confirm that this PDF stays current.

Public contacts: university email, GitHub, LinkedIn, GitLab, and Discord.
The template's Einstein portrait is disabled. To add a personal portrait, save
it in `assets/img/` and set `profile.image` in `_pages/about.md` to its filename.
The existing degree dates, planned PhD end year, and downloadable CV PDF have
been confirmed by the owner and retained.

## Disabled template sections

The original demo files are retained in source and excluded in `_config.yml`.
They are not intended to be generated, indexed by site search, or added to the
sitemap. Removing a navigation item alone would leave the demo URL accessible.

- Blog: replace the example `_posts` and `_pages/blog.md` content, remove their
  exclusions, and enable pagination and archives only when needed. External demo
  feeds and Disqus are disabled; do not re-enable another author's integrations.
- News: replace the sample `_news` files, remove their exclusions and that of
  `_pages/news.md`, enable `collections.news.output`, `announcements.enabled`,
  and the home page's `news` flag.
- Publications: add personal entries to `_bibliography/papers.bib` and remove
  the `_pages/publications.md` exclusion. Enable `selected_papers` only when there
  are selected publications to show.
- Teaching and people: replace their placeholder content before removing the
  relevant page exclusions. The example dropdown is also excluded.
- Demo projects: the nine numbered example project files are individually
  excluded, so new real projects can be added without enabling the examples.
- GitHub trophies, related blog posts, and latest-post widgets are disabled.
- Bibliography search, MathJax, and image zoom are disabled until relevant
  content is added.
- Demo notebooks, embedded HTML, and Plotly examples are excluded. ImageMagick
  generation is disabled while no personal images are shown; re-enable it when
  adding images that need responsive variants.

## Local build

From the repository directory in WSL, with Ruby, Bundler, and ImageMagick installed:

```sh
bundle install
JEKYLL_ENV=production bundle exec jekyll build
bundle exec jekyll serve --host 0.0.0.0
```

The generated output is `_site/`. The existing GitHub Actions workflow builds
and deploys the site after a push to `main` or `master`.
