export const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  const popStateEvent = new PopStateEvent('popstate');
  window.dispatchEvent(popStateEvent);
};

export const goBack = () => {
  window.history.back();
  const popStateEvent = new PopStateEvent('popstate');
  window.dispatchEvent(popStateEvent);
}

export const goForward = () => {
  window.history.forward();
  const popStateEvent = new PopStateEvent('popstate');
  window.dispatchEvent(popStateEvent);
};