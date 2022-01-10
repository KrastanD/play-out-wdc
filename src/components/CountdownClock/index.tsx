import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { getTimeString } from "../../utils/helperFunctions";

const CountdownClock = () => {
  const [now, setNow] = useState(DateTime.now());

  useEffect(() => {
    const checkTime = setInterval(() => {
      setNow(DateTime.local());
    }, 1000);
    return () => clearInterval(checkTime);
  });

  const bahrainFP1 = DateTime.local(2022, 3, 18);

  const bahrainFP1Month = bahrainFP1.month;
  const bahrainFP1Date = bahrainFP1.day;

  const monthDiff = bahrainFP1Month - now.month;
  const dateDiff = bahrainFP1Date - now.day - 1;
  const hourDiff = 23 - now.hour;
  const minuteDiff = 60 - now.minute;

  const countdownString = `${getTimeString(
    monthDiff,
    "month"
  )}, ${getTimeString(dateDiff, "day")}, 
  ${getTimeString(hourDiff, "hour")}, and
  ${getTimeString(minuteDiff, "minute")}`;

  return (
    <div className="row justify-content-sm-center">
      <h2 className="text-center">Countdown Until FP1 of Bahrain 2022</h2>
      <h3 className="text-center">{countdownString}</h3>
    </div>
  );
};

export default CountdownClock;
