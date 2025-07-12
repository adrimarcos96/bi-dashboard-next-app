export const sleep = async (time: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, time))
}
