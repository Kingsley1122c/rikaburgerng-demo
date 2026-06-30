export function wait(milliseconds = 800) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function randomId(prefix = 'ID') {
  const value = Math.floor(Math.random() * 900000 + 100000);
  return `${prefix}-${value}`;
}
