const getExistingFilelist = (urls?: string[]) => {
  if (!urls) return [];

  return urls.map((url, index) => ({
    uid: String(index),
    name: 'image.png',
    status: 'done',
    url,
  }));
};

export { getExistingFilelist };
