import gsap from 'gsap';

export const fadeIn = (element: HTMLElement) => {
  return gsap.fromTo(element, 
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: 'power2.out' }
  );
};

export const slideIn = (element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'left') => {
  const xOffset = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
  const yOffset = direction === 'top' ? -50 : direction === 'bottom' ? 50 : 0;

  return gsap.from(element, {
    x: xOffset,
    y: yOffset,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
};

export const staggerChildren = (parent: HTMLElement, childSelector: string) => {
  return gsap.from(parent.querySelectorAll(childSelector), {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out'
  });
};

export const scaleIn = (element: HTMLElement) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)'
  });
};

export const modalAnimation = {
  show: (element: HTMLElement) => {
    gsap.fromTo(element, 
      { 
        opacity: 0,
        y: -50,
        scale: 0.9
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      }
    );
  },
  
  hide: (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in'
    });
  }
};

export const movieCardAnimation = {
  hover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.05,
      y: -5,
      duration: 0.3,
      ease: 'power2.out'
    });
  },
  
  unhover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  },

  appear: (element: HTMLElement, delay: number = 0) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: 'power2.out'
      }
    );
  }
};

export const navigationAnimation = {
  linkHover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.2,
      ease: 'power1.out'
    });
  },
  
  linkUnhover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'power1.out'
    });
  }
};

export const buttonAnimation = {
  hover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power1.out'
    });
  },
  
  unhover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'power1.out'
    });
  },
  
  click: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1
    });
  }
};

export const pageTransition = {
  enter: (element: HTMLElement) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  },
  
  exit: (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in'
    });
  }
};

export const listAnimation = {
  stagger: (elements: HTMLElement[]) => {
    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }
};

export const randomMovieAnimation = {
  enter: (element: HTMLElement) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.9,
        rotateY: -15
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out'
      }
    );
  },
  
  shuffle: (element: HTMLElement) => {
    return gsap.to(element, {
      rotateY: 180,
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(element, { rotateY: -180 });
        gsap.to(element, {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  }
};

export const listTopAnimation = {
  container: (element: HTMLElement) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  },
  
  items: (elements: HTMLElement[]) => {
    gsap.fromTo(elements,
      {
        opacity: 0,
        x: -30,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );
  },

  highlight: (element: HTMLElement) => {
    gsap.fromTo(element,
      {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      },
      {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        duration: 1,
        ease: 'power2.out'
      }
    );
  }
};

export const genresListAnimation = {
    stagger: (elements: HTMLElement[]) => {
        gsap.fromTo(elements,
            {
                opacity: 0,
                scale: 0.8,
                rotateX: -15
            },
            {
                opacity: 1,
                scale: 1,
                rotateX: 0,
                duration: 0.6,
                stagger: {
                    each: 0.09,
                    from: "start",
                },
                ease: "back.out(1.4)",
                clearProps: "transform"
            }
        );
    },

    hover: (element: HTMLElement) => {
        gsap.killTweensOf(element);
        gsap.to(element, {
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            y: -5,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
        });
    },

    unhover: (element: HTMLElement) => {
        gsap.killTweensOf(element);
        gsap.to(element, {
            scale: 1,
            boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
            y: 0,
            duration: 0.3,
            ease: "power2.inOut",
            overwrite: "auto"
        });
    }
};