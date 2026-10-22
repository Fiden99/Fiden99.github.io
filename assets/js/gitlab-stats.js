// Only public GitLab data is requested; no account token is needed.
(() => {
  const api = "https://gitlab.com/api/v4";

  async function loadCard(card) {
    const status = card.querySelector("[data-gitlab-status]");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const username = card.dataset.gitlabUsername;
    status.textContent = "Loading public GitLab statistics…";

    async function request(path) {
      const response = await fetch(`${api}${path}`, {
        credentials: "omit",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("GitLab statistics unavailable");
      const result = await response.json();
      if (!Array.isArray(result)) throw new Error("Unexpected GitLab response");
      return result;
    }

    async function listProjects(userId, collection) {
      const projects = [];
      let page = 1;
      while (true) {
        const batch = await request(`/users/${userId}/${collection}?per_page=100&page=${page}`);
        projects.push(...batch);
        if (batch.length < 100) return projects;
        page += 1;
      }
    }

    try {
      const users = await request(`/users?username=${encodeURIComponent(username)}`);
      const user = users.find((entry) => entry.username.toLowerCase() === username.toLowerCase());
      if (!user || !Number.isInteger(user.id)) throw new Error("GitLab user unavailable");

      const [personal, contributed] = await Promise.all([listProjects(user.id, "projects"), listProjects(user.id, "contributed_projects")]);
      const stars = personal.reduce((sum, project) => sum + (Number(project.star_count) || 0), 0);
      card.querySelector("[data-gitlab-personal]").textContent = personal.length.toLocaleString("en");
      card.querySelector("[data-gitlab-contributed]").textContent = contributed.length.toLocaleString("en");
      card.querySelector("[data-gitlab-stars]").textContent = stars.toLocaleString("en");
      card.querySelector("[data-gitlab-metrics]").hidden = false;
      status.textContent = "Public data only. Contributions cover the past year.";
    } catch (error) {
      status.textContent = "Statistics are temporarily unavailable. Open the GitLab profile using the link above.";
    } finally {
      clearTimeout(timeout);
    }
  }

  document.querySelectorAll("[data-gitlab-stats]").forEach(loadCard);
})();
