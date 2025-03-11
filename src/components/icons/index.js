// src/components/icons/index.js
import Vue from 'vue';

// Basic block icons
const HeadingIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('path', {
        attrs: {
          d: 'M6 4v16M18 4v16M8 9h8M8 15h8'
        }
      })
    ]);
  }
};

const TextIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('polyline', {
        attrs: {
          points: '4 7 4 4 20 4 20 7'
        }
      }),
      h('line', {
        attrs: {
          x1: '9',
          y1: '20',
          x2: '15',
          y2: '20'
        }
      }),
      h('line', {
        attrs: {
          x1: '12',
          y1: '4',
          x2: '12',
          y2: '20'
        }
      })
    ]);
  }
};

const BulletIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('line', {
        attrs: {
          x1: '8',
          y1: '6',
          x2: '21',
          y2: '6'
        }
      }),
      h('line', {
        attrs: {
          x1: '8',
          y1: '12',
          x2: '21',
          y2: '12'
        }
      }),
      h('line', {
        attrs: {
          x1: '8',
          y1: '18',
          x2: '21',
          y2: '18'
        }
      }),
      h('circle', {
        attrs: {
          cx: '4',
          cy: '6',
          r: '2'
        }
      }),
      h('circle', {
        attrs: {
          cx: '4',
          cy: '12',
          r: '2'
        }
      }),
      h('circle', {
        attrs: {
          cx: '4',
          cy: '18',
          r: '2'
        }
      })
    ]);
  }
};

const FeatureIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('rect', {
        attrs: {
          x: '3',
          y: '3',
          width: '18',
          height: '18',
          rx: '2',
          ry: '2'
        }
      }),
      h('circle', {
        attrs: {
          cx: '8.5',
          cy: '8.5',
          r: '1.5'
        }
      }),
      h('polyline', {
        attrs: {
          points: '21 15 16 10 5 21'
        }
      })
    ]);
  }
};

// Section icons
const HeroIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('polygon', {
        attrs: {
          points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
        }
      })
    ]);
  }
};

const ProductIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('circle', {
        attrs: {
          cx: '9',
          cy: '21',
          r: '1'
        }
      }),
      h('circle', {
        attrs: {
          cx: '20',
          cy: '21',
          r: '1'
        }
      }),
      h('path', {
        attrs: {
          d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'
        }
      })
    ]);
  }
};

const CtaIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('rect', {
        attrs: {
          x: '3',
          y: '3',
          width: '18',
          height: '18',
          rx: '2',
          ry: '2'
        }
      }),
      h('line', {
        attrs: {
          x1: '8',
          y1: '12',
          x2: '16',
          y2: '12'
        }
      }),
      h('line', {
        attrs: {
          x1: '12',
          y1: '8',
          x2: '12',
          y2: '16'
        }
      })
    ]);
  }
};

const AboutIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('circle', {
        attrs: {
          cx: '12',
          cy: '12',
          r: '10'
        }
      }),
      h('line', {
        attrs: {
          x1: '12',
          y1: '16',
          x2: '12',
          y2: '12'
        }
      }),
      h('line', {
        attrs: {
          x1: '12',
          y1: '8',
          x2: '12.01',
          y2: '8'
        }
      })
    ]);
  }
};

const QuizIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('circle', {
        attrs: {
          cx: '12',
          cy: '12',
          r: '10'
        }
      }),
      h('path', {
        attrs: {
          d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'
        }
      }),
      h('line', {
        attrs: {
          x1: '12',
          y1: '17',
          x2: '12.01',
          y2: '17'
        }
      })
    ]);
  }
};

const TeamIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('path', {
        attrs: {
          d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
        }
      }),
      h('circle', {
        attrs: {
          cx: '9',
          cy: '7',
          r: '4'
        }
      }),
      h('path', {
        attrs: {
          d: 'M23 21v-2a4 4 0 0 0-3-3.87'
        }
      }),
      h('path', {
        attrs: {
          d: 'M16 3.13a4 4 0 0 1 0 7.75'
        }
      })
    ]);
  }
};

const TestimonialsIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('path', {
        attrs: {
          d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'
        }
      })
    ]);
  }
};

const TrustIcon = {
  functional: true,
  render(h) {
    return h('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      class: 'h-5 w-5'
    }, [
      h('path', {
        attrs: {
          d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
        }
      })
    ]);
  }
};

// Register all icons as global components
Vue.component('HeadingIcon', HeadingIcon);
Vue.component('TextIcon', TextIcon);
Vue.component('BulletIcon', BulletIcon);
Vue.component('FeatureIcon', FeatureIcon);
Vue.component('HeroIcon', HeroIcon);
Vue.component('ProductIcon', ProductIcon);
Vue.component('CtaIcon', CtaIcon);
Vue.component('AboutIcon', AboutIcon);
Vue.component('QuizIcon', QuizIcon);
Vue.component('TeamIcon', TeamIcon);
Vue.component('TestimonialsIcon', TestimonialsIcon);
Vue.component('TrustIcon', TrustIcon);