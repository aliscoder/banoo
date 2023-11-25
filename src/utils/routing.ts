export function makeRouting(
    userLoc: [number, number],
    destination: [number, number]
  ) {
    if (userLoc && destination) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userLoc[1]},${userLoc[0]}&destination=${destination[1]},${destination[0]}`;
    } else {
      return null;
    }
  }
  