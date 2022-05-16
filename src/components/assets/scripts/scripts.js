/* eslint-disable */

var body = {
  _html: document.querySelector('html'),
  _body: document.querySelector('body'),
  attach: function attach() {
    body._html.style.overflow = 'hidden';
    body._body.style.overflow = 'hidden';
  },
  detach: function detach() {
    body._html.style.overflow = null;
    body._body.style.overflow = null;
  },
  setSticky: function setSticky() {
    body._body.classList.add('sticky');
  },
  removeSticky: function removeSticky() {
    body._body.classList.remove('sticky');
  },
};
('use strict');

window.addEventListener('scroll', (e) => {
  floatPanel.onPageScroll();
});
window.addEventListener('resize', (e) => {
  floatMenu.reinit();
  smartNav.hasScrollCheck();
  filter.checkFiltersHeight();
  postAnnotation.checkHeight();
});
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM is loaded');
});
document.fonts.ready.then(() => {
  smartNav.scrollToActive();
});
('use strict');

// placeholders
const checkType = function checkType(ths) {
  return (
    ths.getAttribute('type') !== 'submit' &&
    ths.getAttribute('type') !== 'radio' &&
    ths.getAttribute('type') !== 'checkbox' &&
    ths.getAttribute('type') !== 'file'
  );
};

const initPlaceholders = function initPlaceholders() {
  const elements = document.querySelectorAll('input, textarea');

  const _loop = function _loop(i) {
    const ths = elements[i];
    const thsType = checkType(ths) ? 'txt' : 'not_txt';

    if (thsType === 'txt') {
      if (ths.classList) {
        if (!ths.classList.contains('simple') && !ths.classList.contains('no_placeholder')) {
          if (!ths.getAttribute('data-placeholder')) {
            ths.setAttribute('data-placeholder', ths.getAttribute('placeholder'));
          }

          const placeholderTxt = ths.getAttribute('data-placeholder');
          const parent = ths.parentNode;

          if (parent.querySelector('.placeholder') === null) {
            ths.insertAdjacentHTML(
              'afterend',
              `<span class="placeholder">${placeholderTxt}</span>`,
            );
          }
        }
      }
    } // adding "notempty" class

    ths.onfocus = function (e) {
      return checkOnFocus(e.target);
    };

    var checkOnFocus = function checkOnFocus(elem) {
      const parent = elem.parentNode;

      if (checkType(elem) === true) {
        parent.classList.add('active');
        elem.addEventListener('keydown keyup keypress', () => {
          if (elem.value !== '') {
            parent.classList.add('notempty');
          } else {
            parent.classList.remove('notempty');
          }
        });

        elem.onblur = function () {
          if (elem.value === '') {
            parent.classList.remove('active');
            parent.classList.remove('notempty');
          } else {
            parent.classList.add('notempty');
          }
        };
      }
    };

    const checkOnLoad = function checkOnLoad(elem) {
      const parent = elem.parentNode;

      if (checkType(ths) === true) {
        if (elem.value !== '') {
          parent.classList.add('notempty');
        }
      }
    };

    checkOnLoad(ths);
  };

  for (let i = 0; i < elements.length; i++) {
    _loop(i);
  } // adding "active" class

  const placeholders = document.querySelectorAll('.placeholder');

  for (let _i = 0; _i < placeholders.length; _i++) {
    placeholders[_i].onclick = function (e) {
      const ths = e.target;
      const parent = ths.parentNode;

      if (parent.querySelector('input, textarea') !== null) {
        const elem = parent.querySelector('input, textarea');

        if (!elem.hasAttribute('disabled')) {
          parent.classList.add('active');
          elem.focus();
        }
      }
    };
  }
};

initPlaceholders(); // radio & checkboxes

const radioCheckboxes = function radioCheckboxes() {
  const checkboxes = document.querySelectorAll('.checkbox');

  for (let i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].querySelector('input[type="checkbox"]').hasAttribute('id')) {
      checkboxes[i].querySelector('input[type="checkbox"]').setAttribute('id', `checkbox_${i}`);
      checkboxes[i].querySelector('label').setAttribute('for', `checkbox_${i}`);
    }
  }

  const radio = document.querySelectorAll('.radio');

  for (let _i2 = 0; _i2 < radio.length; _i2++) {
    if (!radio[_i2].querySelector('input[type="radio"]').hasAttribute('id')) {
      radio[_i2].querySelector('input[type="radio"]').setAttribute('id', `radio_${_i2}`);

      radio[_i2].querySelector('label').setAttribute('for', `radio_${_i2}`);
    }
  }
};

radioCheckboxes();
('use strict');

const onscreenConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};
const onscreen = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('onscreen-true');
      entry.target.classList.remove('onscreen-false');
    } else {
      entry.target.classList.add('onscreen-false');
      entry.target.classList.remove('onscreen-true');
    }

    if (entry.target.classList.contains('sectionTopOuter')) {
      if (entry.isIntersecting) {
        body.removeSticky();
      } else {
        body.setSticky();
      }
    }
  });
}, onscreenConfig);
const onscreenElements = document.querySelectorAll('.onscreen');
onscreenElements.forEach((elem) => {
  onscreen.observe(elem);
});
('use strict');

(function (window, document, undefined) {
  // List of Video Vendors embeds you want to support

  const players = 'iframe[src*="youtube.com"]'; // Select videos

  const fitVids = document.querySelectorAll(players); // If there are videos on the page...

  if (fitVids.length) {
    // Loop through videos
    for (let i = 0; i < fitVids.length; i++) {
      // Get Video Information
      const fitVid = fitVids[i];
      const width = fitVid.getAttribute('width');
      const height = fitVid.getAttribute('height');
      const aspectRatio = height / width;
      const parentDiv = fitVid.parentNode; // Wrap it in a DIV

      const div = document.createElement('div');
      div.className = 'fitVids-wrapper';
      div.style.paddingBottom = `${aspectRatio * 100}%`;
      parentDiv.insertBefore(div, fitVid);
      fitVid.remove();
      div.appendChild(fitVid); // Clear height/width from fitVid

      fitVid.removeAttribute('height');
      fitVid.removeAttribute('width'); // Add other tricks

      fitVid.setAttribute('src', `${fitVid.getAttribute('src')}?rel=0&modestbranding=1`);
    }
  }
})(window, document);
('use strict');

var courseFiles = {
  files: document.querySelectorAll('.courseFiles'),
  maxLength: 4,
  init: function init() {
    courseFiles.files.forEach((list) => {
      const elements = list.querySelectorAll('.courseFiles__element');
      const list_ul = list.querySelector('.courseFiles__list');
      let tglBtn;

      if (elements.length > 4) {
        courseFiles.createToggleButton(list_ul);
        courseFiles.hideElements(elements);
        tglBtn = list.querySelector('.courseFiles__toggleBtn');

        tglBtn.onclick = function () {
          const text = tglBtn.querySelector('.text');

          if (list.classList.contains('opened')) {
            courseFiles.hideElements(elements);
            list.classList.remove('opened');
            text.innerHTML = 'Посмотреть все';
          } else {
            courseFiles.showElements(elements);
            list.classList.add('opened');
            text.innerHTML = 'Скрыть';
          }
        };
      }
    });
  },
  showElements: function showElements(elements) {
    elements.forEach((element, index) => {
      if (index >= 4) {
        element.closest('li').style.display = null;
      }
    });
  },
  hideElements: function hideElements(elements) {
    elements.forEach((element, index) => {
      if (index >= 4) {
        element.closest('li').style.display = 'none';
      }
    });
  },
  createToggleButton: function createToggleButton(container) {
    const button = document.createElement('button');
    const icon = document.createElement('span');
    const text = document.createElement('span');
    button.classList.add('courseFiles__toggleBtn', 'more');
    icon.classList.add('icon', 'icon-arr_rounded_right');
    text.classList.add('text');
    text.innerHTML = 'Посмотреть все';
    button.appendChild(icon);
    button.appendChild(text);
    container.appendChild(button);
  },
};
courseFiles.init();
var header = {
  body: document.querySelector('body'),
  header: document.querySelector('.header'),
  hamburger: document.querySelector('.hamburger'),
  menu: document.querySelector('.menuMain'),
  search: document.querySelector('.searchOpenBtn'),
  user: document.querySelector('.header__user'),
  logout: document.querySelector('.header__logout'),
  lang: document.querySelector('.langPicker'),
  sideMenuBefore: document.querySelector('.sideMenu .before'),
  sideMenuHeader: document.querySelector('.sideMenu__headerInner'),
  sideMenuBody: document.querySelector('.sideMenu__bodyInner'),
  sideMenuClose: document.querySelector('.sideMenu__close'),
  duplicateElements: function duplicateElements() {
    const menu = this.menu.cloneNode(true);
    const hamburger = this.hamburger.cloneNode(true);
    const search = this.search.cloneNode(true);
    const user = this.user.cloneNode(true);
    const logout = this.logout.cloneNode(true);
    const lang = this.lang.cloneNode(true);
    header.sideMenuHeader.appendChild(user);
    header.sideMenuHeader.appendChild(logout);
    header.sideMenuHeader.appendChild(lang);
    header.sideMenuHeader.appendChild(search);
    header.sideMenuBody.appendChild(menu);
  },
  toggleSideMenu: function toggleSideMenu() {
    if (header.body.classList.contains('sideMenuIsOpened')) {
      body.detach();
      header.body.classList.remove('sideMenuIsOpened');
    } else {
      body.attach();
      header.body.classList.add('sideMenuIsOpened');
    }
  },
  closeSideMenu: function closeSideMenu() {
    body.detach();
    header.body.classList.remove('sideMenuIsOpened');
  },
  hamburgerInit: function hamburgerInit() {
    header.hamburger.onclick = this.toggleSideMenu;
    header.sideMenuBefore.onclick = this.toggleSideMenu;
    header.sideMenuClose.onclick = this.toggleSideMenu;
  },
};
header.duplicateElements();
header.hamburgerInit();
var lessonVideo = {
  videoOuter: document.querySelector('.lessonVideo'),
  lessonsList: document.querySelector('.lessonVideo__list'),
  toggleButton: document.querySelector('.lessonVideo__listToggle'),
  init: function init() {
    const _this = this;

    lessonVideo.toggleButton.onclick = function () {
      _this.toggleLessonsList();
    };
  },
  toggleLessonsList: function toggleLessonsList() {
    const btnIcon = this.toggleButton.querySelector('.icon');

    if (this.videoOuter.classList.contains('listOpened')) {
      this.videoOuter.classList.remove('listOpened');
      this.toggleButton.querySelector('.text').innerHTML = 'Список уроков';
      btnIcon.classList.remove('icon-arr_rounded_right');
      btnIcon.classList.add('icon-arr_rounded_left');
    } else {
      this.videoOuter.classList.add('listOpened');
      this.toggleButton.querySelector('.text').innerHTML = 'Свернуть';
      btnIcon.classList.remove('icon-arr_rounded_left');
      btnIcon.classList.add('icon-arr_rounded_right');
    }
  },
};
lessonVideo.init();
var floatPanel = {
  panel: document.querySelector('.panelFloat'),
  container: document.querySelector('.panelFloat').querySelector('.container'),
  init: function init() {
    const header = document.querySelector('.header');
    const hamburger = header.querySelector('.hamburger').cloneNode(true);
    floatPanel.container.prepend(hamburger);

    hamburger.onclick = function () {
      body.attach();
      document.querySelector('body').classList.add('sideMenuIsOpened');
    };
  },
  onPageScroll: function onPageScroll() {
    const offsetTop = floatPanel.panel.getBoundingClientRect().y;
    let timeoutShow;
    let timeoutHide;

    if (offsetTop <= 0) {
      clearTimeout(timeoutHide);
      timeoutShow = setTimeout(() => {
        floatPanel.panel.classList.add('buttonsShowed');
      }, 100);
    } else {
      clearTimeout(timeoutHide);
      timeoutHide = setTimeout(() => {
        floatPanel.panel.classList.remove('buttonsShowed');
      }, 100);
    }
  },
};
floatPanel.init();
var search = {
  buttons: document.querySelectorAll('.searchOpenBtn'),
  buttonClose: document.querySelector('.searchPanel__close'),
  before: document.querySelector('.searchPanel .before'),
  panel: document.querySelector('.searchPanel'),
  navLinks: document.querySelectorAll('.searchPanel__nav .smartNav a'),
  nav: document.querySelector('.searchPanel__nav'),
  init: function init() {
    search.buttons.forEach((button) => {
      button.addEventListener('click', search.showPanel);
    });
    search.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const li = link.parentNode;
        search.nav.querySelector('li.active').classList.remove('active');
        li.classList.add('active');
        document.querySelector(link.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
    search.buttonClose.addEventListener('click', search.hidePanel);
    search.before.addEventListener('click', search.hidePanel);
  },
  showPanel: function showPanel() {
    body.attach();
    search.panel.style.display = 'block';
    header.closeSideMenu();
    setTimeout(() => {
      search.panel.classList.add('opened');
    }, 10);
  },
  hidePanel: function hidePanel() {
    body.detach();
    search.panel.classList.remove('opened');
    setTimeout(() => {
      search.panel.style.display = null;
    }, 200);
  },
};
search.init();
var recommend = {
  recommends: document.querySelectorAll('.recommend__list'),
  init: function init() {
    recommend.recommends.forEach((list) => {
      const elements = list.querySelectorAll('li');
      const elementsCount = elements.length;

      if (elementsCount > 3) {
        const parent = list.parentNode;
        const hdnList = document.createElement('ul');
        hdnList.classList.add('recommend__list', 'spoiler');
        elements.forEach((elem, index) => {
          if (index > 2) {
            hdnList.appendChild(elem);
          }
        });
        const hdnBtn = document.createElement('button');
        const hdnBtnIcon = document.createElement('span');
        const hdnBtnText = document.createElement('span');
        hdnBtn.classList.add('more', 'recommend__toggleBtn');
        hdnBtnIcon.classList.add('icon', 'icon-arr_rounded_right');
        hdnBtnText.classList.add('text');
        hdnBtnText.innerHTML = '\u0415\u0449\u0451 '.concat(elementsCount - 3);
        hdnBtn.setAttribute('data-count', `${elementsCount - 3}`);
        hdnBtn.appendChild(hdnBtnIcon);
        hdnBtn.appendChild(hdnBtnText);
        parent.appendChild(hdnList);
        parent.appendChild(hdnBtn);
        hdnBtn.addEventListener('click', (event) => {
          recommend.toggleList(hdnList, hdnBtn);
        });
      }
    });
  },
  toggleList: function toggleList(list, button) {
    const count = button.getAttribute('data-count');
    const buttonText = button.querySelector('.text');

    if (list.classList.contains('opened')) {
      list.style.opacity = '0';
      setTimeout(() => {
        list.removeAttribute('style');
        list.classList.remove('opened');
        buttonText.innerHTML = '\u0415\u0449\u0451 '.concat(count);
      }, 200);
    } else {
      list.classList.add('opened');
      buttonText.innerHTML = 'Скрыть';
      setTimeout(() => {
        list.style.opacity = '1';
      }, 10);
    }
  },
};
recommend.init();

if (document.querySelector('.sliderArticles')) {
  const sliders = document.querySelectorAll('.sliderArticles');
  sliders.forEach((elem) => {
    const slider = tns({
      container: elem,
      items: 4,
      slideBy: 1,
      gutter: 30,
      mouseDrag: true,
      loop: false,
      rewind: true,
      controls: false,
      nav: false,
      autoplay: false,
      mode: 'carousel',
      animateDelay: 600,
      responsive: {
        0: {
          items: 1,
        },
        568: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1366: {
          items: 4,
        },
      },
    });
    const btnPrev = elem.closest('.sliderArticlesOuter').querySelector('button.arr-left');
    const btnNext = elem.closest('.sliderArticlesOuter').querySelector('button.arr-right');

    btnPrev.onclick = function () {
      return slider.goTo('prev');
    };

    btnNext.onclick = function () {
      return slider.goTo('next');
    };
  });
}

if (document.querySelector('.sliderVideo')) {
  const _sliders = document.querySelectorAll('.sliderVideo');

  _sliders.forEach((elem) => {
    const slider = tns({
      container: elem,
      items: 2,
      slideBy: 1,
      gutter: 30,
      mouseDrag: true,
      loop: false,
      rewind: true,
      controls: false,
      nav: false,
      autoplay: false,
      mode: 'carousel',
      animateDelay: 600,
      responsive: {
        0: {
          items: 1,
        },
        568: {
          items: 2,
        },
      },
    });
    const btnPrev = elem.closest('.sliderVideoOuter').querySelector('button.arr-left');
    const btnNext = elem.closest('.sliderVideoOuter').querySelector('button.arr-right');

    btnPrev.onclick = function () {
      return slider.goTo('prev');
    };

    btnNext.onclick = function () {
      return slider.goTo('next');
    };
  });
}

if (document.querySelector('.sliderTop')) {
  const slider = tns({
    container: '.sliderTop',
    items: 1,
    mouseDrag: true,
    loop: false,
    rewind: true,
    controls: false,
    navPosition: 'bottom',
    autoplay: false,
    mode: 'gallery',
    animateIn: 'tns-fadeIn',
    animateOut: 'tns-fadeOut',
    animateDelay: 600,
    responsive: {
      480: {},
      992: {},
    },
  });
}

if (document.querySelector('.tickerTop')) {
  const _slider = tns({
    container: '.tickerTop',
    axis: 'vertical',
    items: 1,
    mouseDrag: false,
    loop: true,
    rewind: true,
    controls: false,
    nav: false,
    speed: 600,
    autoplay: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    autoplayHoverPause: true,
    animateDelay: 600,
    responsive: {
      480: {},
      992: {},
    },
  });
}

var filter = {
  filters: document.querySelectorAll('.filter'),
  maxListHeight: 130,
  init: function init() {
    filter.filters.forEach((flt) => {
      const elements = flt.querySelectorAll('.filterElement');
      const buttons = flt.querySelectorAll('.filterElement__btn');
      const collapseBtn = flt.querySelector('.filter__toggleBtn');
      const allBtn = flt.querySelector('.filterElement.all');
      buttons.forEach((button) => {
        const parent = button.closest('.filterElement');
        const unselectBtn = parent.querySelector('.filterElement__close');

        button.onclick = function () {
          if (!parent.classList.contains('active')) {
            if (parent.classList.contains('all')) {
              elements.forEach((element) => {
                element.classList.remove('active');
              });
            } else if (allBtn) {
              allBtn.classList.remove('active');
            }

            parent.classList.add('active');
          }
        };

        unselectBtn.onclick = function () {
          parent.classList.remove('active');
        };
      });

      collapseBtn.onclick = function () {
        filter.toggleList(flt);
      };

      filter._checkHeight(flt);
    });
  },
  checkFiltersHeight: function checkFiltersHeight() {
    filter.filters.forEach((flt) => filter._checkHeight(flt));
  },
  _checkHeight: function _checkHeight(flt) {
    const inner = flt.querySelector('.filter__inner');
    const list = flt.querySelector('.filter__list');
    const collapseBtn = flt.querySelector('.filter__toggleBtn');
    const listHeight = list.offsetHeight;

    if (listHeight > filter.maxListHeight) {
      if (!flt.classList.contains('expanded')) {
        inner.style.height = `${filter.maxListHeight}px`;
      }

      collapseBtn.style.display = 'inline-flex';
      flt.classList.add('collapsed');
    } else {
      inner.style.height = null;
      collapseBtn.style.display = null;
      flt.classList.remove('collapsed');
    }
  },
  toggleList: function toggleList(flt) {
    const isExpanded = flt.classList.contains('expanded');

    if (isExpanded) {
      filter.collapseList(flt);
    } else {
      filter.expandList(flt);
    }
  },
  collapseList: function collapseList(flt) {
    console.log('!!!');
    const inner = flt.querySelector('.filter__inner');
    const collapseBtn = flt.querySelector('.filter__toggleBtn');
    inner.style.height = `${filter.maxListHeight}px`;
    collapseBtn.querySelector('.text').innerHTML = 'Показать больше';
    flt.classList.remove('expanded');
  },
  expandList: function expandList(flt) {
    const inner = flt.querySelector('.filter__inner');
    const collapseBtn = flt.querySelector('.filter__toggleBtn');
    inner.style.height = null;
    collapseBtn.querySelector('.text').innerHTML = 'Свернуть';
    flt.classList.add('expanded');
  },
};
filter.init();
var postAnnotation = {
  anchors: document.querySelectorAll('.postAnnotationAnchor, .postText *[data-anchor]'),
  init: function init() {
    postAnnotation.anchors.forEach((anchor) => {
      const id = anchor.getAttribute('data-anchor')
        ? anchor.getAttribute('data-anchor')
        : anchor.getAttribute('href');
      const hasWrapper = !!anchor.closest('.postAnnotationWrapper');
      const parent = hasWrapper ? anchor.closest('.postAnnotationWrapper') : anchor.closest('p');
      const annotation = document.querySelector(id);
      const isStock = annotation.classList.contains('stock');
      const outer = document.createElement('div');
      outer.classList.add('postAnnotationOuter');
      parent.insertAdjacentElement('beforebegin', outer);

      if (!hasWrapper) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('postAnnotationWrapper');
        parent.insertAdjacentElement('beforebegin', wrapper);
        wrapper.appendChild(parent);
        outer.appendChild(wrapper);
      } else {
        outer.appendChild(parent);
      }

      const annotationOuter = document.createElement('div');
      const annotationShadow = document.createElement('div');
      const annotationInner = document.createElement('div');
      const annotationBefore = document.createElement('div');
      const annotationClose = document.createElement('button');
      annotationOuter.classList.add('postAnnotation');
      annotationOuter.setAttribute('id', annotation.getAttribute('id'));
      annotationShadow.classList.add('postAnnotation__before');
      annotationInner.classList.add('postAnnotation__inner');
      annotationBefore.classList.add('before');
      annotationClose.classList.add('postAnnotation__close', 'icon', 'icon-close');
      annotation.classList.add('postAnnotation__text');
      annotation.removeAttribute('id');
      annotationInner.appendChild(annotationBefore);
      annotationInner.appendChild(annotationClose);
      annotationInner.appendChild(annotation);
      annotationOuter.appendChild(annotationShadow);
      annotationOuter.appendChild(annotationInner);

      if (isStock) {
        annotation.classList.remove('stock');
        annotationOuter.classList.add('stock');
      }

      outer.appendChild(annotationOuter);
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const isMobile = document.documentElement.clientWidth < 1200;

        if (isMobile) {
          body.attach();
          setTimeout(() => {
            annotationOuter.style.opacity = '1';
          }, 10);
          setTimeout(() => {
            annotationInner.style.top = '0px';
          }, 100);
        }

        annotationOuter.classList.add('opened');
      });
      annotationClose.addEventListener('click', (event) => {
        const isMobile = document.documentElement.clientWidth < 1200;
        body.detach();

        if (isMobile) {
          annotationOuter.style.opacity = '0';
          annotationInner.style.top = '100vh';
          setTimeout(() => {
            annotationOuter.classList.remove('opened');
          }, 200);
        } else {
          annotationOuter.classList.remove('opened');
        }
      });
      annotationShadow.addEventListener('click', (event) => {
        const isMobile = document.documentElement.clientWidth < 1200;
        body.detach();

        if (isMobile) {
          annotationOuter.style.opacity = '0';
          annotationInner.style.top = '100vh';
          setTimeout(() => {
            annotationOuter.classList.remove('opened');
          }, 200);
        } else {
          annotationOuter.classList.remove('opened');
        }
      });
      annotationOuter.addEventListener('mouseenter', () => {
        postAnnotation.expandAnnotation(annotation, annotationInner, annotationOuter);
      });
      annotationOuter.addEventListener('mouseleave', () => {
        postAnnotation.collapseAnnotation(annotation, annotationInner, annotationOuter);
      });
      postAnnotation.checkHeight();
    });
  },
  checkHeight: function checkHeight() {
    const annotations = document.querySelectorAll('.postAnnotation');
    annotations.forEach((annotation) => {
      const outer = annotation.closest('.postAnnotationOuter');
      const wrapper = outer.querySelector('.postAnnotationWrapper');
      const inner = annotation.querySelector('.postAnnotation__inner');
      const outerHeight = wrapper.offsetHeight;
      annotation.style.maxHeight = `${outerHeight}px`;
    });
  },
  expandAnnotation: function expandAnnotation(annotation, inner, outer) {
    const heightOuter = outer.offsetHeight;
    let height = annotation.offsetHeight;
    const winHeight =
      document.documentElement.clientHeight - annotation.getBoundingClientRect().top;
    const isBigHeight = height > winHeight;

    if (isBigHeight) {
      height = winHeight;
      annotation.style.overflow = 'auto';
      annotation.style.maxHeight = `${height}px`;
    }

    inner.style.maxHeight = `${heightOuter}px`;
    setTimeout(() => {
      inner.style.maxHeight = `${height}px`;
    }, 10);
    setTimeout(() => {
      if (!isBigHeight) {
        inner.style.maxHeight = null;
      }
    }, 200);
  },
  collapseAnnotation: function collapseAnnotation(annotation, inner, outer) {
    const height = outer.offsetHeight;
    const heightCurrent = annotation.offsetHeight;
    inner.style.overflow = 'hidden';
    inner.style.transition = '0s';
    inner.style.maxHeight = `${heightCurrent}px`;
    annotation.style.overflow = null;
    annotation.style.maxHeight = null;
    setTimeout(() => {
      inner.style.transition = '.3s';
      inner.style.maxHeight = `${height}px`;
    }, 10);
    setTimeout(() => {
      inner.style.transition = null;
      inner.style.maxHeight = null;
      inner.style.overflow = null;
    }, 200);
  },
};
postAnnotation.init();
var tabsNav = {
  navs: document.querySelectorAll('.tabsNav'),
  init: function init() {
    tabsNav.navs.forEach((nav) => {
      const activeCount = 0;
      nav.querySelectorAll('a').forEach((link) => {
        if (link.closest('li').classList.contains('active')) {
          const address = link.getAttribute('href');
          tabsNav.showTab(address);
        }

        link.onclick = function (e) {
          const { target } = e;
          const li = target.closest('li');
          const tab = target.getAttribute('data-type');
          const address = target.getAttribute('href');

          if (tab && tab === 'tab') {
            e.preventDefault();
            nav.querySelectorAll('li').forEach((elem) => {
              elem.classList.remove('active');
            });
            li.classList.add('active');
            tabsNav.showTab(address);
          }
        };
      });

      if (activeCount === 0) {
        const firstLi = nav.querySelectorAll('li')[0];
        const address = firstLi.querySelector('a').getAttribute('href');
        firstLi.classList.add('active');
        tabsNav.showTab(address);
      }
    });
  },
  showTab: function showTab(hash) {
    const tab = document.querySelector(hash);

    if (tab) {
      const parent = tab.closest('.tabs');
      parent.querySelectorAll('.tab').forEach((elem) => {
        elem.classList.remove('active');
      });
      tab.classList.add('active');
    }
  },
};
tabsNav.init();
var smartNav = {
  navs: document.querySelectorAll('.smartNav'),
  init: function init() {
    smartNav.navs.forEach((elem) => {
      const outer = document.createElement('div');
      const prev = document.createElement('button');
      const next = document.createElement('button');
      let interval;
      outer.classList.add('smartNav__outer');
      prev.classList.add('smartNav__prev', 'smartNav__btn', 'icon', 'icon-arr_simple_left');
      next.classList.add('smartNav__next', 'smartNav__btn', 'icon', 'icon-arr_simple_right');
      elem.parentNode.insertBefore(outer, elem);
      outer.appendChild(elem);
      outer.prepend(prev);
      outer.append(next);

      prev.onmouseenter = function () {
        interval = setInterval(() => smartNav.scrollInfinite('left', elem), 10);
      };

      prev.onmouseleave = function () {
        return clearInterval(interval);
      };

      prev.onclick = function () {
        smartNav.scrollStepByStep('left', elem);
        clearInterval(interval);
      };

      next.onmouseenter = function () {
        interval = setInterval(() => smartNav.scrollInfinite('right', elem), 10);
      };

      next.onmouseleave = function () {
        return clearInterval(interval);
      };

      next.onclick = function () {
        smartNav.scrollStepByStep('right', elem);
        clearInterval(interval);
      };
    });
  },
  scrollInfinite: function scrollInfinite(direction, nav) {
    if (direction === 'right') {
      nav.scrollLeft += 3;
    } else {
      nav.scrollLeft -= 3;
    }

    return false;
  },
  scrollStepByStep: function scrollStepByStep(direction, nav) {
    const startTime = Date.now();

    const render = function render() {
      const dt = Date.now() - startTime;

      if (dt < 100) {
        if (direction === 'right') {
          nav.scrollLeft += 20;
        } else {
          nav.scrollLeft -= 20;
        }

        requestAnimationFrame(render);
      }
    };

    requestAnimationFrame(render);
  },
  scrollToActive: function scrollToActive() {
    smartNav.navs.forEach((nav) => {
      let activeCount = 0;
      nav.querySelectorAll('li').forEach((li) => {
        if (li.classList.contains('active')) {
          li.scrollIntoView();
          activeCount++;
        }
      });

      if (activeCount === 0) {
        nav.querySelectorAll('li')[0].classList.add('active');
      }
    });
  },
  hasScrollCheck: function hasScrollCheck() {
    smartNav.navs.forEach((nav) => {
      const outer = nav.closest('.smartNav__outer');

      if (nav.scrollWidth > nav.offsetWidth) {
        outer.classList.add('with__buttons');
      } else {
        outer.classList.remove('with__buttons');
      }
    });
  },
};
smartNav.init();
smartNav.hasScrollCheck();
var floatMenu = {
  _menu: document.querySelector('.menuFloat'),
  _menuInner: document.querySelector('.menuFloat__inner'),
  reinit: function reinit() {
    floatMenu._menu.style.top = null;
    const height = floatMenu._menuInner.offsetHeight;
    const top = parseInt(getComputedStyle(floatMenu._menu).top);
    floatMenu._menu.style.top = `${height + top}px`;
  },
};
floatMenu.reinit();
var modal = {
  modals: document.querySelectorAll('.modal'),
  buttonsOpen: document.querySelectorAll('*[data-modal]'),
  init: function init() {
    modal.buttonsOpen.forEach((button) => {
      const modalId = button.getAttribute('data-modal');

      button.onclick = function () {
        return modal.showModal(modalId);
      };
    });
    modal.modals.forEach((modalElement) => {
      const id = modalElement.getAttribute('id');
      const beforeBlock = modalElement.querySelector('.before');
      const closeBtn = modalElement.querySelector('.modal__close');

      beforeBlock.onclick = function () {
        return modal.hideModal(id);
      };

      closeBtn.onclick = function () {
        return modal.hideModal(id);
      };
    });
  },
  showModal: function showModal(id) {
    const modal = document.getElementById(id);
    body.attach();
    modal.classList.add('opened');
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  },
  hideModal: function hideModal(id) {
    const modal = document.getElementById(id);
    modal.style.opacity = null;
    setTimeout(() => {
      modal.classList.remove('opened');
      body.detach();
    }, 200);
  },
};
modal.init();
('use strict');
