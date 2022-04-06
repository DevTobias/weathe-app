/**
 * Appends at the clicked position an adds the provided class to play
 * the configured animation.
 *
 * @param event             The fired click event.
 * @param rippleClass       The class which should play the animation.
 * @param className    ('') Additional class names to style the animation.
 */
const createClickAnimation = (event: React.MouseEvent, rippleClass: string, className = '') => {
  const target = event.currentTarget;
  const targetRect = target.getBoundingClientRect();

  // Calculate values of the circle (initial the max dimension times some shrink factor)
  const circle = document.createElement('span');
  const diameter = Math.max(target.clientWidth, target.clientHeight) * 0.33;
  const radius = diameter / 2;

  // Set the position of the circle to the position clicked relative inside the target
  circle.setAttribute('aria-hidden', 'true');
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - targetRect.left - radius}px`;
  circle.style.top = `${event.clientY - targetRect.top - radius}px`;

  // Play the animation
  circle.classList.add(rippleClass, ...className.split(' '));

  // If an old ripple is animating / was animated, delete the span
  const ripple = target.getElementsByClassName(rippleClass)[0];
  if (ripple) ripple.remove();

  target.appendChild(circle);
};

export default createClickAnimation;
