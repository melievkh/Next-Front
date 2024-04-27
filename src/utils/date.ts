const getFormattedDate = (date: string) => {
  const dateObj = new Date(date);

  const formattedHour = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${month}${day}, ${formattedHour}, ${year}`;
};

export { getFormattedDate };
