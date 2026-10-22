// Program tabs
const tabWrapper = document.querySelector(".wrapper_tabcontent");

if (tabWrapper) {
  const tabLinks = Array.from(document.querySelectorAll(".tablinks"));
  const tabContent = Array.from(tabWrapper.querySelectorAll(".tabcontent"));
  let activeTab = tabWrapper.querySelector(".tabcontent.active-tab");
  let resizeFrame;
  let isAnimating = false;

  function getTabContentHeight(tab) {
    const styles = window.getComputedStyle(tabWrapper);
    const padding =
      parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

    return Math.ceil(tab.getBoundingClientRect().height + padding);
  }

  function updateTabHeight() {
    if (activeTab) {
      const height = getTabContentHeight(activeTab) + "px";

      if (tabWrapper.style.height !== height) {
        tabWrapper.style.height = height;
      }
    }
  }

  function showTab(link, tab, animate) {
    if (!tab || (tab === activeTab && !isAnimating)) {
      return;
    }

    const previousTab = activeTab;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shouldAnimate = animate && previousTab && !prefersReducedMotion;

    if (shouldAnimate) {
      const currentHeight = getTabContentHeight(activeTab) + "px";

      if (tabWrapper.style.height !== currentHeight) {
        tabWrapper.style.height = currentHeight;
      }
      tabWrapper.classList.add("is-animating");
    } else {
      tabWrapper.classList.remove("is-animating");
    }

    tabContent.forEach(function (content) {
      const isActive = content === tab;
      content.classList.toggle("active-tab", isActive);
      content.setAttribute("aria-hidden", String(!isActive));
      content.inert = !isActive;
    });

    tabLinks.forEach(function (tabLink) {
      const isActive = tabLink === link;
      tabLink.classList.toggle("active-tab", isActive);
      tabLink.setAttribute("aria-selected", String(isActive));
      tabLink.tabIndex = isActive ? 0 : -1;
    });

    activeTab = tab;
    tabWrapper.setAttribute("aria-labelledby", link.id);
    const targetHeight = getTabContentHeight(tab) + "px";

    if (shouldAnimate && tabWrapper.style.height === targetHeight) {
      isAnimating = false;
      window.requestAnimationFrame(function () {
        if (activeTab === tab && !isAnimating) {
          tabWrapper.classList.remove("is-animating");
        }
      });
      return;
    }

    if (tabWrapper.style.height !== targetHeight) {
      tabWrapper.style.height = targetHeight;
    }
    isAnimating = shouldAnimate;
  }

  tabLinks.forEach(function (link, index) {
    link.addEventListener("click", function () {
      const tab = document.getElementById(link.dataset.program);
      showTab(link, tab, true);
    });

    link.addEventListener("keydown", function (event) {
      let nextIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % tabLinks.length;
          break;
        case "ArrowLeft":
          nextIndex = (index - 1 + tabLinks.length) % tabLinks.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabLinks.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      tabLinks[nextIndex].focus();
      tabLinks[nextIndex].click();
    });
  });

  tabWrapper.addEventListener("transitionend", function (event) {
    if (event.target === tabWrapper && event.propertyName === "height") {
      tabWrapper.classList.remove("is-animating");
      isAnimating = false;
      updateTabHeight();
    }
  });

  tabWrapper.addEventListener("transitioncancel", function (event) {
    if (event.target === tabWrapper && event.propertyName === "height") {
      isAnimating = false;
    }
  });

  document.addEventListener("languagechange", function () {
    window.requestAnimationFrame(updateTabHeight);
  });

  window.addEventListener("resize", function () {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(updateTabHeight);
  });

  if (activeTab) {
    window.requestAnimationFrame(updateTabHeight);
  }
}
