export function shadowOnScroll(node: Element) {
  node.classList.add('transition-shadow', 'duration-300');

  function handleScroll() {
    const scrollThreshold = 5;

    const shadow = node.scrollTop > scrollThreshold;
    if (shadow) node.classList.add('shadow-inset-top');
    else node.classList.remove('shadow-inset-top');
  }

  node.addEventListener('scroll', handleScroll);

  return {
    destroy() {
      node.removeEventListener('scroll', handleScroll);
      node.classList.remove('transition-shadow', 'duration-300');
    }
  };
}
