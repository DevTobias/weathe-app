/**
 * Calculates the inner viewport height and saves it to the root element. This means
 * that things like the mobile url bar are taken into account.
 *
 * @param [id=''] The id of the element, where the inner vh var should get appended. Default is document root.
 *
 * @example min-height: calc(var(--innerVh, 1vh) * 100);
 *
 * @returns A function to unmount the added resize event listener.
 */
const innerVh = (id?: string) => {
  let [lastKnownWidth, lastKnownHeight] = [0, 0];

  const updateProperty = () => {
    const [width, height] = [window.innerWidth, window.innerHeight];

    // If nothing has changed or the the height difference is less than the maximum height
    // of the collapsible ui, then do noting
    if (width === lastKnownWidth && Math.abs(height - lastKnownHeight) <= 100) {
      return;
    }

    // If id is set, query the element, else use the document root (default behaviour)
    const element = id ? document.getElementById(id) : document.documentElement;

    // Calculate the real inner vh unit in pixel and safe it to the root element or the provided one
    element?.style.setProperty(`--innerVh`, `${height / 100}px`);

    // Safe the current height, to later check, if the height was changed
    // after an resize call or not, so useless calculations can be prevented.
    [lastKnownWidth, lastKnownHeight] = [width, height];
  };

  window.addEventListener('resize', updateProperty);
  updateProperty();

  return () => window.removeEventListener('resize', updateProperty);
};

export default innerVh;
