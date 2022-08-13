export default function sleepService(msec: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, msec);
  });
}
