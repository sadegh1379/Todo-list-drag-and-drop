export function getTaskAnimationStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { moveTo } = snapshot.dropAnimation;
  // move to the right spot
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  // add a bit of turn for fun
  const rotate = 'rotate(-10deg)';

  // patching the existing style
  return {
    ...style,
    transform: `${translate} ${rotate}`,
    // slowing down the drop because we can
    transition: `all linear 0.3s`,
  };
}