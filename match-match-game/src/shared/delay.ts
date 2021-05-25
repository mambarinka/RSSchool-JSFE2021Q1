export function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
//  эта функция превращает таймаут в промис, т.е. функция создает новый промис,
//  который резолвается (завершает свое выполнение), когда отработает settimeOut
