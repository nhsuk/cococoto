import DesignExample from './design-example';

// Design examples
document.querySelectorAll(DesignExample.selector()).forEach((el) => {
  new DesignExample(el);
});
