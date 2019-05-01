export const getNpmPackageVersion = async name => {
  try {
    const response = await fetch(`npm-package/${name}`);
    const { latestVersion } = response.json();

    return { success: true, version: `^${latestVersion}` };
  } catch {
    return { success: false, version: "" };
  }
};
