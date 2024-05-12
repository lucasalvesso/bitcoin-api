import { BitcoinHistoryEntity } from "../entity/BitcoinHistoryEntity";
import moment from "moment";

export class ResponseHistoryDto {
  constructor(entities: BitcoinHistoryEntity[]) {
    const dateTimeNow = moment().set("minute", 0).startOf("second");

    let currentTime = dateTimeNow.clone();
    let lastTimeFoundData = entities.shift();

    const timesData = new Array((24 * 60) / 10).fill(null).map((i) => {
      const timeEntity = entities.filter(
        (entity) => moment(entity.createdAt) <= currentTime,
      );

      if (timeEntity) lastTimeFoundData = timeEntity.pop();

      const data = {
        time: currentTime.clone().toISOString(),
        buy: lastTimeFoundData?.buy,
        sell: lastTimeFoundData?.sell,
      };

      currentTime.add(10, "minutes");

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
