import { atom } from "recoil";

const orderAtom = atom({
  key: "orderAtom",
  default: {
    orderId: "",
  },
});
export default orderAtom;
