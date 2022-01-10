(() => {
  const stepEls = document.querySelectorAll('.step');
  const graphicEls = document.querySelectorAll('.graphic-item');
  let currentItem = graphicEls[0]; // 현재 활성화된(.visible이 붙은) .graphic-item을 지정하고 있는 변수
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
    console.log(ioIndex);
  });

  for (let i = 0; i < stepEls.length; i++) {
    io.observe(stepEls[i]);
    // stepEls[i].setAttribute('data-index', i);
    stepEls[i].dataset.index = i;
    graphicEls[i].dataset.index = i;
  }

  function activate() {
    currentItem.classList.add('visible');
  }

  function inactivate() {
    currentItem.classList.remove('visible');
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
        activate();
      }
    }
  });

  activate();
})();
