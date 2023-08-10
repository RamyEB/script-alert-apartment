export default function pushNotification(
  response: { nb: any },
  data: { lastCount: number }
) {
  const { lastCount } = data;
  const { nb: newCount } = response;
  return process.env.NODE_ENV === "development"
    ? {
        method: "POST",
        body: `${lastCount} -> ${newCount}`,
        headers: {
          Title: "TEST : SeLoger",
          Tags: "construction_worker",
        },
      }
    : {
        method: "POST",
        body: `Il y'a du nouveau : ${lastCount} -> ${newCount}`,
        headers: {
          Title: "SeLoger",
          Tags: "house",
        },
      };
}
