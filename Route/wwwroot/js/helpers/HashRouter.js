import updateHash from "./UpdateHash.js";
let match, matches;
let newHash = location.hash;

export default async function hashRouter(routes) {
  matches = routes.map((el, index) => {
    return {
      route: el,
      isMatch: newHash === el.hash ? true : false,
      index,
    };
  });
  match = matches.find((founded) => founded.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
      index: null,
    };
    window.location.hash = match.route.hash;
  }

  match.route.view();
  newHash = await updateHash().then((e) => e);
  hashRouter(routes);
}
