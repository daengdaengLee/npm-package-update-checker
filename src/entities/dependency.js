/*
type Dependency {
  name: String!
  prevVersion: String!
  nextVersion: String!
  loading: Boolean!
  error: String
}
*/

export const makeDependency = (
  name = '',
  prevVersion = '',
  nextVersion = '',
  loading = false,
  error = null,
) => ({
  name,
  prevVersion,
  nextVersion,
  loading,
  error,
});

export default makeDependency;
