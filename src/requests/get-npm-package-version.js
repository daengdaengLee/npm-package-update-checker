export const getNpmPackageVersion = async name => {
  try {
    const query = `
query {
  npmPackage(name: "${name}") {
    latestVersion
  }
}    
    `
      .trim()
      .replace(/\n/g, " ");
    const response = await fetch(`/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const {
      data: {
        npmPackage: { latestVersion }
      }
    } = await response.json();

    return { success: true, version: `^${latestVersion}` };
  } catch {
    return { success: false, version: "" };
  }
};
