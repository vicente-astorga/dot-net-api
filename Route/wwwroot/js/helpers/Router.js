import updatePath from "./UpdatePath.js";
let init = true;

export default async function router(routes) {
  let newPathname = location.pathname;
  let match, matches;

  (!init) ? newPathname = await updatePath().then((e) => e) : newPathname;
  init = false;

  matches = routes.map((route, index) => {
    return {
      route: route,
      isMatch: newPathname === route.path ? true : false,
      index,
      index,
    };
  });

  match = matches.find((founded) => founded.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
    window.location.pathname = match.route.path;
  }

  match.route.view();
  return match;
}
