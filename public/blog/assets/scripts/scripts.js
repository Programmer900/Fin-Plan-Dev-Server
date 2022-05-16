"use strict";

var courseFiles = {
  files: document.querySelectorAll('.courseFiles'),
  maxLength: 4,
  init: function init() {
    courseFiles.files.forEach(function (list) {
      var elements = list.querySelectorAll('.courseFiles__element');
      var list_ul = list.querySelector('.courseFiles__list');
      var tglBtn;

      if (elements.length > 4) {
        courseFiles.createToggleButton(list_ul);
        courseFiles.hideElements(elements);
        tglBtn = list.querySelector('.courseFiles__toggleBtn');

        tglBtn.onclick = function () {
          var text = tglBtn.querySelector('.text');

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
    elements.forEach(function (element, index) {
      if (index >= 4) {
        element.closest('li').style.display = null;
      }
    });
  },
  hideElements: function hideElements(elements) {
    elements.forEach(function (element, index) {
      if (index >= 4) {
        element.closest('li').style.display = 'none';
      }
    });
  },
  createToggleButton: function createToggleButton(container) {
    var button = document.createElement('button');
    var icon = document.createElement('span');
    var text = document.createElement('span');
    button.classList.add('courseFiles__toggleBtn', 'more');
    icon.classList.add('icon', 'icon-arr_rounded_right');
    text.classList.add('text');
    text.innerHTML = 'Посмотреть все';
    button.appendChild(icon);
    button.appendChild(text);
    container.appendChild(button);
  }
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
    var menu = this.menu.cloneNode(true);
    var hamburger = this.hamburger.cloneNode(true);
    var search = this.search.cloneNode(true);
    var user = this.user.cloneNode(true);
    var logout = this.logout.cloneNode(true);
    var lang = this.lang.cloneNode(true);
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
      header.body.classList.add('sideMenuIsOpened');
      setTimeout(function () {
        body.attach();
      }, 600);
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
  }
};
header.duplicateElements();
header.hamburgerInit();
var lessonVideo = {
  videoOuter: document.querySelector('.lessonVideo'),
  lessonsList: document.querySelector('.lessonVideo__list'),
  toggleButton: document.querySelector('.lessonVideo__listToggle'),
  init: function init() {
    var _this = this;

    if (lessonVideo.toggleButton) {
      lessonVideo.toggleButton.onclick = function () {
        _this.toggleLessonsList();
      };
    }
  },
  toggleLessonsList: function toggleLessonsList() {
    var btnIcon = this.toggleButton.querySelector('.icon');

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
  }
};
lessonVideo.init();
var modal = {
  modals: document.querySelectorAll('.modal'),
  buttonsOpen: document.querySelectorAll('*[data-modal]'),
  init: function init() {
    modal.buttonsOpen.forEach(function (button) {
      var modalId = button.getAttribute('data-modal');

      button.onclick = function () {
        return modal.showModal(modalId);
      };
    });
    modal.modals.forEach(function (modalElement) {
      var id = modalElement.getAttribute('id');
      var beforeBlock = modalElement.querySelector('.before');
      var closeBtn = modalElement.querySelector('.modal__close');

      beforeBlock.onclick = function () {
        return modal.hideModal(id);
      };

      closeBtn.onclick = function () {
        return modal.hideModal(id);
      };
    });
  },
  showModal: function showModal(id) {
    var modal = document.getElementById(id);
    body.attach();
    modal.classList.add('opened');
    setTimeout(function () {
      modal.style.opacity = '1';
    }, 10);
  },
  hideModal: function hideModal(id) {
    var modal = document.getElementById(id);
    modal.style.opacity = null;
    setTimeout(function () {
      modal.classList.remove('opened');
      body.detach();
    }, 200);
  }
};
modal.init();
var floatPanel = {
  panel: document.querySelector('.panelFloat'),
  container: document.querySelector('.panelFloat').querySelector('.container'),
  init: function init() {
    var header = document.querySelector('.header');
    var hamburger = header.querySelector('.hamburger').cloneNode(true);
    floatPanel.container.prepend(hamburger);

    hamburger.onclick = function () {
      document.querySelector('body').classList.add('sideMenuIsOpened');
      setTimeout(function () {
        body.attach();
      }, 600);
    };
  },
  onPageScroll: function onPageScroll() {
    var offsetTop = floatPanel.panel.getBoundingClientRect().y;
    var timeoutShow, timeoutHide;

    if (offsetTop <= 0) {
      clearTimeout(timeoutHide);
      timeoutShow = setTimeout(function () {
        floatPanel.panel.classList.add('buttonsShowed');
      }, 100);
    } else {
      clearTimeout(timeoutHide);
      timeoutHide = setTimeout(function () {
        floatPanel.panel.classList.remove('buttonsShowed');
      }, 100);
    }
  }
};
floatPanel.init();
var recommend = {
  recommends: document.querySelectorAll('.recommend__list'),
  init: function init() {
    recommend.recommends.forEach(function (list) {
      var elements = list.querySelectorAll('li');
      var elementsCount = elements.length;

      if (elementsCount > 3) {
        var parent = list.parentNode;
        var hdnList = document.createElement('ul');
        hdnList.classList.add('recommend__list', 'spoiler');
        elements.forEach(function (elem, index) {
          if (index > 2) {
            hdnList.appendChild(elem);
          }
        });
        var hdnBtn = document.createElement('button');
        var hdnBtnIcon = document.createElement('span');
        var hdnBtnText = document.createElement('span');
        hdnBtn.classList.add('more', 'recommend__toggleBtn');
        hdnBtnIcon.classList.add('icon', 'icon-arr_rounded_right');
        hdnBtnText.classList.add('text');
        hdnBtnText.innerHTML = "\u0415\u0449\u0451 ".concat(elementsCount - 3);
        hdnBtn.setAttribute('data-count', elementsCount - 3 + '');
        hdnBtn.appendChild(hdnBtnIcon);
        hdnBtn.appendChild(hdnBtnText);
        parent.appendChild(hdnList);
        parent.appendChild(hdnBtn);
        hdnBtn.addEventListener('click', function (event) {
          recommend.toggleList(hdnList, hdnBtn);
        });
      }
    });
  },
  toggleList: function toggleList(list, button) {
    var count = button.getAttribute('data-count');
    var buttonText = button.querySelector('.text');

    if (list.classList.contains('opened')) {
      list.style.opacity = '0';
      setTimeout(function () {
        list.removeAttribute('style');
        list.classList.remove('opened');
        buttonText.innerHTML = "\u0415\u0449\u0451 ".concat(count);
      }, 200);
    } else {
      list.classList.add('opened');
      buttonText.innerHTML = 'Скрыть';
      setTimeout(function () {
        list.style.opacity = '1';
      }, 10);
    }
  }
};
recommend.init();
var search = {
  buttons: document.querySelectorAll('.searchOpenBtn'),
  buttonClose: document.querySelector('.searchPanel__close'),
  before: document.querySelector('.searchPanel .before'),
  panel: document.querySelector('.searchPanel'),
  navLinks: document.querySelectorAll('.searchPanel__nav .smartNav a'),
  nav: document.querySelector('.searchPanel__nav'),
  init: function init() {
    search.buttons.forEach(function (button) {
      button.addEventListener('click', search.showPanel);
    });
    search.navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var li = link.parentNode;
        search.nav.querySelector('li.active').classList.remove('active');
        li.classList.add('active');
        document.querySelector(link.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
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
    setTimeout(function () {
      search.panel.classList.add('opened');
    }, 10);
  },
  hidePanel: function hidePanel() {
    body.detach();
    search.panel.classList.remove('opened');
    setTimeout(function () {
      search.panel.style.display = null;
    }, 200);
  }
};
search.init();

if (document.querySelector('.sliderArticles')) {
  var sliders = document.querySelectorAll('.sliderArticles');
  sliders.forEach(function (elem) {
    var slider = tns({
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
          items: 1
        },
        568: {
          items: 2
        },
        992: {
          items: 3
        },
        1366: {
          items: 4
        }
      }
    });
    var btnPrev = elem.closest('.sliderArticlesOuter').querySelector('button.arr-left');
    var btnNext = elem.closest('.sliderArticlesOuter').querySelector('button.arr-right');

    btnPrev.onclick = function () {
      return slider.goTo('prev');
    };

    btnNext.onclick = function () {
      return slider.goTo('next');
    };
  });
}

if (document.querySelector('.sliderTop')) {
  var slider = tns({
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
      992: {}
    }
  });
}

if (document.querySelector('.sliderVideo')) {
  var _sliders = document.querySelectorAll('.sliderVideo');

  _sliders.forEach(function (elem) {
    var slider = tns({
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
          items: 1
        },
        568: {
          items: 2
        }
      }
    });
    var btnPrev = elem.closest('.sliderVideoOuter').querySelector('button.arr-left');
    var btnNext = elem.closest('.sliderVideoOuter').querySelector('button.arr-right');

    btnPrev.onclick = function () {
      return slider.goTo('prev');
    };

    btnNext.onclick = function () {
      return slider.goTo('next');
    };
  });
}

if (document.querySelector('.tickerTop')) {
  var _slider = tns({
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
      992: {}
    }
  });
}

var filter = {
  filters: document.querySelectorAll('.filter'),
  maxListHeight: 130,
  init: function init() {
    filter.filters.forEach(function (flt) {
      var elements = flt.querySelectorAll('.filterElement');
      var buttons = flt.querySelectorAll('.filterElement__btn');
      var collapseBtn = flt.querySelector('.filter__toggleBtn');
      var allBtn = flt.querySelector('.filterElement.all');
      buttons.forEach(function (button) {
        var parent = button.closest('.filterElement');
        var unselectBtn = parent.querySelector('.filterElement__close');

        button.onclick = function () {
          if (!parent.classList.contains('active')) {
            if (parent.classList.contains('all')) {
              elements.forEach(function (element) {
                element.classList.remove('active');
              });
            } else if (!!allBtn) {
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
    filter.filters.forEach(function (flt) {
      return filter._checkHeight(flt);
    });
  },
  _checkHeight: function _checkHeight(flt) {
    var inner = flt.querySelector('.filter__inner');
    var list = flt.querySelector('.filter__list');
    var collapseBtn = flt.querySelector('.filter__toggleBtn');
    var listHeight = list.offsetHeight;

    if (listHeight > filter.maxListHeight) {
      if (!flt.classList.contains('expanded')) {
        inner.style.height = filter.maxListHeight + 'px';
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
    var isExpanded = flt.classList.contains('expanded');

    if (isExpanded) {
      filter.collapseList(flt);
    } else {
      filter.expandList(flt);
    }
  },
  collapseList: function collapseList(flt) {
    console.log('!!!');
    var inner = flt.querySelector('.filter__inner');
    var collapseBtn = flt.querySelector('.filter__toggleBtn');
    inner.style.height = filter.maxListHeight + 'px';
    collapseBtn.querySelector('.text').innerHTML = "Показать больше";
    flt.classList.remove('expanded');
  },
  expandList: function expandList(flt) {
    var inner = flt.querySelector('.filter__inner');
    var collapseBtn = flt.querySelector('.filter__toggleBtn');
    inner.style.height = null;
    collapseBtn.querySelector('.text').innerHTML = "Свернуть";
    flt.classList.add('expanded');
  }
};
filter.init();
var postAnnotation = {
  anchors: document.querySelectorAll('.postAnnotationAnchor, .postText *[data-anchor]'),
  init: function init() {
    postAnnotation.anchors.forEach(function (anchor) {
      var id = !!anchor.getAttribute('data-anchor') ? anchor.getAttribute('data-anchor') : anchor.getAttribute('href');
      var hasWrapper = !!anchor.closest('.postAnnotationWrapper');
      var parent = hasWrapper ? anchor.closest('.postAnnotationWrapper') : anchor.closest('p');
      var annotation = document.querySelector(id);
      var isStock = annotation.classList.contains('stock');
      var outer = document.createElement('div');
      outer.classList.add('postAnnotationOuter');
      parent.insertAdjacentElement('beforebegin', outer);

      if (!hasWrapper) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('postAnnotationWrapper');
        parent.insertAdjacentElement('beforebegin', wrapper);
        wrapper.appendChild(parent);
        outer.appendChild(wrapper);
      } else {
        outer.appendChild(parent);
      }

      var annotationOuter = document.createElement('div');
      var annotationShadow = document.createElement('div');
      var annotationInner = document.createElement('div');
      var annotationBefore = document.createElement('div');
      var annotationClose = document.createElement('button');
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
      anchor.addEventListener('click', function (event) {
        event.preventDefault();
        var isMobile = document.documentElement.clientWidth < 1200;

        if (isMobile) {
          body.attach();
          setTimeout(function () {
            annotationOuter.style.opacity = '1';
          }, 10);
          setTimeout(function () {
            annotationInner.style.top = '0px';
          }, 100);
        }

        annotationOuter.classList.add('opened');
      });
      annotationClose.addEventListener('click', function (event) {
        var isMobile = document.documentElement.clientWidth < 1200;
        body.detach();

        if (isMobile) {
          annotationOuter.style.opacity = '0';
          annotationInner.style.top = '100vh';
          setTimeout(function () {
            annotationOuter.classList.remove('opened');
          }, 200);
        } else {
          annotationOuter.classList.remove('opened');
        }
      });
      annotationShadow.addEventListener('click', function (event) {
        var isMobile = document.documentElement.clientWidth < 1200;
        body.detach();

        if (isMobile) {
          annotationOuter.style.opacity = '0';
          annotationInner.style.top = '100vh';
          setTimeout(function () {
            annotationOuter.classList.remove('opened');
          }, 200);
        } else {
          annotationOuter.classList.remove('opened');
        }
      });
      annotationOuter.addEventListener('mouseenter', function () {
        postAnnotation.expandAnnotation(annotation, annotationInner, annotationOuter);
      });
      annotationOuter.addEventListener('mouseleave', function () {
        postAnnotation.collapseAnnotation(annotation, annotationInner, annotationOuter);
      });
      postAnnotation.checkHeight();
    });
  },
  checkHeight: function checkHeight() {
    var annotations = document.querySelectorAll('.postAnnotation');
    annotations.forEach(function (annotation) {
      var outer = annotation.closest('.postAnnotationOuter');
      var wrapper = outer.querySelector('.postAnnotationWrapper');
      var inner = annotation.querySelector('.postAnnotation__inner');
      var outerHeight = wrapper.offsetHeight;
      annotation.style.maxHeight = outerHeight + 'px';
    });
  },
  expandAnnotation: function expandAnnotation(annotation, inner, outer) {
    var heightOuter = outer.offsetHeight;
    var height = annotation.offsetHeight;
    var winHeight = document.documentElement.clientHeight - annotation.getBoundingClientRect().top;
    var isBigHeight = height > winHeight;

    if (isBigHeight) {
      height = winHeight;
      annotation.style.overflow = 'auto';
      annotation.style.maxHeight = height + 'px';
    }

    inner.style.maxHeight = heightOuter + 'px';
    setTimeout(function () {
      inner.style.maxHeight = height + 'px';
    }, 10);
    setTimeout(function () {
      if (!isBigHeight) {
        inner.style.maxHeight = null;
      }
    }, 200);
  },
  collapseAnnotation: function collapseAnnotation(annotation, inner, outer) {
    var height = outer.offsetHeight;
    var heightCurrent = annotation.offsetHeight;
    inner.style.overflow = 'hidden';
    inner.style.transition = '0s';
    inner.style.maxHeight = heightCurrent + 'px';
    annotation.style.overflow = null;
    annotation.style.maxHeight = null;
    setTimeout(function () {
      inner.style.transition = '.3s';
      inner.style.maxHeight = height + 'px';
    }, 10);
    setTimeout(function () {
      inner.style.transition = null;
      inner.style.maxHeight = null;
      inner.style.overflow = null;
    }, 200);
  }
};
postAnnotation.init();
var smartNav = {
  navs: document.querySelectorAll('.smartNav'),
  init: function init() {
    smartNav.navs.forEach(function (elem) {
      var outer = document.createElement('div');
      var prev = document.createElement('button');
      var next = document.createElement('button');
      var interval;
      outer.classList.add('smartNav__outer');
      prev.classList.add('smartNav__prev', 'smartNav__btn', 'icon', 'icon-arr_simple_left');
      next.classList.add('smartNav__next', 'smartNav__btn', 'icon', 'icon-arr_simple_right');
      elem.parentNode.insertBefore(outer, elem);
      outer.appendChild(elem);
      outer.prepend(prev);
      outer.append(next);

      prev.onmouseenter = function () {
        interval = setInterval(function () {
          return smartNav.scrollInfinite('left', elem);
        }, 10);
      };

      prev.onmouseleave = function () {
        return clearInterval(interval);
      };

      prev.onclick = function () {
        smartNav.scrollStepByStep('left', elem);
        clearInterval(interval);
      };

      next.onmouseenter = function () {
        interval = setInterval(function () {
          return smartNav.scrollInfinite('right', elem);
        }, 10);
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
    var startTime = Date.now();

    var render = function render() {
      var dt = Date.now() - startTime;

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
    smartNav.navs.forEach(function (nav) {
      var activeCount = 0;
      nav.querySelectorAll('li').forEach(function (li) {
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
    smartNav.navs.forEach(function (nav) {
      var outer = nav.closest('.smartNav__outer');

      if (nav.scrollWidth > nav.offsetWidth) {
        outer.classList.add('with__buttons');
      } else {
        outer.classList.remove('with__buttons');
      }
    });
  }
};
smartNav.init();
smartNav.hasScrollCheck();
var tabsNav = {
  navs: document.querySelectorAll('.tabsNav'),
  init: function init() {
    tabsNav.navs.forEach(function (nav) {
      var activeCount = 0;
      nav.querySelectorAll('a').forEach(function (link) {
        if (link.closest('li').classList.contains('active')) {
          var address = link.getAttribute('href');
          tabsNav.showTab(address);
        }

        link.onclick = function (e) {
          var target = e.target;
          var li = target.closest('li');
          var tab = target.getAttribute('data-type');
          var address = target.getAttribute('href');

          if (tab && tab === 'tab') {
            e.preventDefault();
            nav.querySelectorAll('li').forEach(function (elem) {
              elem.classList.remove('active');
            });
            li.classList.add('active');
            tabsNav.showTab(address);
          }
        };
      });

      if (activeCount === 0) {
        var firstLi = nav.querySelectorAll('li')[0];
        var address = firstLi.querySelector('a').getAttribute('href');
        firstLi.classList.add('active');
        tabsNav.showTab(address);
      }
    });
  },
  showTab: function showTab(hash) {
    var tab = document.querySelector(hash);

    if (tab) {
      var parent = tab.closest('.tabs');
      parent.querySelectorAll('.tab').forEach(function (elem) {
        elem.classList.remove('active');
      });
      tab.classList.add('active');
    }
  }
};
tabsNav.init();
var floatMenu = {
  _menu: document.querySelector('.menuFloat'),
  _menuInner: document.querySelector('.menuFloat__inner'),
  reinit: function reinit() {
    floatMenu._menu.style.top = null;
    var height = floatMenu._menuInner.offsetHeight;
    var top = parseInt(getComputedStyle(floatMenu._menu).top);
    floatMenu._menu.style.top = height + top + 'px';
  }
};
floatMenu.reinit();
"use strict";
"use strict";

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
  }
};
"use strict";

window.addEventListener('scroll', function (e) {
  floatPanel.onPageScroll();
});
window.addEventListener('resize', function (e) {
  floatMenu.reinit();
  smartNav.hasScrollCheck();
  filter.checkFiltersHeight();
  postAnnotation.checkHeight();
});
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM is loaded');
});
document.fonts.ready.then(function () {
  smartNav.scrollToActive();
});
"use strict";

// placeholders
var checkType = function checkType(ths) {
  return ths.getAttribute("type") !== "submit" && ths.getAttribute("type") !== "radio" && ths.getAttribute("type") !== "checkbox" && ths.getAttribute("type") !== "file";
};

var initPlaceholders = function initPlaceholders() {
  var elements = document.querySelectorAll("input, textarea");

  var _loop = function _loop(i) {
    var ths = elements[i];
    var thsType = checkType(ths) ? "txt" : "not_txt";

    if (thsType === "txt") {
      if (ths.classList) {
        if (!ths.classList.contains("simple") && !ths.classList.contains("no_placeholder")) {
          if (!ths.getAttribute("data-placeholder")) {
            ths.setAttribute("data-placeholder", ths.getAttribute("placeholder"));
          }

          var placeholderTxt = ths.getAttribute("data-placeholder");
          var parent = ths.parentNode;

          if (parent.querySelector(".placeholder") === null) {
            ths.insertAdjacentHTML("afterend", "<span class=\"placeholder\">" + placeholderTxt + "</span>");
          }
        }
      }
    } // adding "notempty" class


    ths.onfocus = function (e) {
      return checkOnFocus(e.target);
    };

    var checkOnFocus = function checkOnFocus(elem) {
      var parent = elem.parentNode;

      if (checkType(elem) === true) {
        parent.classList.add("active");
        elem.addEventListener("keydown keyup keypress", function () {
          if (elem.value !== "") {
            parent.classList.add("notempty");
          } else {
            parent.classList.remove("notempty");
          }
        });

        elem.onblur = function () {
          if (elem.value === "") {
            parent.classList.remove("active");
            parent.classList.remove("notempty");
          } else {
            parent.classList.add("notempty");
          }
        };
      }
    };

    var checkOnLoad = function checkOnLoad(elem) {
      var parent = elem.parentNode;

      if (checkType(ths) === true) {
        if (elem.value !== "") {
          parent.classList.add("notempty");
        }
      }
    };

    checkOnLoad(ths);
  };

  for (var i = 0; i < elements.length; i++) {
    _loop(i);
  } // adding "active" class


  var placeholders = document.querySelectorAll(".placeholder");

  for (var _i = 0; _i < placeholders.length; _i++) {
    placeholders[_i].onclick = function (e) {
      var ths = e.target;
      var parent = ths.parentNode;

      if (parent.querySelector("input, textarea") !== null) {
        var elem = parent.querySelector("input, textarea");

        if (!elem.hasAttribute("disabled")) {
          parent.classList.add("active");
          elem.focus();
        }
      }
    };
  }
};

initPlaceholders(); // radio & checkboxes

var radioCheckboxes = function radioCheckboxes() {
  var checkboxes = document.querySelectorAll(".checkbox");

  for (var i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].querySelector("input[type=\"checkbox\"]").hasAttribute("id")) {
      checkboxes[i].querySelector("input[type=\"checkbox\"]").setAttribute("id", "checkbox_" + i);
      checkboxes[i].querySelector("label").setAttribute("for", "checkbox_" + i);
    }
  }

  var radio = document.querySelectorAll(".radio");

  for (var _i2 = 0; _i2 < radio.length; _i2++) {
    if (!radio[_i2].querySelector("input[type=\"radio\"]").hasAttribute("id")) {
      radio[_i2].querySelector("input[type=\"radio\"]").setAttribute("id", "radio_" + _i2);

      radio[_i2].querySelector("label").setAttribute("for", "radio_" + _i2);
    }
  }
};

radioCheckboxes();
"use strict";

var onscreenConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};
var onscreen = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
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
var onscreenElements = document.querySelectorAll('.onscreen');
onscreenElements.forEach(function (elem) {
  onscreen.observe(elem);
});
"use strict";

(function (window, document, undefined) {
  "use strict"; // List of Video Vendors embeds you want to support

  var players = 'iframe[src*="youtube.com"]'; // Select videos

  var fitVids = document.querySelectorAll(players); // If there are videos on the page...

  if (fitVids.length) {
    // Loop through videos
    for (var i = 0; i < fitVids.length; i++) {
      // Get Video Information
      var fitVid = fitVids[i];
      var width = fitVid.getAttribute("width");
      var height = fitVid.getAttribute("height");
      var aspectRatio = height / width;
      var parentDiv = fitVid.parentNode; // Wrap it in a DIV

      var div = document.createElement("div");
      div.className = "fitVids-wrapper";
      div.style.paddingBottom = aspectRatio * 100 + "%";
      parentDiv.insertBefore(div, fitVid);
      fitVid.remove();
      div.appendChild(fitVid); // Clear height/width from fitVid

      fitVid.removeAttribute("height");
      fitVid.removeAttribute("width"); // Add other tricks

      fitVid.setAttribute('src', fitVid.getAttribute('src') + '?rel=0&modestbranding=1');
    }
  }
})(window, document);