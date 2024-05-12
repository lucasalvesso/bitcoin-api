import moment from "moment";

export class QueryGetExtractDto {
  constructor(data: Partial<QueryGetExtractDto>) {
    if (!data.email) {
      throw new Error("email not found");
    }

    let startDate;
    let endDate;

    if (data.startDate || data.endDate) {
      startDate = moment(data.startDate);
      endDate = moment(data.endDate);

      if (!startDate.isValid()) {
        throw new Error("startDate is invalid");
      }

      if (!endDate.isValid()) {
        throw new Error("endDate is invalid");
      }
    } else {
      endDate = moment();
      startDate = endDate.clone().subtract(90, "days");
    }

    Object.assign(this, {
      startDate: startDate.startOf("day").toISOString(),
      endDate: endDate.endOf("day").toISOString(),
    });
  }

  startDate: string;
  endDate: string;
  email: string;
}
