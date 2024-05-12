import { BitcoinHistoryEntity } from "../entity/BitcoinHistoryEntity";
import moment from "moment";

export class ResponseHistoryDto {
  constructor(entities: BitcoinHistoryEntity[]) {
    const momentNow = moment();
    const dateTimeNow = momentNow
      .set(
        "minute",
        Number(String(momentNow.minute()).padStart(2, "0").slice(0, 1) + "0"),
      )
      .startOf("minute");

    let currentTime = dateTimeNow.clone().subtract(24, "hours");
    let lastTimeFoundData: BitcoinHistoryEntity | undefined;

    const timesData = new Array((24 * 60) / 10).fill(null).map((i) => {
      const nextCurrentTime = currentTime.clone().add(10, "minutes");

      const timeEntity = entities.filter(
        (entity) =>
          moment(entity.createdAt).utc(true) > currentTime &&
          moment(entity.createdAt).utc(true) <= nextCurrentTime,
      );

      if (timeEntity.length > 0) lastTimeFoundData = timeEntity.pop();

      const data = {
        time: currentTime.clone().toISOString(),
        buy: lastTimeFoundData?.buy,
        sell: lastTimeFoundData?.sell,
      };

      currentTime = nextCurrentTime;

      return data;
    });
    Object.assign(this, { history: timesData });
  }

  history: Array<{
    buy: string | undefined;
    sell: string | undefined;
    time: string;
  }>;
}
