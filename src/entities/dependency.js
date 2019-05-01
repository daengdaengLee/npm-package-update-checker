export const DEPENDENCY = {
  name: "",
  prevVersion: "",
  nextVersion: "",
  loading: false,
  error: null
};

export const makeDependency = (
  name = "",
  prevVersion = "",
  nextVersion = "",
  loading = false,
  error = null
) => ({
  name,
  prevVersion,
  nextVersion,
  loading,
  error
});
