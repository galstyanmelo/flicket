export function getSeatVariant(status) {
  switch (status) {
    case "available":
      return "available";
    case "selected":
      return "selected";
    case "reserved":
      return "reserved";
    default:
      return "available";
  }
};
