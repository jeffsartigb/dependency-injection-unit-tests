import dotenv from "dotenv";
import { badApp } from "./bad/Users/app";
import { goodApp } from "./good/ToDo/app";
import figlet from "figlet";

dotenv.config();

figlet(process.env.APP_NAME as string, (err, res) => {
  if (err) {
    console.log(process.env.APP_NAME);
    return;
  }
  console.log(res);
});

badApp.listen(process.env.BAD_APP_PORT, () => {
  console.log(`Bad App server listening to port ${process.env.BAD_APP_PORT}`);
});

goodApp.listen(process.env.GOOD_APP_PORT, () => {
  console.log(`Good App server listening to port ${process.env.GOOD_APP_PORT}`);
});
