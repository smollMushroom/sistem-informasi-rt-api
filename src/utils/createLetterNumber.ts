import LetterRequestRepository from "../repositories/LetterRequestRepository";

const createLetterNumber = async (): Promise<string> => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;  // 1–12

  const romanMonths = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  const romanMonth = romanMonths[month - 1];

  
  const lastLetter = await LetterRequestRepository.findLastLetterNumber(romanMonth, year);
  let nextNumber = 1;

  if (lastLetter) {
    const parts = lastLetter.split('-');  
    const lastNum = parseInt(parts[0], 10);
    nextNumber = lastNum + 1;
  }

  const formattedNumber = String(nextNumber).padStart(3, '0'); 
  const finalLetterNumber = `${formattedNumber}-${romanMonth}-${year}`;

  return finalLetterNumber;
};

export default createLetterNumber