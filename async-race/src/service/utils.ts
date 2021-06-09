export const createHtmlElement = (
  tag: keyof HTMLElementTagNameMap = 'div',
  styles: string[] = [],
  innerHTML = ''
) => {
  const element = document.createElement(tag);
  element.classList.add(...styles);
  element.innerHTML = innerHTML;

  return element;
};
