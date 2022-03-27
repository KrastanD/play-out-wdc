import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { getTimeString } from "../../utils/helperFunctions";

function CountdownClock() {
  const [now, setNow] = useState(DateTime.now());

  useEffect(() => {
    const checkTime = setInterval(() => {
      setNow(DateTime.local());
    }, 1000);
    return () => clearInterval(checkTime);
  });

  const bahrainFP1 = DateTime.utc(2022, 3, 18, 12, 0, 0);

  const timeDiff = bahrainFP1
    .diff(now, ["months", "days", "hours", "minutes", "seconds"])
    .toObject();

  const countdownString = `${getTimeString(
    timeDiff.months ?? 0,
    "month"
  )}, ${getTimeString(timeDiff.days ?? 0, "day")}, 
    ${getTimeString(timeDiff.hours ?? 0, "hour")}, and
    ${getTimeString(timeDiff.minutes ?? 0, "minute")}`;

  return (
    <div className="row justify-content-sm-center">
      <h2 className="text-center">Countdown Until FP1 of Bahrain 2022</h2>
      <h3 className="text-center">{countdownString}</h3>
    </div>
  );
}

export default CountdownClock;
