(() => {
  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    }
  };
  const stepEls = document.querySelectorAll('.step');
  const graphicEls = document.querySelectorAll('.graphic-item');
  let currentItem = graphicEls[0]; // 현재 활성화된(.visible이 붙은) .graphic-item을 지정하고 있는 변수
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
  });

  for (let i = 0; i < stepEls.length; i++) {
    io.observe(stepEls[i]);
    // stepEls[i].setAttribute('data-index', i);
    stepEls[i].dataset.index = i;
    graphicEls[i].dataset.index = i;
  }

  function activate(action) {
    currentItem.classList.add('visible');
    if (action) {
      actions[action](true);
    }
  }

  function inactivate(action) {
    currentItem.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepEls[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate();
        currentItem = graphicEls[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }
  });

  // 새로고침하면 맨 위로 감
  window.addEventListener('load', () => {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  });

  activate();
})();
