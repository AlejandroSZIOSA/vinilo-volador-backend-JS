//1-6
const vinyls = [{ id: "1", name: "v1", price: "122" }];

export function getVinyls(req, res) {
  res.status(200).json(vinyls);
}
