import semver, { SemVer } from 'semver';
interface CompareMedixVersion {
  minVersion: string;
}
export const greaterOrEqualToMendixVersion = ({
  minVersion,
}: CompareMedixVersion): boolean => {
  const mxWindow = (window as any).mx;
  const parsedWindowsVersion = semver.valid(semver.coerce(mxWindow.version));
  const parsedMinVersion = semver.minVersion(minVersion);

  const comparedVersion = semver.gte(
    parsedMinVersion as SemVer,
    parsedWindowsVersion as string
  );

  console.log(`comparedVersion`, comparedVersion);
  return comparedVersion;
};
