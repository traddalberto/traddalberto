/* eslint import/prefer-default-export: 0 */
import BezierEasing from './bezierEasing';

import { windowGlobal } from '../constants';

/**
 * Scroll smoothly to a position in window
 *
 * @param {scrollTargetY} scrollTargetY - the target scrollY property of the window
 * @param {speed} speed - time in pixels per second
 * @param {cubicBezier} cubicBezier - cubic easing equation to use
 */
// function based on https://stackoverflow.com/a/26798337
export const smoothScrollToY = (scrollTargetY = 0, speed = 800, cubicBezier = [0.4, 0, 0.2, 1]) => {
  const { scrollY } = window;
  let currentTime = 0;
  const easing = BezierEasing(...cubicBezier);

  if (scrollY === scrollTargetY) return;

  // min time .1, max time .8 seconds
  const time = Math.max(
    0.1,
    Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8),
  );

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    const p = currentTime / time;
    const t = easing(p);

    if (p < 1) {
      windowGlobal.requestAnimationFrame(tick);

      windowGlobal.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    } else {
      windowGlobal.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
};

export const getInnerHeight = () => windowGlobal.innerHeight;

