export default function updatePath() {
    return new Promise(
      (resolve, reject) => {
        const handleEvent = () => {
          window.removeEventListener("locationchange", handleEvent);
          let newPathname = location.pathname;
          resolve(newPathname);
        };
        window.addEventListener("locationchange", handleEvent);
      },
      { once: true }
    );
  }