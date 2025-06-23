// 微信小程序版本的 requestAnimationFrame 实现
let lastTime = 0;
const callbacks = new Map();
let animationFrameId = 0;

// 模拟 requestAnimationFrame
const requestAnimationFrame = (callback) => {
  const currentTime = Date.now();
  const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
  const id = ++animationFrameId;

  const timeoutId = setTimeout(() => {
    lastTime = Date.now();
    callback(lastTime);
  }, timeToCall);

  callbacks.set(id, timeoutId);
  return id;
};

// 模拟 cancelAnimationFrame
const cancelAnimationFrame = (id) => {
  if (callbacks.has(id)) {
    clearTimeout(callbacks.get(id));
    callbacks.delete(id);
  }
};

export {
  requestAnimationFrame,
  cancelAnimationFrame
};