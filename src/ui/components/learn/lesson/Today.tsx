import dayjs from "dayjs";

export default function Today() {
  const now = dayjs().format("YYYY-MM-DD");
  return <input type="date" defaultValue={now}/>
}