

export default function updateHash() {
    return new Promise(
      (resolve, reject) => {
        const handleEvent = () => {
          window.removeEventListener("hashchange", handleEvent);
          const newHash = location.hash;
          resolve(newHash);
        };
        window.addEventListener("hashchange", handleEvent);
      },
      { once: true }
    );
  }