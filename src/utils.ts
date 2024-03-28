// преобразование даты ИЗ Firestore
export const updDate = (seconds: number, nanoseconds: number): string => {
  const totalMilliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(totalMilliseconds);
  const formattedDate = [
    date.getFullYear(), // Year
    (date.getMonth() + 1).toString().padStart(2, "0"), // Month (getMonth() is zero-indexed)
    date.getDate().toString().padStart(2, "0"), // Day
  ].join("-");

  return formattedDate;
};

// преобразование даты ДЛЯ Firestore
export const updDateFirestore = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00Z");
  const millisecondsSinceEpoch = date.getTime();
  const secondsSinceEpoch = Math.floor(millisecondsSinceEpoch / 1000);
  const nanosecondsSinceEpoch = (millisecondsSinceEpoch % 1000) * 1e6;

  const resultDate = {
    nanoseconds: nanosecondsSinceEpoch,
    seconds: secondsSinceEpoch,
  };

  return resultDate;
};
