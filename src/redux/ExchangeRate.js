import axios from "axios";

export const getExchangeRate = async () => {
  try {
    const response = await axios.get(
      "https://api.exchangerate.host/latest?base=USD&symbols=UAH"
    );
    const rate = response.data.rates.UAH;
    console.log("Курс USD до UAH:", rate);
    return rate;
  } catch (error) {
    console.error("Помилка при отриманні курсу валют:", error);
  }
};
