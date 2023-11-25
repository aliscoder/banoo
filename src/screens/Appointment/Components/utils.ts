import { CoordType } from "@types";

export function makeRoutingURL(clientLoc: CoordType | undefined, barberLoc: CoordType | undefined) {
  if (clientLoc && barberLoc) {
    return `https://www.google.com/maps/dir/?api=1&origin=${clientLoc[1]},${clientLoc[0]}&destination=${barberLoc[1]},${barberLoc[0]}`;
  } else {
    return null;
  }
}
