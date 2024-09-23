export const smoothScrollToTop = (duration = 1000, callback?: () => void) => {
  const start = window.scrollY;
  const startTime = performance.now();

  const scroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const ease = progress * (2 - progress);

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scroll);
    } else if (callback) {
      callback();
    }
  };

  requestAnimationFrame(scroll);
};

export const smoothScrollToTopSecondVersion = (duration = 1000) => {
  const start = window.scrollY;
  const startTime = performance.now();

  const scroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const ease = progress * (2 - progress);
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};
