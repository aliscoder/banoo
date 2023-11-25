import Constants from "expo-constants";
const apiKey = "AIzaSyDcdSYW2kGVmVsbpE6WHPT6dEWbbt7jGGc";

export function createMapImage(loc: number[] | undefined) {
  if (loc) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${loc[1]},${loc[0]}&markers=color:red%7Clabel:A%7C${loc[1]},${loc[0]}&key=${apiKey}`;
  } else {
    return null;
  }
}
